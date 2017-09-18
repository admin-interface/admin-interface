/**
 * @module src/Utils/View/Link
 * @flow
 */

import { getLinkApiFieldType } from './LinkType/FieldTypeAPI';
import { getLinkListByContext } from './LinkType/MenuView';
import { getLinkModelList, getLinkModelSingle } from './LinkType/ModelView';
import { getLinkApiWidget } from './LinkType/WidgetAPI';
import {
    getLinkApiModelCreate,
    getLinkApiModelDelete,
    getLinkApiModelList,
    getLinkApiModelSingleUpdate
} from './LinkType/ModelAPI';

export default {
    getLinkModelList,
    getLinkListByContext,
    getLinkApiModelList,
    getLinkModelSingle,
    getLinkApiModelSingleUpdate,
    getLinkApiModelDelete,
    getLinkApiModelCreate,
    getLinkApiWidget,
    getLinkApiFieldType
};

