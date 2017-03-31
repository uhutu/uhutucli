# 项目使用  

标记：[![Circle CI](https://circleci.com/gh/uhutu/uhutucli.svg?style=shield)](https://circleci.com/gh/uhutu/uhutucli) [![npm version](https://badge.fury.io/js/uhutu-cli.svg)](https://badge.fury.io/js/uhutu-cli)

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
* 命令行参数参考`uhutu-cli --help`


## 项目文件夹目录

> *config.json*    配置文件  
> *dev*    开发代码文件夹  
>> *pages* 页面相关目录  
>> *master* 模板文件夹,子文件夹按照不同项目命名，如react,vue,weapp
>> *statics* 静态资源，子文件夹按不同项目命名，里面的文件会在执行build命令时拷贝到对应的实际项目目录下。
>
> *disk*   cli生成的文件夹目录  
>> *disk_config.json* 系统生成的配置文件的最终版  
>
> *logs* 文件夹  
> *reactdemo*  React项目文件夹  



## 编写代码

执行build操作，该操作会持续监听dev文件夹下的html文件和sass文件。实时生成对应的文件。
```node
uhutu-cli --build
```

