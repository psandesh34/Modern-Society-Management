import { NextFunction, Response, Request } from "express";
import Middleware from "../interfaces/middleware.interface";
import { sessionModel } from "../models/session.model";
import HttpException from "../exceptions/HttpException";

class AuthenticationMiddleware implements Middleware {
    public async requestHandler(
        request: Request,
        response: Response,
        next: NextFunction
    ) {
        try {
            const UNAUTHORIZED_APIS = [
                '/login',
                '/register',
            ];
            const authorizedapi = !UNAUTHORIZED_APIS.includes(request.path);

            if (authorizedapi) {

                const authenticationString: any = request.headers['authorization'];
                if (!authenticationString) {
                    throw new HttpException(401, 'Authentication token missing');
                }

                const tokenRegexPattern = new RegExp('^Bearer [A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$');
                if (!tokenRegexPattern.test(authenticationString)) {
                    throw new HttpException(401, 'Authentication token invalid');
                }
                const token: string = authenticationString.substring(7);
                const sessionDetails = await sessionModel
                    .findOne({ token })
                    .exec();
                if (!sessionDetails) {
                    throw new HttpException(401, 'Authentication token invalid');
                }
                if (sessionDetails.isDeleted) {
                    throw new HttpException(401, 'Session expired!');
                }
                request.headers.userId = sessionDetails.userId;
                request.headers.role = sessionDetails.role;
            }
            next();
        } catch (error) {
            next(error);
        }
    }
}

export default AuthenticationMiddleware;
