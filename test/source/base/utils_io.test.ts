

import utilsTest =require( "../../../src/base/utils/io");




test('flagExist', () => {
  expect(utilsTest.flagExist(null)).toBe(false);
});
