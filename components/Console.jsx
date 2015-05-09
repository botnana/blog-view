/**
 * Copyright 2015, Mapacode Inc.
 * Copyrights licensed under the ISC License. See the accompanying LICENSE file for terms.
 */
'use strict';

var React = require('react');
var FluxibleMixin = require('fluxible').Mixin;
var BlogStore = require('../stores/BlogStore');
var createPost = require('../actions/createPost');
var deletePost = require('../actions/deletePost');
var showPost = require('../actions/showPost');
var uncheckPost = require('../actions/uncheckPost');
var updatePost = require('../actions/updatePost');
var uuid = require('node-uuid');
var moment = require('moment');

var NONE= 0;
var CREATING = 1;
var UPDATING = 2;

var Console = React.createClass({
    mixins: [FluxibleMixin],
    statics: {
        storeListeners: [BlogStore]
    },
    getConfig: function() {
        var config = this.props.config;
        var authorConfig = {
            hidden: false,
            value: ''
        };
        var publishedConfig = {
            hidden: false,
            generator: function () {
                return moment().format('YYYY-MM-DD');
            }
        };
        if(config) {
            if(config.author) {
                authorConfig.hidden = config.author.hidden || false;
                authorConfig.value = config.author.value || '';
            }
            if(config.published) {
                publishedConfig.hidden = config.published.hidden || false;
                if(config.published.generator) {
                    publishedConfig.generator = config.published.generator;
                }
            }
        }
        return {
            author: authorConfig,
            published: publishedConfig
        };
    },
    getInitialState: function() {
        return {
            visibleForm: false,
            editingMode: NONE,
            post_id: "",
            title: "",
            published: "",
            author: this.getConfig().author.value,
            price: "",
            tags: "",
            preview: "",
            content: ""
        };
    },
    handleTitle: function(ev) {
        this.setState({title: ev.target.value});
    },
    handlePublished: function(ev) {
        this.setState({published: ev.target.value});
    },
    handleAuthor: function(ev) {
        this.setState({author: ev.target.value});
    },
    handlePrice: function(ev) {
        this.setState({price: ev.target.value});
    },
    handleTags: function(ev) {
        this.setState({tags: ev.target.value});
    },
    handlePreview: function(ev) {
        this.setState({preview: ev.target.value});
    },
    handleContent: function(ev) {
        this.setState({content: ev.target.value});
    },
    handleSubmit: function(ev) {
        ev.preventDefault();
        var post = {
            title: this.state.title,
            published: this.state.published,
            author: this.state.author,
            price: this.state.price,
            tags: this.state.tags.split(',').map(function(item) { return item.trim(); }),
            preview: this.state.preview,
            content: this.state.content
        }
        if(this.state.editingMode===CREATING) {
            post.id = uuid.v4();
            this.props.context.executeAction(createPost, post);
        } else {
            post.id = this.state.post_id;
            this.props.context.executeAction(updatePost, post);
            this.setState({visibleForm: false});
        }
        this.setState({
            post_id: "",
            title: "",
            published: this.getConfig().published.generator(),
            author: this.getConfig().author.value,
            price: "",
            tags: "",
            preview: "",
            content: ""
        });
    },
    handleUpload: function(ev) {
        // 因為不能使用 form inside form，multipart 要如何處理？似乎要由 javascript 來產生這個 request 給 multer。
        console.log("handleUpload");
    },
    handleCreation: function(ev) {
        if(this.state.visibleForm) {
            this.setState({
                visibleForm: false,
                editingMode: NONE
            });
        } else {
            this.setState({
                visibleForm: true,
                editingMode: CREATING
            });
            this.setState({
                post_id: "",
                title: "",
                published: this.getConfig().published.generator(),
                author: this.getConfig().author.value,
                price: "",
                tags: "",
                preview: "",
                content: ""});
        }
    },
    handleDeletion: function(ev) {
        var self = this;
        var checked = this.getStore(BlogStore).checked;
        checked.forEach(function(item) {
            self.props.context.executeAction(deletePost, {id: item});
        });
    },
    handleUpdate: function(ev) {
        var self = this;
        var checked = this.getStore(BlogStore).checked;
        if(this.state.visibleForm) {
            this.setState({
                visibleForm: false,
                editingMode: NONE
            });
        } else if(checked.length>0) {
            this.setState({
                visibleForm: true,
                editingMode: UPDATING
            });
            this.props.context.executeAction(showPost, {id: checked[0]});
            this.props.context.executeAction(uncheckPost, {id: checked[0]});
        }
    },
    onChange: function () {
        var post = this.getStore(BlogStore).getPost();
        if(post&&post.data) {
            if(this.state.visibleForm && this.state.editingMode === UPDATING) {
                this.setState({
                    post_id: post.data.id,
                    title: post.data.title,
                    published: post.data.published,
                    author: post.data.author,
                    price: post.data.price,
                    tags: post.data.tags.join(', '),
                    preview: post.data.preview,
                    content: post.data.content});
            }
        }
    },
    render: function() {
        var config = this.getConfig();
        var authorField = '';
        var publishedField = '';
        if(!config.author.hidden) {
            authorField = <input type="text" placeholder="作者" value={this.state.author} onChange={this.handleAuthor}/>;
        }
        if(!config.published.hidden) {
            publishedField = <input type="text" placeholder="日期" value={this.state.published} onChange={this.handlePublished}/>;
        }
        return <div className="console">
            <div className="buttons">
                <button className="pure-button" onClick={this.handleCreation}>建立</button>
                <button className="pure-button" onClick={this.handleUpdate}>修改</button>
                <button className="pure-button" onClick={this.handleDeletion}>刪除</button></div>
            <div className="clr" />
            <div className={this.state.visibleForm ? "form" : "form hidden"}>
                <form ref="form" className="pure-form">
                    <fieldset>
                        <legend>{this.state.editingMode === CREATING ? "建立" : "修改"}</legend>
                        <div>
                            <input type="text" className="pure-u-1" placeholder="標題" value={this.state.title} onChange={this.handleTitle}/>
                        </div>
                        <div>
                            {publishedField}
                            {authorField}
                            <input type="text" placeholder="價格" value={this.state.price} onChange={this.handlePrice}/>
                            <input type="text" placeholder="標籤" value={this.state.tags} onChange={this.handleTags}/>
                        </div>
                        <div>
                            <input type="text" className="pure-u-1" placeholder="簡介" value={this.state.preview} onChange={this.handlePreview}/>
                            <textarea className="pure-input-1" placeholder="內容" value={this.state.content} onChange={this.handleContent}></textarea>
                        </div>
                    </fieldset>
                </form>
                <div className="lowerPanel">
                    <div className="pure-button pure-button-primary" onClick={this.handleSubmit}>
                        <span>確定</span>
                    </div>
                    <div className="pure-button pure-button-primary">
                        <span>上傳圖片</span>
                        <input type="file" onClick={this.handleUpload}></input>
                    </div>
                </div>
            </div>
        </div>;
    }
});

module.exports = Console;

