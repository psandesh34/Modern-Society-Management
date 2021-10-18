import HttpException from './HttpException';

class InternalServerException extends HttpException {
    constructor() {
        super(500, 'Internal Server Error');
    }
}

export default InternalServerException;
