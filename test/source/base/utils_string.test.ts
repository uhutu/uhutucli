import chai = require('chai');
var should=chai.should();

var TestTarget="base/utils/string";
import 'mocha';
import utilsString = require("../../../src/base/utils/string");

describe(TestTarget, function () {

  describe('#replaceBetween',function(){

    var sInString="abcdefg\nhijklmn";
    var sStart="bc";
    var sEnd="lm";
    var sWith="x";

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



describe(TestTarget, function () {

  describe('#reaplaceBig',function(){

    it('test a', function () {

      utilsString.reaplaceBig("abcdefg","//h","//i","jkl","c").should.equal('abc//hjkl//idefg');
    });
    it('test b ', function () {

      utilsString.reaplaceBig("abc//hxyzxyzxyz//idefg","//h","//i","jkl","c").should.equal('abc//hjkl//idefg');
    });
    it('test when the last string is empty', function () {

      utilsString.reaplaceBig("abcdefg","//h","//i","jkl","").should.equal('abcdefg//hjkl//i');
    });

  });
});
