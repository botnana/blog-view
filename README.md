Botnana Blog View based on Yahoo's fluxible architecture.

<h2>Usage</h2>

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
    
其次，在 server.js 中登記 botnana-blog-service，並且在建造 context 時給予 blogPath 路徑。

    var express = require('express');
    var serialize = require('serialize-javascript');
    var bodyParser = require('body-parser');
    var cookieParser = require('cookie-parser');
    var csrf = require('csurf');
    var app = require('app');
    var server = express();
    var fetchrPlugin = app.getPlugin('FetchrPlugin');
    fetchrPlugin.registerService(require('botnana-blog-service')(__dirname + '/../node_modules/botnana-blog-service/examples/posts/'));
    server.use(fetchrPlugin.getXhrPath(), fetchrPlugin.getMiddleware());

    server.use(function (req, res, next) {
        var context = app.createContext({
            blogPath: '/post',
            req: req, // The fetchr plugin depends on this
            xhrContext: {
                _csrf: req.csrfToken() // Make sure all XHR requests have the CSRF token
            }
        });
        ...
    });

之後就可以使用提供的 components 以及 actions 下的模組。

components/Blog.jsx 使用的是 Yahoo 的 flux-router-component，因此如果使用其他 router，必須另行提供 Blog.jsx。

<h2>Note</h2>

目前提供的採用 server side routing。Blog 中指向 Post 的連結會導致整個頁面刷新。
Yahoo's 的 flux-router-component 也能以做到 client side routing。但要如何做還待研究。
而且連結固定指向 /post/。這也必須在未來修改。

此外，在 examples 中的 routes.js 內使用了 action，是否應只使用 dispatch？還再研究。聽說 Facebook 內部，action 內只單純執行 dispatch，並不叫用另一個 action。

最後，目前 blogPath 是在 createContext 時宣告。考慮採用像其他 plugin 的作法，在 app.plug(blogPlugin) 時宣告。

