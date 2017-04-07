$ npm install code-push-cli@latest -g


$ code-push login https://code-push.srnpr.com  


codepush 配置文件参考文档：
https://github.com/lisong/code-push-server/blob/master/docs/react-native-code-push.md



$ git clone https://github.com/lisong/code-push-server.git
$ cd code-push-server
$ npm install

#初始化mysql数据库
$ ./bin/db init --dbhost srnpr-yh.mysql.rds.aliyuncs.com  --dbuser codepush --dbpassword Codepush_5tgb --force

修改配置文件：
db: {
    username: "codepush",
    password: "Codepush_5tgb",
    database: "codepush",
    host: "srnpr-yh.mysql.rds.aliyuncs.com",
    port: 3306,
    dialect: "mysql"
  },

local: {
    // Binary files storage dir, Do not use tmpdir and it's public download dir.
    storageDir: "/opt/codepush/storage",
    // Binary files download host address which Code Push Server listen to. the files storage in storageDir.
    downloadUrl: "https://code-push.srnpr.com/download",
    // public static download spacename.
    public: '/download'
  },


$ ./bin/www #启动服务 浏览器中打开 http://127.0.0.1:3000





