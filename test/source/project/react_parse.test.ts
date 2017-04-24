
import utilsTest = require("../../../src/project/process-app/react_parse");



test('forReplace parse html', () => {
  //select("//application/@android:allowBackup",doc).value.should.equal(true);



let b=utilsTest.outFormat.forReplace('aaa[#item:cc]bb');
console.log(b);
expect(b).toBe('aaa{item.cc}bb');

//console.log(b);
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