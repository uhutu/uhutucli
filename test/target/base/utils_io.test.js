"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai = require("chai");
var should = chai.should();
require("mocha");
var TestTarget = "base/utils/io";
var utilsTest = require("../../../compile/base/utils/io");
describe(TestTarget, function () {
    describe('#flagExist', function () {
        it('empty file ', function () {
            utilsTest.flagExist(null).should.equal(false);
        });
    });
});
