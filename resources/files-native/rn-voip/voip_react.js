import { NativeModules } from 'react-native';
var CalendarManager = NativeModules.VoipReact;




export default class PlugVoipReact
{


     static initVoip(sAppKey)
     {

       CalendarManager.initVoip("[@config:params.voipAppKey]");

     }

     static connectServer(sUserToken,fCallBack){
       CalendarManager.connectServer(sUserToken,fCallBack);
     }


     static startCall(sUserId){
       CalendarManager.startCall(sUserId);
     }



}
