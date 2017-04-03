import { NativeModules } from 'react-native';
var CalendarManager = NativeModules.VoipReact;




export default class MvoipReact
{


     static initVoip(sAppKey)
     {

       CalendarManager.initVoip(sAppKey);

     }

     static connectServer(sUserToken,fCallBack){
       CalendarManager.connectServer(sUserToken,fCallBack);
     }


     static startCall(sUserId){
       CalendarManager.startCall(sUserId);
     }



}
