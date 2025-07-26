// Middleware for token verification
import { Request , Response , NextFunction } from "express";
import jwt from 'jsonwebtoken';
const secretKey = process.env.JWT_SECRET

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.tokenUser;

  if (!token) return res.status(401).send('Token required');

  jwt.verify(token, secretKey, (err: any, user:any) => {
    if (err) return res.status(403).send('Invalid or expired token');
    req.user = user;
    console.log(user);
    next();
  });
};

export default authenticateToken;