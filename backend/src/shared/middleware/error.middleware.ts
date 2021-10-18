import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/HttpException";
import ApiResponse from "../utils/apiResponse";
import InternalServerException from "../exceptions/InternalServerException";

async function errorMiddleware(
    error: HttpException,
    request: Request,
    response: Response,
    next?: NextFunction
) {
    const status = error?.status;
    const message = error?.message;
    let responseStatus = 200;
    if (!(status && message)) {
        error = new InternalServerException();
    }
    if (status === 401 || status === 403) responseStatus = status;
    return response.status(responseStatus).json(new ApiResponse(false, [error]));
}

export default errorMiddleware;
