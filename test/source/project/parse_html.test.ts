/*
import utilsTest = require("../../../src/project/gulp-use/parse_html");




import CommandTest=require("../../../src/command/start-command/command_test");

import * as AimLocal from "../../../src/cli/aim-top/aim_local";
import * as AimParse from "../../../src/project/aim-project/aim_parse";

import ParseHtml = require("../../../src/project/gulp-use/parse_html");
*/


test('test parse regex include ', () => {


  let sInput = '<!--  #include file="myfile.html" -->aabb<!-- #include file = "myfile2.html" -->';
  let oParseFile = { fileContent: sInput };

  let regInclude = new RegExp('<!--\\s+#include\\s+file.*?\"(.*?)\"\\s+-->', 'gm');
  let result;
  while ((result = regInclude.exec(oParseFile.fileContent)) != null) {
    console.warn(result);
  }

})




test('test parse html', () => {
  //select("//application/@android:allowBackup",doc).value.should.equal(true);





  //let oLocalConfig= CommandTest.upTestConfig();


  //console.log(oLocalConfig);

  /*
  var oParseFile = new AimParse.MprocessParseFile();
              oParseFile.parseType = 'react';
              oParseFile.fileContent = '';
  
  
              oParseFile.fileBasename = 'index';
  
              
              let content = ParseHtml.contentParse(oLocalConfig, oParseFile);
  
  */

});
