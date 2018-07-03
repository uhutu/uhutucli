package com.reactmediciner;



import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.ViewManager;

import android.app.Activity;
import android.util.Log;
import android.view.WindowManager;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import io.rong.calllib.RongCallClient;
import io.rong.callkit.RongCallKit;
import io.rong.calllib.RongCallCommon;
import io.rong.imkit.RongIM;
import io.rong.imlib.RongIMClient;


public class VoipReactModule extends ReactContextBaseJavaModule  {


  public VoipReactModule(ReactApplicationContext reactContext) {
    super(reactContext);

  }


  @Override
  public String getName() {
    return "VoipReact";
  }



  @ReactMethod
  public void initVoip(String sAppKey) {
    //RongIMClient.init(getReactApplicationContext());

     RongIM.init(getReactApplicationContext());


    final Activity activity = getCurrentActivity();

    if (activity != null) {
      activity.runOnUiThread(new Runnable() {
        @Override
        public void run() {
          activity.getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        }
      });
    }

  }


  @ReactMethod
  public void connectServer(String token,Callback errorCallback) {

      Log.d("connectServer", "--onConnect---" + token);

      /**
       * IMKit SDK调用第二步,建立与服务器的连接
       */
      RongIMClient.connect(token, new RongIMClient.ConnectCallback() {



        /**
         * Token 错误，在线上环境下主要是因为 Token 已经过期，您需要向 App Server 重新请求一个新的 Token
         */
        @Override
        public void onTokenIncorrect() {

          Log.d("LoginActivity", "--onTokenIncorrect");
        }

        /**
         * 连接融云成功
         * @param userid 当前 token
         */
        @Override
        public void onSuccess(String userid) {

          Log.d("LoginActivity", "--onSuccess---" + userid);

          RongCallClient.getInstance().setVideoProfile(RongCallCommon.CallVideoProfile.VIDEO_PROFILE_720P);

        }

        /**
         * 连接融云失败
         * @param errorCode 错误码，可到官网 查看错误码对应的注释
         */
        @Override
        public void onError(RongIMClient.ErrorCode errorCode) {

          Log.d("LoginActivity", "--onError" + errorCode);
        }
      });

  }


  @ReactMethod
  public void startCall(String sFriendId){


    RongCallKit.startSingleCall(getCurrentActivity(), sFriendId, RongCallKit.CallMediaType.CALL_MEDIA_TYPE_VIDEO);

  }

  
}