# 项目使用  
这是一个命令行项目，用于生成react-native代码。

## 安装  
* 安装 [Node.js](https://nodejs.org/)  
* 然后执行：  
```bash
npm install -g uhutu-cli
```

## 使用方法  
* 在一个空文件夹，执行`uhutu-cli --config`,该操作将在当前目录创建一个config.json文件。编译该config.json文件，修改对应的值。
* 执行`uhutu-cli --install`,该操作会初始化的各个项目。分别为react,vue,weapp项目。



## 项目文件夹目录
>dev    开发代码文件夹  
>>pages 页面相关目录  
>>master 模板文件夹 
>disk   cli生成的文件夹目录  
>config.json    配置文件  
>reactdemo  React项目文件夹


## 编写代码

执行build操作，该操作会持续监听dev文件夹下的html文件和sass文件。实时生成对应的文件。
```node
uhutu-cli --build
```

