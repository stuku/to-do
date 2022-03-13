import { formatGetToDosResponse, generateResponse } from '@utils/response';
import { StatusCodes } from 'http-status-codes';

describe('Test methods in response util', () => {
  describe('Test method generateResponse', () => {
    it(`Should return ${StatusCodes.OK} response object`, () => {
      expect(generateResponse(StatusCodes.OK, '', null)).toStrictEqual({
        code: StatusCodes.OK,
        message: 'success',
        data: null,
      });
    });

    it(`Should return ${StatusCodes.BAD_REQUEST} response object`, () => {
      expect(generateResponse(StatusCodes.BAD_REQUEST, '', null)).toStrictEqual(
        {
          code: StatusCodes.BAD_REQUEST,
          message: 'One or more of the required parameters was missing.',
          data: null,
        }
      );
    });

    it(`Should return ${StatusCodes.NOT_FOUND} response object`, () => {
      expect(generateResponse(StatusCodes.NOT_FOUND, '', null)).toStrictEqual({
        code: StatusCodes.NOT_FOUND,
        message: 'Data with given parameters does not exists in the database.',
        data: null,
      });
    });

    it(`Should return ${StatusCodes.BAD_GATEWAY} response object`, () => {
      expect(
        generateResponse(StatusCodes.BAD_GATEWAY, 'bad gateway', null)
      ).toStrictEqual({
        code: StatusCodes.BAD_GATEWAY,
        message: 'bad gateway',
        data: null,
      });
    });
  });

  describe('Test method formatGetToDosResponse', () => {
    it('Should return get-to-dos response successfully', () => {
      expect(formatGetToDosResponse([[], 0], 10, 0)).toStrictEqual({
        list: [],
        pagination: {
          totalCount: 0,
          pageCount: 0,
          pageSize: 10,
          page: 0,
        },
      });
    });

    it('Should return get-to-dos response with NaN values', () => {
      expect(formatGetToDosResponse([[], NaN], NaN, NaN)).toStrictEqual({
        list: [],
        pagination: {
          totalCount: NaN,
          pageCount: NaN,
          pageSize: NaN,
          page: NaN,
        },
      });
    });
  });
});
