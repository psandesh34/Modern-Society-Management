import HttpException from '../exceptions/HttpException';

export default class ApiResponse {
    public data: any;
    public errorMessages: Object[] | undefined;
    public success: boolean;

    constructor(data: any, errors?: HttpException[]) {
        this.success = !(errors && errors.length > 0);
        this.data = data;
        this.errorMessages = errors?.map((error: HttpException) => {
            return { status: error.status, message: error.message };
        });
    }
}
