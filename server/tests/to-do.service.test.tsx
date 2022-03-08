import { clearDb, connectDb, disconnectDb } from './db';
import { IGetToDosResponse } from '@utils/type';
import { InvalidParamsError, NotFoundError, UnknownError } from '@utils/errors';
import mockedDb from './mocked-db.json';
import { lastValueFrom } from 'rxjs';
import ToDoModel, { IToDo } from '@models/to-do.model';
import { ToDoService } from '@services/to-do.service';

const mockedToDoModel: any = {
  find: jest.fn(() => mockedToDoModel),
  skip: jest.fn(() => mockedToDoModel),
  limit: jest.fn(() => mockedToDoModel),
};

beforeAll(async () => await connectDb());
afterEach(async () => await clearDb());
afterAll(async () => await disconnectDb());

describe('Test methods in to-do service', () => {
  const toDoService: ToDoService = new ToDoService();
  let tmpToDoId: string = '';

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Test method getAll', () => {
    it('Should return all to-dos', async () => {
      const result$ = await toDoService.getAll();
      result$
        .subscribe((data: IGetToDosResponse) => {
          expect(data).toHaveProperty('list');
          expect(data.list).toBeInstanceOf(Array);
          expect(data.list.length).toBeLessThanOrEqual(10);
          expect(data).toHaveProperty('pagination');
          expect(data.pagination).toHaveProperty('totalCount');
          expect(data.pagination).toHaveProperty('pageSize');
          expect(data.pagination).toHaveProperty('page');
        })
        .unsubscribe();
    });

    it('Should return to-dos filtered by query', async () => {
      ToDoModel.find = jest.fn().mockImplementationOnce(() => ({
        skip: () => ({
          limit: () => ({
            exec: () =>
              mockedDb.toDos.filter((toDo) => toDo.title.match(/^te/)),
          }),
        }),
      }));
      const result$ = await toDoService.getAll({ title: 'te' });
      result$
        .subscribe((data: IGetToDosResponse) => {
          expect(data).toHaveProperty('list');
          expect(data.list[0].title).toBe(/^te/);
        })
        .unsubscribe();
    });

    it('Should failed and throw InvalidParamsError with wrong query', async () => {
      ToDoModel.find = jest.fn().mockImplementationOnce(() => ({
        skip: () => ({
          limit: () => ({
            exec: () => {
              throw new InvalidParamsError('');
            },
          }),
        }),
      }));
      await expect(toDoService.getAll()).rejects.toThrowError(
        InvalidParamsError
      );
    });
  });

  describe('Test method addOne', () => {
    it('Should add to-do successfully and return the data added', async () => {
      const result$ = await toDoService.addOne(mockedDb.toDos[0]);
      result$
        .subscribe((data: IToDo) => {
          tmpToDoId = data._id.toString();
          expect(data.title).toBe(mockedDb.toDos[0].title);
          expect(data.description).toBe(mockedDb.toDos[0].description);
          expect(data.status).toBe(mockedDb.toDos[0].status);
        })
        .unsubscribe();
    });

    it('Should failed and throw InvalidParamsError if length of given title less than 3', async () => {
      await expect(
        toDoService.addOne({ title: 'a', status: 1 })
      ).rejects.toThrowError(InvalidParamsError);
    });

    it('Should failed and throw UnknownError', async () => {
      ToDoModel.create = jest.fn().mockImplementationOnce(() => null);
      expect(
        lastValueFrom(await toDoService.addOne(mockedDb.toDos[0]))
      ).rejects.toThrowError(UnknownError);
    });
  });

  describe('Test method updateOne', () => {
    const { _id, ...rest } = mockedDb.toDos[1];

    it('Should update to-do successfully and return the data updated', async () => {
      ToDoModel.findOneAndUpdate = jest
        .fn()
        .mockImplementationOnce(() => ({ _id: tmpToDoId, ...rest }));
      const result$ = await toDoService.updateOne(tmpToDoId, rest);
      result$
        .subscribe((data: IToDo) => {
          expect(data.title).toBe(mockedDb.toDos[1].title);
        })
        .unsubscribe();
    });

    it('Should failed and throw InvalidParamsError if length of given title less than 3', async () => {
      await expect(
        toDoService.updateOne(tmpToDoId, { title: 'b', status: 1 })
      ).rejects.toThrowError(InvalidParamsError);
    });

    it('Should failed and throw NotFoundError if db execution returns null', async () => {
      ToDoModel.findOneAndUpdate = jest.fn().mockImplementationOnce(() => null);
      expect(
        lastValueFrom(
          await toDoService.updateOne('62261a7340c067d3b9af3eb0', rest)
        )
      ).rejects.toThrowError(NotFoundError);
    });
  });

  describe('Test method deleteOne', () => {
    it('Should delete to-do successfully and return the data deleted', async () => {
      ToDoModel.findOneAndDelete = jest.fn().mockImplementationOnce(() => ({
        ...mockedDb.toDos[1],
        _id: tmpToDoId,
      }));
      const result$ = await toDoService.deleteOne(tmpToDoId);
      result$
        .subscribe((data: IToDo) => {
          expect(data._id).toBe(tmpToDoId);
        })
        .unsubscribe();
    });

    it('Should failed and throw NotFoundError if db execution returns null', async () => {
      ToDoModel.findOneAndDelete = jest.fn().mockImplementationOnce(() => null);
      expect(
        lastValueFrom(await toDoService.deleteOne('62261a7340c067d3b9af3eb0'))
      ).rejects.toThrowError(NotFoundError);
    });
  });
});
