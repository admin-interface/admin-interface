// @flow
import path              from 'path';
import express           from 'express';
import bodyParser        from 'body-parser';
import { Registry }      from '@admin-interface/core';
import Router            from '../../Router/Router';
import { getStaticFile } from '../../Utils/View/Static';
import { getMountPath }  from '../../Utils/Mount/Mount';
import Link              from '../../Utils/View/Link';

export function startAfter(): void {
    // Create the express instance
    Registry.getRepository('App').set('instance', express());
    // Set dynamic configuration
    Registry.getRepository('Config').set('locals.Registry', Registry);
    Registry.getRepository('Config').set('locals.getStaticFile', getStaticFile);
    Registry.getRepository('Config').set('locals.getMountPath', getMountPath);
    Registry.getRepository('Config').set('locals.Link', Link);
    // Set locals
    Registry.getRepository('App').get('instance').locals = Registry.getRepository('Config').get('locals');
}

export function startEvent(): void {
    // Set admin interface views
    Registry.getRepository('Config').push('views', path.join(Registry.getRepository('App').get('rootPath'), 'core/views'));
    Registry.getRepository('App').get('instance').set('view engine', 'jade');
    Registry.getRepository('App').get('instance').set('views', Registry.getRepository('Config').get('views'));
}

export function startBefore(): void {
    const router = new Router();

    // Set routing and middleware
    Registry.getRepository('App').get('instance').use(bodyParser.urlencoded({ extended: false }));
    Registry.getRepository('App').get('instance').use(Registry.getRepository('Config').get('staticPath'), express.static(
        path.join(Registry.getRepository('App').get('rootPath'), 'front/static')
    ));
    Registry.getRepository('App').get('instance').use(router.getRouter());
}
