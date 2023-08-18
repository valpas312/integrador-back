import { Request, Response, NextFunction } from 'express';
import { validationResult, Result, ValidationError } from 'express-validator';

export const recolectarErrores = (req: Request, res: Response, next: NextFunction): void => {
    const err: Result<ValidationError> = validationResult(req);

    if (!err.isEmpty()) {
        res.status(400).json({
            ok: false,
            err: err.mapped()
        });
    }

    next();
};