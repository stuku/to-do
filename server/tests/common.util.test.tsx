import { countPage, forceParseInt, formatPagination } from '@utils/common';

describe('Test methods in common util', () => {
  describe('Test method forceParseInt', () => {
    it('Should return integer if parameter is integer', () => {
      expect(forceParseInt(1)).toBe(1);
    });

    it('Should return integer if parameter is numeric string', () => {
      expect(forceParseInt('1')).toBe(1);
    });

    it('Should return -1 if parameter is not numeric', () => {
      expect(forceParseInt('x')).toBe(NaN);
    });
  });

  describe('Test method countPage', () => {
    it('Should return integer successfully', () => {
      expect(countPage(5, 2)).toBe(3);
    });

    it('Should return 0 if parameter is invalid', () => {
      expect(countPage(5, 0)).toBe(0);
    });
  });

  describe('Test method formatPagination', () => {
    it('Should return default pagination successfully', () => {
      expect(formatPagination()).toStrictEqual({
        totalCount: 0,
        pageCount: 0,
        pageSize: 10,
        page: 0,
      });
    });

    it('Should return correct pagination successfully', () => {
      expect(formatPagination(10, 5, 1)).toStrictEqual({
        totalCount: 10,
        pageCount: 2,
        pageSize: 5,
        page: 1,
      });
    });
  });
});
