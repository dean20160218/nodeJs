/*+++++++++++++++++++++++++++++++++++++++++++++
+		    应用程序的配置的文件                     +
+++++++++++++++++++++++++++++++++++++++++++++*/

'use strict'
const  express = require('express'),
		   exphbs = require('express-handlebars'),
		   bodyParser = require('body-parser'),
		   cookieParser = require('cookie-parser'),
			 my_routes = require('./routes/my_routes'),   //配置 路由文件
		   app = express();

//请求主体解析
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

//cookie解析
app.use(cookieParser());

//使用static中间件 制定public目录为静态资源目录,其中资源不会经过任何处理
app.use('/static',express.static(__dirname + '/public'));


//引用express-handlebars模板引擎
app.engine('.hbs',exphbs({
		defaultLayout: 'index',  //默认布局模板为mindex.hbs
		extname:'.hbs'
	})
);
app.set('view engine','.hbs');


//使用 -Routes- 定义的路由
app.use('/', my_routes);


//异常处理
let handleStatusError = (status) => {
		app.use((req,res,next) => {
		res.status(status)
		res.sendfile('views/pages/error/error.html')
	})
}



app.listen(5000,function(){
	console.log('服务启动了！端口号是:5000')
});


// module.exports = app;