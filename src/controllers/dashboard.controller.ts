import type { Request, Response, NextFunction } from "express";
import Staff from "../models/staff.model.ts";
import Appointment from "../models/appointment.model.ts";
import Invoice from "../models/invoice.model.ts";
import logger from "../config/logger.ts";

export const getDashboardAnalytics = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    logger.info("Fetching dashboard analytics via parallel MongoDB aggregation pipelines...");

    // 1. Staff Aggregation using $facet (concurrently counts total, active, onLeave, and unique specialization departments)
    const staffPromise = Staff.aggregate([
      {
        $facet: {
          summary: [
            {
              $group: {
                _id: null,
                totalStaff: { $sum: 1 },
                activeToday: {
                  $sum: {
                    $cond: [
                      { $in: [{ $toLower: "$status" }, ["active", "activetoday"]] },
                      1,
                      0
                    ]
                  }
                },
                onLeave: {
                  $sum: {
                    $cond: [
                      { $in: [{ $toLower: "$status" }, ["onleave", "on leave"]] },
                      1,
                      0
                    ]
                  }
                },
                allSpecializations: { $addToSet: "$specialization" }
              }
            },
            {
              $project: {
                _id: 0,
                totalStaff: 1,
                activeToday: 1,
                onLeave: 1,
                departments: {
                  $size: {
                    $filter: {
                      input: "$allSpecializations",
                      as: "spec",
                      cond: {
                        $and: [
                          { $ne: ["$$spec", null] },
                          { $ne: [{ $trim: { input: "$$spec" } }, ""] }
                        ]
                      }
                    }
                  }
                }
              }
            }
          ],
          shiftDistribution: [
            {
              $match: {
                shift: { $nin: [null, ""] }
              }
            },
            {
              $group: {
                _id: "$shift",
                count: { $sum: 1 }
              }
            },
            {
              $project: {
                _id: 0,
                shift: "$_id",
                count: 1
              }
            }
          ],
          roleDistribution: [
            {
              $match: {
                role: { $nin: [null, ""] }
              }
            },
            {
              $group: {
                _id: "$role",
                count: { $sum: 1 }
              }
            },
            {
              $project: {
                _id: 0,
                role: "$_id",
                count: 1
              }
            }
          ]
        }
      }
    ]);

    // 2. Invoice Revenue Aggregation (Sum outstanding vs paid amounts)
    const invoicePromise = Invoice.aggregate([
      {
        $group: {
          _id: null,
          paid: {
            $sum: {
              $cond: [
                { $in: [{ $toLower: "$paymentStatus" }, ["paid"]] },
                "$amount",
                0
              ]
            }
          },
          outstanding: {
            $sum: {
              $cond: [
                { $in: [{ $toLower: "$paymentStatus" }, ["unpaid", "pending", "overdue", "outstanding"]] },
                "$amount",
                0
              ]
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          paid: 1,
          outstanding: 1
        }
      }
    ]);

    // 3. Appointment Revenue Aggregation (Sum outstanding vs paid prices)
    const appointmentPromise = Appointment.aggregate([
      {
        $group: {
          _id: null,
          paid: {
            $sum: {
              $cond: [
                { $in: [{ $toLower: "$paymentStatus" }, ["paid"]] },
                "$price",
                0
              ]
            }
          },
          outstanding: {
            $sum: {
              $cond: [
                { $in: [{ $toLower: "$paymentStatus" }, ["unpaid", "pending", "outstanding"]] },
                "$price",
                0
              ]
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          paid: 1,
          outstanding: 1
        }
      }
    ]);

    // Execute all queries in parallel for high-performance and zero lag
    const [staffResults, invoiceResults, appointmentResults] = await Promise.all([
      staffPromise,
      invoicePromise,
      appointmentPromise
    ]);

    // Extract staff summary facets with solid fallbacks
    const staffSummaryFacet = staffResults[0]?.summary[0] || {
      totalStaff: 0,
      activeToday: 0,
      onLeave: 0,
      departments: 0
    };
    const shiftDistribution = staffResults[0]?.shiftDistribution || [];
    const roleDistribution = staffResults[0]?.roleDistribution || [];

    // Extract invoice financial figures with solid fallbacks
    const invoiceSummary = invoiceResults[0] || { paid: 0, outstanding: 0 };

    // Extract appointment financial figures with solid fallbacks
    const appointmentSummary = appointmentResults[0] || { paid: 0, outstanding: 0 };

    res.status(200).json({
      success: true,
      data: {
        staffSummary: {
          totalStaff: staffSummaryFacet.totalStaff,
          activeToday: staffSummaryFacet.activeToday,
          onLeave: staffSummaryFacet.onLeave,
          departments: staffSummaryFacet.departments
        },
        shiftDistribution,
        roleDistribution,
        revenue: {
          invoices: {
            paid: invoiceSummary.paid,
            outstanding: invoiceSummary.outstanding
          },
          appointments: {
            paid: appointmentSummary.paid,
            outstanding: appointmentSummary.outstanding
          },
          totalPaid: invoiceSummary.paid + appointmentSummary.paid,
          totalOutstanding: invoiceSummary.outstanding + appointmentSummary.outstanding
        }
      }
    });
  } catch (error) {
    logger.error("Error in getDashboardAnalytics:", error);
    next(error);
  }
};
