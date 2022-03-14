import { ADD_TO_DO } from '../src/store/actions/to-do.action';
import { EOperation } from '../src/enums/common.enum';
import { formatPagination } from '../src/utils/common';
import { IGetToDosResponse } from '../src/utils/type';
import { initialState } from '../src/constants/state';
import { Observable, Subject } from 'rxjs';
import { operate, setOverlay, toast } from '../src/store/actions/common.action';
import { OperateAction, OperatePayload } from '../src/store/actions/type';
import { operateEpic } from '@store/epics/common.epic';
import { StateObservable } from 'redux-observable';
import { TestScheduler } from 'rxjs/internal/testing/TestScheduler';

describe('Test common epics', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual: any, expected: any): void => {
      expect(actual).toEqual(expected);
    });
  });

  describe('Test operateEpic', () => {
    const mockedPayload: OperatePayload = [ADD_TO_DO, EOperation.CREATE, {}];

    it('Should hide overlay and toast', () => {
      testScheduler.run(({ cold, expectObservable }) => {
        const mockedResponse: IGetToDosResponse = {
          list: [],
          pagination: formatPagination(),
        };

        const action$: Observable<OperateAction> = cold<OperateAction>('(a|)', {
          a: operate(mockedPayload),
        });
        const state$ = new StateObservable(new Subject(), initialState);
        const output$: Observable<OperatePayload> = operateEpic(
          action$,
          state$,
          {}
        );

        expectObservable(output$).toBe('(bc|)', {
          b: setOverlay(false),
          c: toast(mockedPayload),
        });
      });
    });
  });
});
