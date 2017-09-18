// @flow
import path from 'path';
import express from 'express';
import RootPath from 'app-root-path';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import Registry from '../../Services/Registry/ProxyInterface';
import Router from '../../Router/Router';
import { getStaticFile } from '../../Utils/View/Static';
import { getMountPath } from '../../Utils/Mount/Mount';
import Link from '../../Utils/View/Link';

export function startAfter(): void {
    // set dynamic configuration
    Registry.setConfig('locals.Registry', Registry);
    Registry.setConfig('locals.getStaticFile', getStaticFile);
    Registry.setConfig('locals.getMountPath', getMountPath);
    Registry.setConfig('locals.Link', Link);
    // set local
    Registry.getApp().locals = Registry.getConfig('locals');
}

export function startEvent(): void {
    // Set admin interface views
    Registry.pushConfig('views', path.join(RootPath.path, './views'));
    Registry.getApp().set('view engine', 'jade');
    Registry.getApp().set('views', Registry.getConfig('views'));
}

export function startBefore(): void {
    const router = new Router();

    Registry.getApp().use(bodyParser.urlencoded({ extended: false }));
    Registry.getApp().use(Registry.getConfig('staticPath'), express.static(path.join(RootPath.path, 'assets/static')));
    Registry.getApp().use(morgan('dev'));
    Registry.getApp().use('/', router.getRouter());
}
