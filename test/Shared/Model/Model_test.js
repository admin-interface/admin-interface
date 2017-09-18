import { expect } from 'chai';
import { Model as SequelizeModel } from 'sequelize';

import {
    PostAIEmptyTest,
    PostAICorrectModelTest,
    PostAIIncorrectModelTest
} from './DemoResources/Models';

import Model from '../../../src/Shared/ModelAbstract/ModelAbstract';

describe('Shared/Model/Model', () => {
    let instanceModel;

    describe('set/get key', () => {
        beforeEach(() => {
            instanceModel = new Model();
        });

        it('set/get string', () => {
            // eslint-disable-next-line no-unused-expressions
            expect(instanceModel.setKey('testModel')).to.be.undefined;
            expect(instanceModel.getKey()).to.be.a('string').equal('testModel');
        });

        it('set any values', () => {
            expect(() => instanceModel.setKey(123), 'set number').to.throw();
            expect(
                () => instanceModel.setKey({ a: 1 }),
                'set object'
            ).to.throw();
            expect(
                () => instanceModel.setKey(e => e),
                'set function'
            ).to.throw();
            expect(() => instanceModel.setKey([]), 'set array').to.throw();
        });
    });

    describe('set/get sequelize model', () => {
        it('check empty model', () => {
            const postAIEmptyTest = new PostAIEmptyTest();

            expect(() => postAIEmptyTest.getModel()).to.throw();
        });

        it('set SequelizeModel', () => {
            const postAICorrectModelTest = new PostAICorrectModelTest();
            const _model = postAICorrectModelTest.getModel();

            expect(new _model()).instanceof(SequelizeModel);
        });

        it('set another class', () => {
            const postAIIncorrectModelTest = new PostAIIncorrectModelTest();

            expect(() => postAIIncorrectModelTest.getModel()).to.throw(
                TypeError
            );
        });
    });

    describe('Fields', () => {
        it('get default fields (privet method)', () => {
            instanceModel = new PostAICorrectModelTest();

            console.log(instanceModel.getFieldsFinal());
        });
    });

    // describe('set/get Columns', () => {
    //     it('check basic methods for working of columns', () => {
    //         instanceModel = new PostAIEmptyTest();

    //         expect(
    //             instanceModel.getColumns(),
    //             'getColumns not empty array'
    //         ).to.be.an('array').that.is.empty;
    //         expect(
    //             instanceModel.getColumnsFinal(),
    //             'getColumnsFinal not empty array'
    //         ).to.be.an('array').that.is.empty;
    //     });

    //     it('check trapping type errors', () => {
    //         class demo extends PostAIEmptyTest {
    //             getColumns() {
    //                 return {};
    //             }
    //         }
    //         instanceModel = new demo();

    //         expect(() => instanceModel.getColumnsFinal()).to.throw(TypeError);
    //     });
    // });
});
