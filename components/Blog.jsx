var React = require('react');
var Moment  = require('./Moment.jsx');
var FluxibleMixin = require('fluxible').Mixin;
var BlogStore = require('../stores/BlogStore');
var _ = require('lodash');
var NavLink = require('flux-router-component').NavLink;
var showBlog = require('../actions/showBlog');
    
var Section = React.createClass({
    render: function() {
        var self = this;
        return (
            <div className="botnana-blog-section">
                <h2>{this.props.sectionName}</h2>
                { 
                    _.map(this.props.list, function(post, key) {
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
                                        <img src={post.img}></img>
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
            </div>
        );
    }
});

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
        var list = store.getList().data;
        var consistentToServer = store.consistentToServer;
        var sectionNames = [];
        var sections = {};
        list.forEach(function(item) {
            item.tags.forEach(function(tag) {
                var idx = sectionNames.indexOf(tag);
                if(idx < 0) {
                    sectionNames.push(tag);
                    sections[tag] = [item];
                } else {;
                    sections[tag].push(item);
                }
            });
        });
        return {
            blogTitle: store.blogTitle, 
            list: list,
            sectionNames: sectionNames,
            sections: sections,
            consistentToServer: consistentToServer
        };
    },
    onChange: function() {
        this.setState(this.getState());
        if(!this.state.consistentToServer) {
            this.props.context.executeAction(showBlog, {});
        }
    },
    render: function() {
        var self = this;
        var sections = _.map(self.state.sectionNames, function(sectionName) {
            return ( 
                <Section key={sectionName} blogPath={self.props.blogPath} list={self.state.sections[sectionName]} sectionName={sectionName}/>
            );
        });
        return (
            <div className="botnana-blog">
                {sections}
            </div>
        );
    }
});

module.exports = Blog;
