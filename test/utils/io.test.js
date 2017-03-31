var should = require('should');


var TestTarget="../../compile/base/utils/io";

var utilsTest = require(TestTarget);

describe(TestTarget, function () {

  describe('#flagExist',function(){

    it('empty file ', function () {


      utilsTest.flagExist().should.equal(false);
    });
  });
});
