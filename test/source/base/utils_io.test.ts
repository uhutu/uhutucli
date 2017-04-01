import chai = require('chai');
var should=chai.should();
import 'mocha';

var TestTarget="base/utils/io";

import utilsTest = require("../../../src/base/utils/io");

describe(TestTarget, function () {

  describe('#flagExist',function(){

    it('empty file ', function () {


      utilsTest.flagExist(null).should.equal(false);
    });
  });
});
