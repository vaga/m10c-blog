var express = require('express')
  , exec = require('child_process').exec
  , posts = require('./posts');

function Blog(app, config) {

    this.app = app;
    this.app.locals = config.locals;

    this.token = config.git.token;
    this.posts = new posts.Posts();
};

Blog.prototype.run = function () {

    // Init posts
    this.posts.init();
    // Init route
    this.app.use(express.static('./public'));
    this.app.get('/', this.listAction.bind(this));
    this.app.get('/post/:post', this.postAction.bind(this));
    this.app.get('/tag/:tag', this.tagAction.bind(this));
    this.app.get('/rss', this.rssAction.bind(this));
    this.app.post('/sync/:token', this.syncAction.bind(this));
    this.app.use(this.errorAction.bind(this));
};

Blog.prototype.listAction = function (req, res, next) {
    res.render('page/list', {
        title: 'Mon blog',
        posts: this.posts.getPosts()
    });
};

Blog.prototype.postAction = function (req, res, next) {
    var post = this.posts.getPost(req.params.post);
    if (!post)
        next();
    else
        res.render('page/post', {
            title: post.title,
            post: post
        });
};

Blog.prototype.tagAction = function (req, res, next) {
    var posts = this.posts.getPostsByTag(req.params.tag);
    if (posts.length == 0)
        next();
    else
        res.render('page/tag', {
            title: 'Tag : ' + req.params.tag,
            posts: posts
        });
};

Blog.prototype.rssAction = function (req, res, next) {
    res.setHeader('Content-Type', 'application/rss+xml');
    res.render('rss', {
        posts: this.posts.getPosts(0, 10)
    });
};

Blog.prototype.syncAction = function (req, res, next) {
    // TODO: Find a better solution...
    if (this.token != req.params.token)
        next();
    else
        exec('git pull', function(error, stdout, stderr) {
            this.posts.init();
            res.send("<pre>Stdout :\n" + stdout + "\nError : \n" + stderr + "</pre>");
        }.bind(this));
};

Blog.prototype.errorAction = function (req, res, next) {
    res.status(404);
    res.render('404', {
        title: 'Erreur 404'
    });
};

module.exports = function (app, options) {
      return new Blog(app, options);
};
