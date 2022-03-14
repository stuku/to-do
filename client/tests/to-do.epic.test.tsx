import {
  addOneEpic,
  deleteOneEpic,
  getListEpic,
  updateOneEpic,
} from '../src/store/epics/to-do.epic';
import {
  addToDo,
  addToDoSuccessFully,
  ADD_TO_DO,
  deleteToDo,
  DELETE_TO_DO,
  getToDos,
  GET_TO_DOS,
  setToDos,
  updateToDo,
  updateToDoSuccessFully,
  UPDATE_TO_DO,
} from '../src/store/actions/to-do.action';
import { EOperation } from '../src/enums/common.enum';
import {
  AddToDoAction,
  DeleteToDoAction,
  GetToDosAction,
  UpdateToDoAction,
} from '../src/store/actions/type';
import { AjaxResponse } from 'rxjs/ajax';
import { EStatus } from '../src/enums/to-do.enum';
import { formatPagination } from '../src/utils/common';
import {
  IGetToDosResponse,
  IToDo,
  IUpdateToDoPayload,
} from '../src/utils/type';
import { IEpicDependency } from '../src/services/apis';
import { initialState } from '../src/constants/state';
import { Observable, of, Subject, throwError } from 'rxjs';
import { operate, setOverlay } from '../src/store/actions/common.action';
import { StateObservable } from 'redux-observable';
import { TestScheduler } from 'rxjs/internal/testing/TestScheduler';

const mockedApi: any = {
  toDo: {
    getAll: jest.fn,
    addOne: jest.fn,
    updateOne: jest.fn,
    deleteOne: jest.fn,
  },
};

