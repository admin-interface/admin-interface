// @flow
import lodash from 'lodash';
import { Registry, WidgetAbstract, FieldTypeAbstract, ModelBuilder, menuParser } from '@admin-interface/core';
import type { MenuType } from '@admin-interface/core';

import { getLocalConfig } from '../../Utils/Config/Config';

function initModels(models): void {
    Object.keys(models)
        .map((key: string) => {
            const modelBuilder = new ModelBuilder(models[ key ].default || models[ key ]);
            // Add model in registry
            Registry.getRepository('Model').set(key, modelBuilder.setKey(key).getModel());
            return modelBuilder;
        })
        .map((modelBuilder: ModelBuilder) =>
            // Build model by reference
            modelBuilder.build()
        );
}

function initPages(pages): void {
    Object.keys(pages).forEach((key: string) => {
        const page = new (pages[ key ].default || pages[ key ])();
        // Add page in registry
        Registry.getRepository('Page').set(key, page.setKey(key));
    });
}

function initMenus(menus: { [string]: MenuType }): void {
    Object.keys(menus).forEach(key => {
        Registry.getRepository('Menu').set(key, menuParser(menus[ key ], key));
    });
}

function initFieldTypes(fieldTypes: { [string]: typeof FieldTypeAbstract }): void {
    Object.keys(fieldTypes).map((key: string) =>
        Registry.getRepository('FieldType').set(key, fieldTypes[ key ])
    );
}

function initConfig(config): void {
    Object.keys(config).forEach(key =>
        Registry.getRepository('Config').set(key, config[ key ])
    );
}

function initWidgets(widgets: { [string]: typeof WidgetAbstract }): void {
    Object.keys(widgets).forEach((key: string) => {
        const widget = widgets[ key ];
        // Add widget in registry
        Registry.getRepository('Widget').set(key, widget);
    });
}

export function setConfigEvent(config: { [string]: any }): void {
    const localConfig = getLocalConfig();
    if (config.Config || localConfig.Config) {
        initConfig(lodash.merge(localConfig.Config, config.Config));
    }

    if (config.Menu) {
        initMenus(config.Menu);
    }

    if (config.FieldType || localConfig.FieldType) {
        initFieldTypes(lodash.merge(localConfig.FieldType, config.FieldType));
    }

    if (config.Widget || localConfig.Widget) {
        initWidgets(lodash.merge(config.Widget, localConfig.Widget));
    }

    if (config.Model) {
        initModels(config.Model);
    }

    if (config.Page || localConfig.Page) {
        initPages(lodash.merge(localConfig.Page, config.Page));
    }
}
