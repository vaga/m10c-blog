var fs = require('fs')
  , fm = require('json-front-matter')
  , marked = require('marked');

marked.setOptions({
    highlight: function (code) {
        return require('highlight.js').highlightAuto(code).value;
    }
});

function Posts() {

    this.folder = './posts';
    this.posts = [];
};

Posts.prototype.insert = function (post) {

    // TODO: Sorted list
    this.posts.push(post);
    this.posts.sort(function (p1, p2) {
        return p2.date - p1.date;
    });
};

Posts.prototype.createPost = function (fileName) {

    var filePath =  this.folder + '/' + fileName;
    fs.readFile(filePath, 'utf-8', function (err, content) {
        var data = fm.parse(content);
        var post = data.attributes;
        post.slug = fileName.substr(0, fileName.length - 3);
        post.url = '/post/' + post.slug;
        post.date = new Date(post.date);
        post.content = marked.parse(data.body);
        this.insert(post);
    }.bind(this));
};

Posts.prototype.getPosts = function (start, end) {

    if (start = undefined)
        return this.posts;
    return this.posts.slice(start, end);
};

Posts.prototype.getPost = function (slug) {

    for (var i in this.posts) {
        if (this.posts[i].slug == slug)
            return this.posts[i];
    }
    return false;
};

Posts.prototype.getPostsByTag = function (tag) {

    var posts = [];
    for (var i in this.posts) {
        var post = this.posts[i];
        for (var j in post.tags) {
            if (post.tags[j] == tag)
                posts.push(post);
        }
    }
    return posts;
};

Posts.prototype.init = function () {

    this.posts.length = 0;
    fs.readdir(this.folder, function (err, files) {
        for (var i in files)
            this.createPost(files[i]);
    }.bind(this));
};

module.exports.Posts = Posts;
