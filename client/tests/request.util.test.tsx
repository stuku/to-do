import { defaultSortBy } from '@constants/common';
import { encodeToDoQuery, formatToDoQuery } from '@utils/requests';
import { ESort } from '@enums/common.enum';
import { EStatus } from '@enums/to-do.enum';
import { formatPagination } from '@utils/common';
import { ISortBy, IToDoFilterBy } from '@store/reducers/type';
import { IPagination } from '@utils/type';

describe('Test methods in request util', () => {
  describe('Test method encodeToDoQuery', () => {
    it('Should return empty string if query is undefined', () => {
      expect(encodeToDoQuery()).toBe('');
    });

    it('Should return encoded query if query is valid', () => {
      expect(
        encodeToDoQuery({
          __l: 10,
          __p: 0,
          __sv: ESort.ASC,
          __sp: 'title',
          title: 'title',
          description: '',
          status: EStatus.TO_DO,
        })
      ).toBe(
        '__l=10&__p=0&__sp=title&__sv=1&description=&status=0&title=title'
      );
    });
  });

  describe('Test method formatToDoQuery', () => {
    it('Should return default to-do query object if query is empty', () => {
      expect(formatToDoQuery()).toStrictEqual({
        __sp: defaultSortBy.property,
        __sv: defaultSortBy.value,
        __l: 10,
        __p: 0,
      });
    });

    it('Should return encoded query if query is valid', () => {
      const filterBy: IToDoFilterBy = {
        title: 'title',
        description: '',
        status: EStatus.TO_DO,
      };
      const sortBy: ISortBy = { property: 'title', value: ESort.ASC };
      const pagination: IPagination = formatPagination();
      expect(formatToDoQuery(filterBy, sortBy, pagination)).toStrictEqual({
        ...filterBy,
        __sp: sortBy.property,
        __sv: sortBy.value,
        __l: 10,
        __p: 0,
      });
    });

    it('Should return encoded query if query is undefined', () => {
      expect(formatToDoQuery(undefined, undefined, undefined)).toStrictEqual({
        __sp: defaultSortBy.property,
        __sv: defaultSortBy.value,
        __l: 10,
        __p: 0,
      });
    });
  });
});
