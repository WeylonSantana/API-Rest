import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import DatabaseError from '../models/errors/database.error.model';
import ForbiddenError from '../models/errors/forbidden.error.model';

export default function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
  if (error instanceof DatabaseError) {
    res.status(StatusCodes.BAD_REQUEST).send(error.message);
  } else if (error instanceof ForbiddenError) {
    res.status(StatusCodes.FORBIDDEN).send(error.message);
  } else {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
  }
}
