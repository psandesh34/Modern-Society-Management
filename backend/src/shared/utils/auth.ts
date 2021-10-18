import { userModel } from "../models/user.model";
import HttpException from "../exceptions/HttpException";

const userRegister = async (userData:any, role, res) => {
    let emailAlreadyExists = await userModel.findOne({ contactEmail: userData.contactEmail });
    if(emailAlreadyExists) {
        throw new HttpException(400, 'Email address already taken.');
    }

    // const hashedPass = await 
};