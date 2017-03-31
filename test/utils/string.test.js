let should = require('should');


const TestTarget="../../compile/base/utils/string";

let utilsString = require(TestTarget);

describe(TestTarget, function () {

  describe('#replaceBetween',function(){

    let sInString="abcdefg\nhijklmn";
    let sStart="bc";
    let sEnd="lm";
    let sWith="x";

    it('test string replace with false', function () {


      utilsString.replaceBetween(sInString,sStart,sEnd,sWith,false).should.equal('abcxlmn');
    });

    it('test string replace with true', function () {

      utilsString.replaceBetween(sInString,sStart,sEnd,sWith,true).should.equal('axn');
    });

  });
});



describe(TestTarget, function () {

  describe('#formatString',function(){

    it('test format array', function () {

      utilsString.formatString("a{0}c{1}",['b','d']).should.equal('abcd');
    });
    it('test format string', function () {

      utilsString.formatString("a{0}c",'b').should.equal('abc');
    });
    it('test format object', function () {

      utilsString.formatString("a{key}c{val}",{key:'b',val:'d'}).should.equal('abcd');
    });

  });
});
