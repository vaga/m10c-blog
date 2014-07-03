var express = require('express')
  , Blog = require('./lib/blog')

var app = express();
var config = require('./config');

app.set('views', './views');
app.set('view engine', 'jade');

var blog = Blog(app, config);
blog.run();

// Let's gooo !
app.listen(8106); // 8106 = BLOG :P
