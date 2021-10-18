import { Router, Request, Response, NextFunction } from "express";

const router:any = Router();

router.post('/register', async(req:Request, res:Response)=>{});
router.post('/register/admin', async(req:Request, res:Response)=>{});
router.post('/register/superAdmin', async(req:Request, res:Response)=>{});
router.post('/login', async(req:Request, res:Response)=>{});
router.post('/login/admin', async(req:Request, res:Response)=>{});
router.post('/login/superAdmin', async(req:Request, res:Response)=>{});
router.get('/profile', async(req:Request, res:Response)=>{});
router.post('/protected', async(req:Request, res:Response)=>{});
router.post('/protected/admin', async(req:Request, res:Response)=>{});
router.post('/protected/superAdmin', async(req:Request, res:Response)=>{});

export default router;

