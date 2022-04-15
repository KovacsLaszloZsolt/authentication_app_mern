import { NextFunction, Request, Response } from 'express';

const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction): void => {
  if (err.message) {
    res.json({ error: err.message });
  }

  res.status(500).json({ error: 'internal server error' });
};

export default errorHandler;
