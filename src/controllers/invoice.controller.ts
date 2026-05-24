import type { Request, Response } from "express";
import logger from "../config/logger.ts";
import Invoice from "../models/invoice.model.ts";

class InvoiceListCreateView {
    getInvoice = async (req: Request, res: Response) => {
        try {
            const invoice = await Invoice.find();
            return res.status(200).send(invoice);
        } catch (error) {
            logger.error(error);
            return res.status(500).send(error);
        }
    }

    saveInvoice = async (req: Request, res: Response) => {
        try {
            const invoice = await Invoice.create(req.body);
            return res.status(200).send(invoice);
        } catch (error) {
            logger.error(error);
            return res.status(500).send(error);
        }
    }
} 

class InvoiceListUpdateDestroyView {
    editInvoice = async (req: Request, res: Response) => {
        try {
            const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body);
            return res.status(200).send(invoice);
        } catch (error) {
            logger.error(error);
            return res.status(500).send(error);
        }
    }

    editInvoiceStatus = async (req: Request, res: Response) => {
        try {
            const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true });
            return res.status(200).send(invoice);
        } catch (error) {
            logger.error(error);
            return res.status(500).send(error);
        }
    }

    getInvoiceById = async (req: Request, res: Response) => {
        try {
            const invoice = await Invoice.findById(req.params.id);
            return res.status(200).send(invoice);
        } catch (error) {
            logger.error(error);
            return res.status(500).send(error);
        }
    }

    deleteInvoice = async (req: Request, res: Response) => {
        try {
            const invoice = await Invoice.findByIdAndDelete(req.params.id);
            return res.status(200).send(invoice);
        } catch (error) {
            logger.error(error);
            return res.status(500).send(error);
        }
    }
}

export { InvoiceListCreateView, InvoiceListUpdateDestroyView };