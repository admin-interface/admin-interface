// @flow
import path from 'path';
import jade from 'jade';
import { Registry, WidgetAbstract } from '@admin-interface/core';

/**
 * Models Info Widget
 * @extends WidgetAbstract
 */
class ModelsInfoWidget extends WidgetAbstract {
    static getThisPath(): string {
        return path.join(__dirname);
    }

    /**
     * Render widget
     * @return {string}
     */
    render(): string {
        const { models = [] } = this.getOptions();
        const context         = {
            $widget: this,
            models:  models.map(modelOption => ({
                model: Registry.getRepository('Model').get(modelOption.model),
                icon:  modelOption.icon || 'folder',
                color: modelOption.color || 'cyan'
            })),
            Link:    Registry.getRepository('Config').get('locals.Link')
        };

        return jade.renderFile(this.constructor.getThisPathView(), context);
    }
}

export default ModelsInfoWidget;
