
import utilsString = require("../../../src/base/utils/string");



var sInString="abcdefg\nhijklmn";
    var sStart="bc";
    var sEnd="lm";
    var sWith="x";


test('test string replace with false', () => {
  expect(utilsString.replaceBetween(sInString,sStart,sEnd,sWith,false)).toBe('abcxlmn');
});

test('test string replace with true', () => {
  expect(utilsString.replaceBetween(sInString,sStart,sEnd,sWith,true)).toBe('axn');
});

test('test format array', () => {
  expect(utilsString.formatString("a{0}c{1}",['b','d'])).toBe('abcd');
});
test('test format string', () => {
  expect(utilsString.formatString("a{0}c",'b')).toBe('abc');
});
test('test format array', () => {
  expect(utilsString.formatString("a{key}c{val}",{key:'b',val:'d'})).toBe('abcd');
});

test('test a', () => {
  expect(utilsString.reaplaceBig("abcdefg","//h","//i","jkl","c")).toBe('abc//hjkl//idefg');
});
test('test format array', () => {
  expect(utilsString.reaplaceBig("abc//hxyzxyzxyz//idefg","//h","//i","jkl","c")).toBe('abc//hjkl//idefg');
});
test('test format array', () => {
  expect(utilsString.reaplaceBig("abcdefg","//h","//i","jkl","")).toBe('abcdefg//hjkl//i');
});



