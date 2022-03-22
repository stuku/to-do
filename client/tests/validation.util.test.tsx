import { EStatus } from '@enums/to-do.enum';
import { validateToDoParams } from '@utils/validation';

describe('Test methods in validation util', () => {
  describe('Test method validateToDoParams', () => {
    it('Should return true if parameters is valid', () => {
      expect(
        validateToDoParams({
          title: 'title',
          description: '',
          status: EStatus.TO_DO,
        })
      ).toBeTruthy();
    });

    it('Should return false if length of parameter title is less than 3', () => {
      expect(
        validateToDoParams({
          title: '12',
          status: EStatus.TO_DO,
        })
      ).toBeFalsy();
    });

    it('Should return false if type of parameter status is invalid', () => {
      expect(
        validateToDoParams({
          title: 'title',
          status: null,
        })
      ).toBeFalsy();
    });
  });
});
