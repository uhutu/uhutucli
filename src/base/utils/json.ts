
import beautify = require('beautify');

import utilsIo = require('./io');




class MutilsJson {
  saveJsonFile(sPath, oJson) {
    utilsIo.writeFile(sPath, beautify(JSON.stringify(oJson), { format: 'json' }));
  }

  /**
   * 从json文件中读取配置
   * 
   * @param {string} sPath 
   * @returns {*} 
   * 
   * @memberOf MutilsJson
   */
  readJsonFile(sPath: string): any {

    return JSON.parse(utilsIo.readFile(sPath));
  }

  stringify(oJson): string {
    return JSON.stringify(oJson);
  }
  parse(sJson: string): any {
    return JSON.parse(sJson);
  }
}




export =new MutilsJson();
