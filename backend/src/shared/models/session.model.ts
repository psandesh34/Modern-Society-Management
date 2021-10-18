import * as mongoose from 'mongoose';

export interface SessionInterface {
    token: string,
    userId: string,
    role: string,
    isDeleted:boolean
}

export const sessionSchema = new mongoose.Schema(
    {
        token: {
            type: String,
            required: true
        },
        userId: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true
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

export const sessionModel = mongoose.model<SessionInterface & mongoose.Document>('Session', sessionSchema);

