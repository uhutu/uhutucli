let should = require('should');


const TestTarget="../../compile/base/utils/io";

let utilsTest = require(TestTarget);

describe(TestTarget, function () {

  describe('#flagExist',function(){

    it('empty file ', function () {


      utilsTest.flagExist().should.equal(false);
    });
  });
});
