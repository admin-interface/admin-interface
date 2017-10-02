// @flow
import ErrorResponse from '../../Utils/ErrorResponse/ErrorResponse';

/**
 * Get error information
 * @param template
 * @param message
 * @param defaultErrorMessage
 * @returns {{template: *, message: null}}
 */
function getErrorInformation(template: string, message: any, defaultErrorMessage: string): { [string]: any } {
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
    if (err instanceof ErrorResponse) {
        let errorInfo = {};
        switch (err.status) {
            case 404:
                errorInfo = getErrorInformation('pages/error/404', err.message, 'This page doesn\'t exist');
                break;
            default:
                errorInfo = getErrorInformation('pages/error/500', err.message, 'Internal Server Error');
        }

        // Set response code status
        res.status(err.status || 500);

        // Send json
        if (err.json) {
            return res.json(errorInfo);
        }

        // Send template
        return res.status(err.status || 500).render(errorInfo.template, {
            bodyClass: 'four-zero-four',
            ...errorInfo
        });
    }

    if (err instanceof Error) {
        return res.status(500).render('pages/error/500', {
            bodyClass: 'four-zero-four',
            ...getErrorInformation('pages/error/500', err.message, 'Internal Server Error')
        });
    }

    return next();
}