describe('Test to-do epics', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual: any, expected: any): void => {
      expect(actual).toEqual(expected);
    });
  });

  describe('Test getListEpic', () => {
    it('Should debounce requests every 2000ms, get to-dos successfully, return result with empty query then hide overlay', () => {
      testScheduler.run(({ cold, expectObservable }) => {
        const mockedResponse: IGetToDosResponse = {
          list: [],
          pagination: formatPagination(),
        };
        mockedApi.toDo.getAll = jest
          .fn()
          .mockImplementationOnce(() => of(mockedResponse));

        const action$: Observable<GetToDosAction> = cold<GetToDosAction>(
          'a 499ms (a|)',
          { a: getToDos() }
        );
        const state$ = new StateObservable(new Subject(), initialState);
        const dependency$: IEpicDependency = mockedApi;
        const output$: Observable<IGetToDosResponse> = getListEpic(
          action$,
          state$,
          dependency$
        );

        expectObservable(output$).toBe('500ms (bc|)', {
          b: setToDos(mockedResponse),
          c: setOverlay(false),
        });
      });
    });

    it('Should failed and dispatch operate action', () => {
      testScheduler.run(({ cold, expectObservable }) => {
        const mockedError: Error = new Error('test error');
        mockedApi.toDo.getAll = jest
          .fn()
          .mockImplementationOnce(() => throwError(() => mockedError));

        const action$: Observable<GetToDosAction> = cold<GetToDosAction>(
          '(a|)',
          { a: getToDos() }
        );
        const state$ = new StateObservable(new Subject(), initialState);
        const dependency$: IEpicDependency = mockedApi;
        const output$: Observable<IGetToDosResponse> = getListEpic(
          action$,
          state$,
          dependency$
        );

        expectObservable(output$).toBe('(d|)', {
          d: operate([GET_TO_DOS, EOperation.READ, mockedError]),
        });
      });
    });
  });

  describe('Test addOneEpic', () => {
    it('Should add to-do successfully and dispatch operation action', () => {
      testScheduler.run(({ cold, expectObservable }) => {
        const mockedResponse: IToDo = {
          _id: '6221efe3f158a1fac79da385',
          title: 'b',
          status: EStatus.TO_DO,
        };
        mockedApi.toDo.addOne = jest
          .fn()
          .mockImplementationOnce(() => of(mockedResponse as any));

        const action$: Observable<AddToDoAction> = cold<AddToDoAction>('(a|)', {
          a: addToDo({
            title: mockedResponse.title,
            status: mockedResponse.status,
          }),
        });
        const state$ = new StateObservable(new Subject(), initialState);
        const dependency$: IEpicDependency = mockedApi;
        const output$: Observable<AjaxResponse<IToDo>> = addOneEpic(
          action$,
          state$,
          dependency$
        );

        expectObservable(output$).toBe('(bc|)', {
          b: addToDoSuccessFully(mockedResponse as any),
          c: operate([ADD_TO_DO, EOperation.CREATE, mockedResponse]),
        });
      });
    });

    it('Should failed and dispatch operate action', () => {
      testScheduler.run(({ cold, expectObservable }) => {
        const mockedError: Error = new Error('test error');
        mockedApi.toDo.addOne = jest
          .fn()
          .mockImplementationOnce(() => throwError(() => mockedError));

        const action$: Observable<AddToDoAction> = cold<AddToDoAction>('(a|)', {
          a: addToDo({ title: 'b', status: EStatus.TO_DO }),
        });
        const state$ = new StateObservable(new Subject(), initialState);
        const dependency$: IEpicDependency = mockedApi;
        const output$: Observable<AjaxResponse<IToDo>> = addOneEpic(
          action$,
          state$,
          dependency$
        );

        expectObservable(output$).toBe('(d|)', {
          d: operate([ADD_TO_DO, EOperation.CREATE, mockedError]),
        });
      });
    });
  });

  describe('Test updateOneEpic', () => {
    const mockedPayload: IUpdateToDoPayload = {
      id: '6221efe3f158a1fac79da385',
      data: {
        title: 'new',
        status: EStatus.DOING,
      },
    };
    const mockedResponse: IToDo = {
      _id: mockedPayload.id,
      ...mockedPayload.data,
    };

    it('Should update to-do successfully and dispatch operation action', () => {
      testScheduler.run(({ cold, expectObservable }) => {
        mockedApi.toDo.updateOne = jest
          .fn()
          .mockImplementationOnce(() => of(mockedResponse as any));

        const action$: Observable<UpdateToDoAction> = cold<UpdateToDoAction>(
          '(a|)',
          { a: updateToDo(mockedPayload) }
        );
        const state$ = new StateObservable(new Subject(), initialState);
        const dependency$: IEpicDependency = mockedApi;
        const output$: Observable<AjaxResponse<IToDo>> = updateOneEpic(
          action$,
          state$,
          dependency$
        );

        expectObservable(output$).toBe('(bc|)', {
          b: updateToDoSuccessFully(mockedResponse as any),
          c: operate([UPDATE_TO_DO, EOperation.UPDATE, mockedResponse]),
        });
      });
    });

    it('Should failed and dispatch operate action', () => {
      testScheduler.run(({ cold, expectObservable }) => {
        const mockedError: Error = new Error('test error');
        mockedApi.toDo.updateOne = jest
          .fn()
          .mockImplementationOnce(() => throwError(() => mockedError));

        const action$: Observable<UpdateToDoAction> = cold<UpdateToDoAction>(
          '(a|)',
          { a: updateToDo(mockedPayload) }
        );
        const state$ = new StateObservable(new Subject(), initialState);
        const dependency$: IEpicDependency = mockedApi;
        const output$: Observable<AjaxResponse<IToDo>> = updateOneEpic(
          action$,
          state$,
          dependency$
        );

        expectObservable(output$).toBe('(d|)', {
          d: operate([UPDATE_TO_DO, EOperation.UPDATE, mockedError]),
        });
      });
    });
  });

  describe('Test deleteOneEpic', () => {
    const mockedResponse: IToDo = {
      _id: '6221efe3f158a1fac79da385',
      title: 'b',
      status: EStatus.TO_DO,
    };

    it('Should delete to-do successfully, dispatch operation action and dispatch get-to-do action', () => {
      testScheduler.run(({ cold, expectObservable }) => {
        mockedApi.toDo.deleteOne = jest
          .fn()
          .mockImplementationOnce(() => of(mockedResponse as any));

        const action$: Observable<DeleteToDoAction> = cold<DeleteToDoAction>(
          '(a|)',
          {
            a: deleteToDo('6221efe3f158a1fac79da385'),
          }
        );
        const state$ = new StateObservable(new Subject(), initialState);
        const dependency$: IEpicDependency = mockedApi;
        const output$: Observable<AjaxResponse<IToDo>> = deleteOneEpic(
          action$,
          state$,
          dependency$
        );

        expectObservable(output$).toBe('(bc|)', {
          b: operate([DELETE_TO_DO, EOperation.DELETE, mockedResponse]),
          c: getToDos(),
        });
      });
    });

    it('Should failed and dispatch operate action', () => {
      testScheduler.run(({ cold, expectObservable }) => {
        const mockedError: Error = new Error('test error');
        mockedApi.toDo.deleteOne = jest
          .fn()
          .mockImplementationOnce(() => throwError(() => mockedError));

        const action$: Observable<DeleteToDoAction> = cold<DeleteToDoAction>(
          '(a|)',
          {
            a: deleteToDo('6221efe3f158a1fac79da385'),
          }
        );
        const state$ = new StateObservable(new Subject(), initialState);
        const dependency$: IEpicDependency = mockedApi;
        const output$: Observable<AjaxResponse<IToDo>> = deleteOneEpic(
          action$,
          state$,
          dependency$
        );

        expectObservable(output$).toBe('(d|)', {
          d: operate([DELETE_TO_DO, EOperation.DELETE, mockedError]),
        });
      });
    });
  });
});
