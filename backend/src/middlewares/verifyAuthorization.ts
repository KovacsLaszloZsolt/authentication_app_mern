import { NextFunction, Request, Response } from 'express';
import JWT from 'jsonwebtoken';

const verifyAuthorization = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token = req.headers.authorization?.split(' ')[1] as string;
    const authorized = JWT.verify(token, process.env.JWT_SECRET as string);

    if (!authorized) {
      throw new Error();
    }
    next();
  } catch (err) {
    res.status(401).json({ error: 'invalid token' });
  }
};

export default verifyAuthorization;
