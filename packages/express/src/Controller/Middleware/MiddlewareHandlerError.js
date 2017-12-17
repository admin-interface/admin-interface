// @flow
import ErrorResponse from '../../Utils/ErrorResponse/ErrorResponse';

/**
 * Get error information
 * @param template
 * @param message
 * @param defaultErrorMessage
 * @returns {{template: *, message: null}}
 */
export function getErrorInformation(template: string, message: any, defaultErrorMessage: string): { [string]: any } {
    return {
        template,
        message: process.env.NODE_ENV !== 'production' ? (message || defaultErrorMessage) : null
    };
}

/**
 * Middleware Handler Error
 * @param req
 * @param res
 * @param next
 * @param err
 */
export default function (err: ?Error | ?ErrorResponse, req: express$Request, res: express$Response, next: express$NextFunction): mixed {
    if (err instanceof Error) {
        let errorInfo = {};
        const status  = err.status ? Number(err.status) : null;

        if (status === 404) {
            errorInfo = getErrorInformation('pages/error/404', err.message, 'This page doesn\'t exist');
        } else {
            errorInfo = getErrorInformation('pages/error/500', err.message, 'Internal Server Error');
        }

        // Set response code status
        res.status(status || 500);

        // Send json
        if (err.json) {
            return res.json(errorInfo);
        }

        // Send template
        return res.render(errorInfo.template, {
            bodyClass: 'four-zero-four',
            ...errorInfo
        });
    }

    return next();
}
