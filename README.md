Botnana Blog View based on Yahoo's fluxible architecture.

## Usage

首先在 app.js 中插入 blogPlugin 及 fetchrPlugin，並登記好 BlogStore。

    var React = require('react');
    var Fluxible = require('fluxible');
    var fetchrPlugin = require('fluxible-plugin-fetchr');
    var blogPlugin = require('botnana-blog-view');
    var app = new Fluxible({
        component: React.createFactory(require('./components/Application.jsx'))
    });
    app.plug(fetchrPlugin({
        xhrPath: '/api'
    }));
    app.plug(blogPulgin);
    app.registerStore(require('botnana-blog-view/stores/BlogStore'));
    
其次，決定要採用的 backend 是 filesystem 還是 postgreSQL。參考 botnana-blog-service 的文件。
以下以 filesystem 為例。在 server.js 中登記 botnana-blog-service，並且在建造 context 時給予 blogPath 路徑。

    var express = require('express');
    var serialize = require('serialize-javascript');
    var bodyParser = require('body-parser');
    var cookieParser = require('cookie-parser');
    var csrf = require('csurf');
    var app = require('app');
    var server = express();
    var fetchrPlugin = app.getPlugin('FetchrPlugin');
    fetchrPlugin.registerService(require('botnana-blog-service').fs(__dirname + '/../node_modules/botnana-blog-service/examples/posts/'));
    server.use(fetchrPlugin.getXhrPath(), fetchrPlugin.getMiddleware());

如果使用 posstgreSQL 則如下

    fetchrPlugin.registerService(require('botnana-blog-service').pg('postgres://user:password@host:port/database');
    server.use(fetchrPlugin.getXhrPath(), fetchrPlugin.getMiddleware());
    
也可以考慮使用 blog-service 的 configure 配合 configuration file。

之後就可以使用提供的 components 以及 actions 下的模組。

components/Blog.jsx 使用的是 Yahoo 的 flux-router-component，因此如果使用其他 router，必須另行提供 Blog.jsx。

使用 Blog.jsx 必須先在 server.js 建造 context 時給予 blogPath。
    server.use(function (req, res, next) {
        var context = app.createContext({
            blogPath: '/post',
            ...
        });
        ...
    });

在 render html 時應給予 context 為參數。

    var exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';
    var Component = app.getComponent();
    var html = React.renderToStaticMarkup(HtmlComponent({
        state: exposed,
        markup: React.renderToString(Component({context:context.getComponentContext()})),
        context: context.getComponentContext()
    }));
    res.send(html);

在使用 Blog.jsx 時，給序 blogPath。

    <Blog blogPath={this.props.context.blogPath}/>


之後請參考 examples/configs/routes.js 中對 showBlog 及 showPosts 的使用。


## Post creattion, deletion, update

actions 目錄內另外提供 createPost, deletePost 及 updatePost 方便對 blog 進行編修。

## Note

目前 blogPath 是在 createContext 時宣告。考慮採用像其他 plugin 的作法，在 app.plug(blogPlugin) 時宣告。

