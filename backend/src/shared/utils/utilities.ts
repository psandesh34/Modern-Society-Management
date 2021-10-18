import { Response, Request } from "express";
import ApiResponse from "./apiResponse";

export async function sendAPIRespose(
    request: Request,
    response: Response,
    result: any
) {
    return response.json(new ApiResponse(result));
}