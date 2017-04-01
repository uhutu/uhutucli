# uhutucli项目文档

## 目录结构

>*cli-local* 本地执行脚本
>
>*compile* 编译后的实际运行js代码
>
>*resources* 资源文件夹
>>*files-local* 本地执行cli时使用的文件  
>>*files-project* 在build项目时的各种配置文件  
>>*files-template* 项目的模板文件
>
>*src* uhutucli的typescript代码
>
>*test* 测试相关内容
>>*source* 测试的源代码  
>>*target* 测试的编译后的js代码
>
>*webdoc* 文档
>
>*circle.yml* circleci的配置文件
>
>*gilefile.js* 执行--build时使用的gulp配置文件
>
>*tsconfig.json* ts项目的编译配置并且vscode需要使用该文件

## 代码开发指令

在开发本项目的代码时，基本使用的都是npm run命令进行辅助快速开发

* `npm run dev` 编译代码并将uhutu-cli命令拷贝到全局中
* `npm run dev-watch` 编写src文件夹下代码时的辅助命令，该命令会监听并实时更新uhutu-cli
* `npm run dev-test` 编译测试代码并且执行test

## github开发

* 开发代码使用分支，master不只接受合并请求，不直接修改代码
* 只有master进ci操作
* npm发布手动在git操作

## 其他