import {monthDifference} from '../../../src/utils/monthsDifference';

test('Should extract an image from the body correctly', () => {
  expect( monthDifference('2018-03-03') ).toEqual(11)
});