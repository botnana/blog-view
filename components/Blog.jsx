var React = require('react');
var Moment  = require('./Moment.jsx');
var FluxibleMixin = require('fluxible').Mixin;
var BlogStore = require('../stores/BlogStore');
var _ = require('lodash');
var NavLink = require('flux-router-component').NavLink;
    
var Blog = React.createClass({
    mixins: [FluxibleMixin],
    statics: {
        storeListeners: [BlogStore]
    },
    getInitialState: function () {
        return this.getState();
    },
    getState: function () {
        var store = this.getStore(BlogStore);
        return {
            nowShowing: this.state && this.state.nowShowing || 'ALL_TODOS',
            blogTitle: store.blogTitle, 
            list: store.getList()
        };
    },
    onChange: function() {
        this.setState(this.getState());
    },
    render: function() {
        var self = this;
        return (
            <div className="botnana-blog">
                <h2>{this.state.blogTitle}</h2>
                { 
                    _.map(this.state.list, function(post, key) {
                        var moment = '';
                        var author = '';
                        var price = '';
                        var img = '';
                        if (post.published) {
                            moment = <Moment datetime={post.published} />;
                        }
                        if (post.author) {
                            author = <span>by {post.author}</span>;
                        }
                        if (post.price) {
                            price = <span>特價 {post.price} 元</span>;
                        }
                        if (post.img) {
                            img =
                                <div className="thumb">
                                    <NavLink href={self.props.blogPath + "/" + post.md}>
                                        <img src={"/assets/img/" + post.img}></img>
                                    </NavLink>
                                </div>;
                        }
                        return <article key={key}>
                            {img}
                            <header>
                                <h3>
                                    <NavLink href={self.props.blogPath + "/" + post.md}>{post.title}</NavLink>
                                </h3>
                                <p>
                                    {moment} {author} {price}
                                </p>
                                <blockquote>{post.preview}</blockquote>
                            </header>
                            <div className="clr"/>
                        </article>
                    })

                }
                <div id="post">
                </div>
          </div>
        );
    }
});

module.exports = Blog;
