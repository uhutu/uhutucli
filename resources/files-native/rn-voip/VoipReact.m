

#import "VoipReact.h"

#import <RongCallKit/RCCall.h>
#import <RongCallKit/RongCallKit.h>



@implementation VoipReact

RCT_EXPORT_MODULE();


RCT_EXPORT_METHOD(initVoip:(NSString *)appKey)
{
  [[RCIM sharedRCIM] initWithAppKey:appKey];
}



RCT_EXPORT_METHOD(connectServer:(NSString *)userToken findEvents:(RCTResponseSenderBlock)callback )
{
  RCTLogInfo(@"Pretending to create an event %@  ", userToken);
  
  [[RCIM sharedRCIM] connectWithToken:userToken   success:^(NSString *userId) {
    NSLog(@"登陆成功。当前登录的用户ID：%@", userId);
    
    NSArray *events = @[userId];
    callback(@[[NSNull null], events]);
    
  } error:^(RCConnectErrorCode status) {
    NSLog(@"登陆的错误码为:%d", status);
  } tokenIncorrect:^{
    //token过期或者不正确。
    //如果设置了token有效期并且token过期，请重新请求您的服务器获取新的token
    //如果没有设置token有效期却提示token错误，请检查您客户端和服务器的appkey是否匹配，还有检查您获取token的流程。
    NSLog(@"token错误");
  }];
  
}


RCT_EXPORT_METHOD(startCall:(NSString *)frindUserId)
{
  [[RCCall sharedRCCall] startSingleCall:frindUserId
   	                               mediaType:RCCallMediaVideo];
}


@end
