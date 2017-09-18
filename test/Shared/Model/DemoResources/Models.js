import Model from '../../../../src/Shared/ModelAbstract/ModelAbstract';
import { Post } from '../../../resources/models';

class EmtypeClassTest {}

export class PostAIEmptyTest extends Model {}

export class PostAICorrectModelTest extends PostAIEmptyTest {
    // eslint-disable-next-line class-methods-use-this
    getModel() {
        return Post;
    }
}

export class PostAIIncorrectModelTest extends PostAIEmptyTest {
    // eslint-disable-next-line class-methods-use-this
    getModel() {
        return EmtypeClassTest;
    }
}
