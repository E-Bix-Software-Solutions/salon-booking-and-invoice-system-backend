import mongoose from "mongoose";
import type { StaffFormData } from "../../types/staff.ts";

const StaffModel = new mongoose.Schema<StaffFormData>({
    fullName: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },   
    shift: {
        type: String,
        required: false
    },
    salary: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: true
    },
    joinDate: {
        type: String,
        default: new Date().toISOString()
    },
    status: {
        type: String,
        required: true,
        default: "active"
    },
    specialization: {
        type: String,
        required: false
    },
    imageUrl: {
        type: String,
        required: false
    },
    notes: {
        type: String,
        required: false
    },
});

const Staff = mongoose.model("staff", StaffModel);
export default Staff;