import { Request, Response, NextFunction, Router } from "express";
import MemberService from "./member.service";
import Controller from "../shared/interfaces/controller.interface";
import { sendAPIRespose } from "../shared/utils/utilities";
import HttpException from "../shared/exceptions/HttpException";
import multer from 'multer';
let DIR = './uploads/';
let upload = multer({ dest: DIR }).single('file');

class MemberController implements Controller {
    public router = Router();
    public memberService = new MemberService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/register', (req, res, next) => {
            this.addUser(req, res, next)
        });
        this.router.post('/login', (req, res, next) => { this.login(req, res, next) });
        this.router.patch('/logout', (req, res, next) => { this.logout(req, res, next) });
        this.router.get('/user', (req, res, next) => { this.getUserDetails(req, res, next) });
        this.router.get('/users', (req, res, next) => { this.getUsersList(req, res, next) });
        this.router.get('/family', (req, res, next) => { this.getFamilyDetails(req, res, next) });
        this.router.put('/user/update', (req, res, next) => { this.updateUser(req, res, next) });
        this.router.patch('/user/delete', (req, res, next) => {
            this.deleteUser(req, res, next)
        });
        this.router.post('/upload', function (req, res, next) {
            let path = '';
            upload(req, res, function (err:any) {
                if (err) {
                    // An error occurred when uploading
                    console.log(err);
                    return res.status(422).send("an Error occured")
                }
                path = req.file.path;
                console.log('----------------------------------------------------')
                console.log(req.file);
                return res.send("Upload Completed for " + path);
            });
        })
    }

    public async addUser(request: Request, response: Response, next: NextFunction) {
        try {
            const userData = request.body;
            const result = await this.memberService.addUser(userData);
            return sendAPIRespose(request, response, result);
        } catch (error) {
            return next(error)
        }
    }

    public async login(request: Request, response: Response, next: NextFunction) {
        try {
            const userData = request.body;
            const result = await this.memberService.login(userData);
            return sendAPIRespose(request, response, result);
        } catch (error) {
            return next(error)
        }
    }

    public async logout(request: Request, response: Response, next: NextFunction) {
        try {
            const token: any = request.headers.authorization?.slice(7);
            const result = await this.memberService.logout(token);
            return sendAPIRespose(request, response, result);
        } catch (error) {
            console.log('here');
            throw error;
        }
    }

    public async getUserDetails(request: Request, response: Response, next: NextFunction) {
        try {
            const userId = request.query.userId;
            const result = await this.memberService.getUserDetails(userId);
            return sendAPIRespose(request, response, result);
        } catch (error) {
            next(error)
        }
    }

    public async getUsersList(request: Request, response: Response, next: NextFunction) {
        try {
            const result = await this.memberService.getUsersList();
            return sendAPIRespose(request, response, result);
        } catch (error) {
            next(error)
        }
    }

    public async getFamilyDetails(request: Request, response: Response, next: NextFunction) {
        try {
            const result = await this.memberService.getFamilyDetails(request.query.flatnumber);
            return sendAPIRespose(request, response, result);
        } catch (error) {
            next(error)
        }
    }

    public async updateUser(request: Request, response: Response, next: NextFunction) {
        try {
            const userId = request.query.userId;
            const userData = request.body;
            const result = await this.memberService.updateUser(userId, userData);
            return sendAPIRespose(request, response, result);
        } catch (error) {
            next(error)
        }
    }

    public async deleteUser(request: Request, response: Response, next: NextFunction) {
        try {
            const userData = request.body;
            const result = await this.memberService.deleteUser(userData);
            return sendAPIRespose(request, response, result);
        } catch (error) {
            next(error)
        }
    }
}

export default MemberController;
