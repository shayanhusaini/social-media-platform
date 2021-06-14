import {NextFunction, Request, Response} from "express";

export const validate = (schema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.validate(req.body);
        if(result.error) {
            const messages = result.error.details.map(detail => detail.message);
            return res.status(400).send({errors: messages});
        }
        next();
    }
}