import { IMiddleware } from './middleware.interface';
import { NextFunction, Request, Response } from 'express';
import { verify, Secret, VerifyOptions } from 'jsonwebtoken';

export class AuthMiddleware implements IMiddleware {
	constructor(private secret: Secret) {}

	execute(req: Request, res: Response, next: NextFunction): void {
		if (req.headers.authorization) {
			verify(req.headers.authorization.split(' ')[1], this.secret, (err, payload) => {
				if (err) {
					next();
				} else if (typeof payload !== 'string' && payload?.email) {
					req.user = payload?.email;
				}
				next();
			});
		} else {
			next();
		}
	}
}
