import * as mongoose from 'mongoose';

export interface UserInterface {
    contactEmail: String,
    password: String,
    firstName:String
    lastName:String,
    gender:String,
    mobileNumber:String,
    flatNumber:String,
    role: String,
    maintenance: Number,
    isDeleted:Boolean
}

export const userSchema = new mongoose.Schema(
    {
        contactEmail: {
            type: String,
            required: true,
            unique:true
        },
        password: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        mobileNumber: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        flatNumber: {
            type: String,
            required: true
        },
        role: {
            type: String,
            default: "user",
            enum: ["user", "admin", "superAdmin"]
        },
        maintenance: {
            type: Number,
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
        id: false
    }
);

export const userModel = mongoose.model<UserInterface & mongoose.Document>('User', userSchema);

