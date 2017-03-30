# 项目使用

这是一个命令行项目，用于生成react-native代码。

## 安装

首先安装npm，参考各种安装教程。

然后执行：

```node
npm install -g uhutu-cli
```

## 使用方法

进入一个空目录，执行，该操作将在当前目录创建一个config.json文件。编译该config.json文件，修改对应的值。

```node
uhutu-cli --config
```

执行install操作,该操作会初始化的各个项目。分别为react,vue,weapp项目。
```node
uhutu-cli --install
```

执行build操作，该操作会持续监听dev文件夹下的html文件和sass文件。实时生成对应的文件。
```node
uhutu-cli --build
```

