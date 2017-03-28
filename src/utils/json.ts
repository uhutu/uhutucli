
import beautify = require('beautify');

import utilsIo = require('./io');




class MutilsJson {
  saveJsonFile(sPath, oJson) {
    utilsIo.writeFile(sPath, beautify(JSON.stringify(oJson), { format: 'json' }));
  }
  stringify(oJson): string {
    return JSON.stringify(oJson);
  }
  parse(sJson: string): any {
    return JSON.parse(sJson);
  }
}




export =new MutilsJson();
