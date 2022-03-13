import { EStatus } from '@enums/to-do.enum';
import { formatQuery, getSkipNumber } from '@utils/requests';
import { IToDoQuery } from '@utils/type';

describe('Test methods in request util', () => {
  describe('Test method formatQuery', () => {
    it(`Should return empty query`, () => {
      expect(formatQuery(undefined)).toStrictEqual({});
    });

    it(`Should return formatted query`, () => {
      const query: IToDoQuery = {
        __l: 10,
        __p: 0,
        __sv: 1,
        __sp: 'title',
        title: 'xxxxxxxx',
        description: 'ooo',
        status: EStatus.TO_DO,
      };
      expect(formatQuery(query)).toStrictEqual({
        title: { $regex: new RegExp('^' + query.title, 'i') },
        description: { $regex: new RegExp('^' + query.description, 'i') },
        status: { $eq: query.status },
      });
    });
  });

  describe('Test method getSkipNumber', () => {
    it('Should return get-to-dos response successfully', () => {
      expect(getSkipNumber(10, 0)).toBe(0);
    });
  });
});
