// @flow
import { Router as ExpressRouter } from 'express';

import Registry from '../Services/Registry/ProxyInterface';
import PageAbstract from '../Shared/PageAbstract/PageAbstract';
import MiddlewareEventEmitter from '../Controller/Middleware/MiddlewareEventEmitter';
import MiddlewareHandlerError from '../Controller/Middleware/MiddlewareHandlerError';
import { checkHasModel, checkHasRefModel } from '../Controller/Middleware/MiddlewareCheckHasModel';
import { getList, getSingleModel } from '../Controller/ModelController/ModelController';
import {
    getApiList,
    putUpdateSingleModel,
    deleteSingleModel,
    postApiCreateSingleModel
} from '../Controller/ModelController/API/APIModelController';

import type { RouteType as FieldTypeRouteType } from '../Shared/FieldTypeAbstract/Type/RoutingType';
import type { RouteType as WidgetRouteType } from '../Shared/WidgetAbstract/Type/RoutingType';

export default class Router {
    getRouter() {
        const router = ExpressRouter();

        router.use(Registry.getConfig('modelPath'), this.getModelRouter());
        router.use(Registry.getConfig('apiPath'), this.getApiModelRouter());
        router.use('/', this.getPageRouter());
        router.use(MiddlewareHandlerError);

        return router;
    }

    getModelRouter() { // eslint-disable-line class-methods-use-this
        const modelRouter = ExpressRouter();

        modelRouter.use('/:model_key', ...MiddlewareEventEmitter('route:model:use'), checkHasModel);
        modelRouter.get('/:model_key/list', ...MiddlewareEventEmitter('route:model:get:list'), getList);
        modelRouter.get('/:model_key/single/:id/view', ...MiddlewareEventEmitter('route:model:get:view'), getSingleModel);

        return modelRouter;
    }

    getApiModelRouter() {
        const apiRouter = ExpressRouter();

        apiRouter.use('/model/:model_key', ...MiddlewareEventEmitter('route:api:model:use'), checkHasModel, checkHasRefModel);
        apiRouter.get('/model/:model_key/list', ...MiddlewareEventEmitter('route:api:model:get:list'), getApiList);
        apiRouter.post('/model/:model_key/create', ...MiddlewareEventEmitter('route:api:model:post:create'), postApiCreateSingleModel);
        apiRouter.put('/model/:model_key/single/:id/update', ...MiddlewareEventEmitter('route:api:put:get:update'), putUpdateSingleModel);
        apiRouter.delete('/model/:model_key/single/:id/delete', ...MiddlewareEventEmitter('route:api:model:delete:delete'), deleteSingleModel);

        // field type api
        apiRouter.use(Registry.getConfig('fieldPath'), ...MiddlewareEventEmitter('route:api:fieldType:use'), this.getFieldTypeRouter());

        // widgets api
        apiRouter.use(Registry.getConfig('widgetPath'), ...MiddlewareEventEmitter('route:api:widget:use'), this.getWidgetRouter());

        return apiRouter;
    }

    getPageRouter() { // eslint-disable-line class-methods-use-this
        const pageRouter: express$Router = ExpressRouter();

        Registry.getAllPage().forEach((Page: PageAbstract) =>
            pageRouter.get(Page.getUrl(), Page.render.bind(Page))
        );

        return pageRouter;
    }

    getFieldTypeRouter() { // eslint-disable-line class-methods-use-this
        const fieldTypeRouter: express$Router = ExpressRouter();

        Object.keys(Registry.getAllFieldType()).forEach((key: string) => {
            const fieldType = Registry.getFieldType(key);
            const routing   = fieldType.getRouting();
            if (routing) {
                const routingArray: Array<FieldTypeRouteType> = (Object.values(routing): any);
                routingArray.forEach((route) => {
                    if (route.route && route.handler) {
                        fieldTypeRouter.get(`/${ key + route.route }`, route.handler);
                    }
                });
            }
        });

        return fieldTypeRouter;
    }

    getWidgetRouter() { // eslint-disable-line class-methods-use-this
        const widgetRouter: express$Router = ExpressRouter();

        Object.keys(Registry.getAllWidget()).forEach(key => {
            const widget  = Registry.getWidget(key);
            const routing = widget.getRouting();
            if (routing) {
                const routingArray: Array<WidgetRouteType> = (Object.values(routing): any);
                routingArray.forEach(route => {
                    if (route.route && route.handler) {
                        widgetRouter.get(`/${ key + route.route }`, route.handler);
                    }
                });
            }
        });

        return widgetRouter;
    }
}
