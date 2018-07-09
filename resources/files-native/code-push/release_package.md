## 打包发布

* android打包 cd ./react[@config:project.projectName]/android && ./gradlew assembleRelease

### 更新

* ios更新

    code-push release-react [@config:project.projectName]-ios ios --dev false --d Production

    code-push deployment history [@config:project.projectName]-ios Production

强制更新指定版本
code-push release-react [@config:project.projectName]-ios ios --dev false --d Production --targetBinaryVersion 1.0.0  -m
code-push release-react [@config:project.projectName]-android android --dev false --d Production --targetBinaryVersion 1.0.0  -m

* android更新

    code-push release-react [@config:project.projectName]-android android --dev false --d Production



    code-push deployment history [@config:project.projectName]-android Production


codepush version 1.12.9-beta

## 生成key
* android添加生成key
code-push app add [@config:project.projectName]-android
* ios生成key
code-push app add [@config:project.projectName]-ios

