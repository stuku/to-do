import { ADD_TO_DO } from '@store/actions/to-do.action';
import {
  capitalize,
  countPage,
  forceParseInt,
  formatPagination,
  getToastMessage,
  mapBadgeColor,
  replaceElementIfExistedArray,
  unshiftFixLengthArray,
} from '@utils/common';
import { EOperation } from '@enums/common.enum';
import { EStatus } from '@enums/to-do.enum';
import { IToDo } from '@utils/type';
import mockedDb from './mocked-db.json';

describe('Test methods in common util', () => {
  describe('Test method forceParseInt', () => {
    it('Should return integer if parameter is integer', () => {
      expect(forceParseInt(1)).toBe(1);
    });

    it('Should return integer if parameter is numeric string', () => {
      expect(forceParseInt('1')).toBe(1);
    });

    it('Should return NaN if parameter is not numeric', () => {
      expect(forceParseInt('x')).toBe(NaN);
    });
  });

  describe('Test method countPage', () => {
    it('Should return integer', () => {
      expect(countPage(5, 2)).toBe(3);
    });

    it('Should return 0 if parameter is invalid', () => {
      expect(countPage(5, 0)).toBe(0);
    });
  });

  describe('Test method formatPagination', () => {
    it('Should return default pagination', () => {
      expect(formatPagination()).toStrictEqual({
        totalCount: 0,
        pageCount: 0,
        pageSize: 10,
        page: 0,
      });
    });

    it('Should return correct pagination', () => {
      expect(formatPagination(10, 5, 1)).toStrictEqual({
        totalCount: 10,
        pageCount: 2,
        pageSize: 5,
        page: 1,
      });
    });
  });

  describe('Test method capitalize', () => {
    it('Should return capitalized string', () => {
      expect(capitalize('test')).toBe('Test');
    });
  });

  describe('Test method getToastMessage', () => {
    it('Should return correct toast message', () => {
      expect(getToastMessage([ADD_TO_DO, EOperation.CREATE, ''])).toBe(
        'ADD_TO_DO Created '
      );
    });
  });

  describe('Test method mapBadgeColor', () => {
    it(`Should return 'info' if input equals to ${EStatus.TO_DO}`, () => {
      expect(mapBadgeColor(EStatus.TO_DO)).toBe('info');
    });

    it(`Should return 'secondary' if input equals to ${EStatus.DOING}`, () => {
      expect(mapBadgeColor(EStatus.DOING)).toBe('secondary');
    });

    it(`Should return 'success' if input equals to ${EStatus.DONE}`, () => {
      expect(mapBadgeColor(EStatus.DONE)).toBe('success');
    });

    it(`Should return 'warning' if input equals to ${EStatus.PENDING}`, () => {
      expect(mapBadgeColor(EStatus.PENDING)).toBe('warning');
    });

    it(`Should return 'error' if input is invalid`, () => {
      expect(mapBadgeColor(null)).toBe('error');
    });
  });

  describe('Test method unshiftFixLengthArray', () => {
    it('Should return an array with the input element only', () => {
      expect(unshiftFixLengthArray(0, [])).toStrictEqual([0]);
    });

    it('Should return an array with input element as the 1st element and the length of the array equals to the origin length of the input array', () => {
      expect(unshiftFixLengthArray(0, [1, 2])).toStrictEqual([0, 1, 2]);
    });

    it('Should return an array with input element as the 1st element and the length of the array equals to the target length', () => {
      expect(unshiftFixLengthArray(0, [1, 2, 3], 3)).toStrictEqual([0, 1, 2]);
    });
  });

  describe('Test method replaceElementIfExistedArray', () => {
    const compare = (target: IToDo, existed: IToDo): boolean =>
      target._id === existed._id;
    const targetToDo: IToDo = {
      _id: '6221efe3f158a1fac79da385',
      title: 'b',
      description: '',
      status: EStatus.TO_DO,
    };

    it('Should return an array with the input element only', () => {
      expect(
        replaceElementIfExistedArray(targetToDo, [], compare)
      ).toStrictEqual([targetToDo]);
    });

    it('Should return an array in which the target element been replaced', () => {
      expect(
        replaceElementIfExistedArray(targetToDo, mockedDb.toDos, compare)
      ).toStrictEqual([targetToDo, ...mockedDb.toDos.slice(1)]);
    });
  });
});
