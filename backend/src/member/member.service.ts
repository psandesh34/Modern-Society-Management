import { userModel } from '../shared/models/user.model';
import HttpException from '../shared/exceptions/HttpException';
import * as jwt from 'jsonwebtoken';
import { sessionModel } from '../shared/models/session.model';
import { error } from 'console';
import multer from 'multer';
import { sendAPIRespose } from '../shared/utils/utilities';

class MemberService {

    public async addUser(userData: any) {
        let userSaveResult: any;
        console.log(userData);
        if (await userModel.findOne({ contactEmail: userData.contactEmail }).exec()) {
            throw new HttpException(400, `User with email ${userData.contactEmail} already exists.`);

        }
        if (!await userModel.findOne({ flatNumber: userData.flatNumber }).exec()) {
            userData.role = 'admin';
        }
        userSaveResult = await userModel.create(userData);
        return userSaveResult;
    }

    public async login(userData: any) {
        let contactEmail: string = userData.contactEmail;
        let password: string = userData.password;
        const user: any = await userModel.findOne({ contactEmail, isDeleted: false });
        if (!user) {
            throw new HttpException(404, `User not found for email ${contactEmail}`);
        }
        if (user.password !== password) {
            throw new HttpException(400, 'Password is incorrect.');
        }
        const token = jwt.sign({
            userId: user._id,
            role: user.role,
            contactEmail,
        }, 'topSecretKey',
            {
                expiresIn: "1h"
            });
        const result: any = {
            token,
            id: user._id,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
            gender: user.gender,
            mobileNumber: user.mobileNumber,
            flatNumber: user.flatNumber,
        }
        const session = await sessionModel.create({ userId: user._id, role: user.role, token, isDeleted: false });
        if (!session) throw new HttpException(400, 'Something went wrong, please try again!!');
        return result;
    }

    public async logout(token: string) {
        const deletedSession:any = await sessionModel.findOne({ token });
        await sessionModel.findOneAndUpdate({ _id: deletedSession._id }, { $set: { isDeleted: true } });
        return true;
    }

    public async getUserDetails(userId: any) {
        const userDetails = await userModel.findOne({ _id: userId, isDeleted: false }).exec();
        if (!userDetails) {
            throw new HttpException(404, `User with id ${userId} not found.`);
        }
        return userDetails;
    }

    public async getUsersList() {
        const userDetails = await userModel.find({ isDeleted: false }).select('_id firstName lastName mobileNumber flatNumber contactEmail').exec();
        return userDetails;
    }

    public async getFamilyDetails(flatNumber:any) {
        const familyData = await userModel.find({flatNumber: flatNumber, role: { $ne: 'admin'}});
        return familyData;
    }

    public async updateUser(userId:any, userData: any) {
        console.log(userData);
        console.log(userData.contactEmail.length);
        if(!userData.contactEmail.length || !userData.firstName.length || !userData.lastName.length || !userData.mobileNumber.length || !userData.flatNumber.length || !userData.gender.length || !userData.password.length) {
            console.log('in here');
            throw error;
        }
        const oldUserData = await userModel.findOneAndUpdate({ _id: userId, isDeleted: false }, userData);
        if (!oldUserData) {
            throw new HttpException(404, `User with id ${userId} not found.`);
        }
        return true;
    }

    public async deleteUser(userData: any) {
        const userId: string = userData.userId;
        console.log(`deleteUser -> userId`, userId);
        const oldUserData = await userModel.findOneAndUpdate({ _id: userId, isDeleted: false },
            {
                $set: { isDeleted: true }
            });
        if (!oldUserData) {
            throw new HttpException(404, `User with id ${userId} not found.`);
        }
        return true;
    }
}

export default MemberService;