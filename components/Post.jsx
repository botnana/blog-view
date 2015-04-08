var Moment = require('./Moment.jsx');
var FluxibleMixin = require('fluxible').Mixin;
var BlogStore = require('../stores/BlogStore');
var React = require('react');
    
var Post = React.createClass({
    mixins: [FluxibleMixin],
    statics: {
        storeListeners: [BlogStore]
    },
    getInitialState: function () {
        return this.getState();
    },
    getState: function () {
        return this.getStore(BlogStore).getPosts();
    },
    onChange: function () {
        this.setState(this.getState());
    },
    handleMsl: function(event) {
        event.preventDefault();
        console.log('handleMsl');
    },
    handleJavascript: function(event) {
        event.preventDefault();
        console.log('handleJavascript');
    },
    componentDidMount: function () {
        var node = this.getDOMNode();
        var editor, button;
        var i;
        var forms = node.querySelectorAll('form.msl, form.javascript');
        console.log(forms);
        for (i = 0; i < forms.length; ++i) {
            editor = ace.edit(forms[i].querySelector('pre.editor'));
            editor.setTheme("ace/theme/twilight");
            button = forms[i].querySelector('button');
            if(forms[i].classList.contains("msl")) {
                editor.getSession().setMode("ace/mode/forth");
                button.addEventListener("click", this.handleMsl, false);
            } else if(forms[i].classList.contains("javascript")) {
                editor.getSession().setMode("ace/mode/javascript");
                button.addEventListener("click", this.handleJavascript, false);
            }
        }
    },
    render: function() {
        var md;
        if (typeof this.state.md === "string") {
            md = this.state.md;
        } else {
            md = this.state.md[0];
        }
        var post = this.state.posts[md];
        var moment = '';
        var author = '';
        var price = '';
        var img = '';
        if (post.published) {
            moment = <Moment datetime={post.published} />;
        }
        if (post.author) {
            author = <span> by {post.author}</span>;
        }
        if (post.price) {
            price = <span> 特價 {post.price} 元</span>;
        }
        if (post.img) {
            img =
                <div className="thumb">
                    <img src={"/assets/img/" + post.img}></img>
                </div>;
        }
        return (
            <div className="botnana-post">
                {img}
                <header>
                    <h1>{post.title}</h1>
                    <p>{moment} {author} {price}</p>
                </header>
                <span dangerouslySetInnerHTML={{__html: post.content}} />
            </div>
        );
    }
});

module.exports = Post;
