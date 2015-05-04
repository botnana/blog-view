/**
 * Copyright 2015, Mapacode Inc.
 * Copyrights licensed under the ISC License. See the accompanying LICENSE file for terms.
 */
'use strict';
/**
 * Copyright 2015, Mapacode Inc.
 * Copyrights licensed under the ISC License. See the accompanying LICENSE file for terms.
 */
'use strict';

var React = require('react');
var FluxibleMixin = require('fluxible').Mixin;
var BlogStore = require('../../stores/BlogStore');
var createPost = require('../../actions/createPost');
var deletePost = require('../../actions/deletePost');
var showPost = require('../../actions/showPost');
var uncheckPost = require('../../actions/uncheckPost');

var Console = React.createClass({
    mixins: [FluxibleMixin],
    statics: {
        storeListeners: [BlogStore]
    },
    getInitialState: function() {
        return {
            hiddenForm: true,
            title: "",
            author: "",
            tags: "",
            marked: ""
        };
    },
    handleTitle: function(ev) {
        this.setState({title: ev.target.value});
    },
    handleAuthor: function(ev) {
        this.setState({author: ev.target.value});
    },
    handleTags: function(ev) {
        this.setState({tags: ev.target.value});
    },
    handleMarked: function(ev) {
        this.setState({marked: ev.target.value});
    },
    handleSubmit: function(ev) {
        ev.preventDefault();
        var post = {
            title: this.refs.title.getDOMNode().value,
            author: this.refs.author.getDOMNode().value,
            tags: this.refs.tags.getDOMNode().value.split(',').map(function(item) { return item.trim(); }),
            marked: this.refs.marked.getDOMNode().value
        }
        this.props.context.executeAction(createPost, post);
        this.refs.title.getDOMNode().value = '';
        this.refs.author.getDOMNode().value = '';
        this.refs.tags.getDOMNode().value = '';
        this.refs.marked.getDOMNode().value = '';
    },
    handleCreation: function(ev) {
        this.setState({hiddenForm: this.state.hiddenForm ? false : true});
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
        if(checked.length>0 && this.state.hiddenForm) {
            this.setState({hiddenForm: this.state.hiddenForm ? false : true});
            this.props.context.executeAction(showPost, {id: checked[0]});
            this.props.context.executeAction(uncheckPost, {id: checked[0]});
        } else if(!this.state.hiddenForm) {
            this.setState({hiddenForm: this.state.hiddenForm ? false : true});
        }
    },
    onChange: function () {
        console.log('Console onChange');
        var post = this.getStore(BlogStore).getPost();
        console.log(post);
        if(!this.state.hiddenForm) {
            this.setState({title: post.post.data.title, author: post.post.data.author, tags: post.post.data.tags});
            console.log(post);
            console.log(this.state);
        }
    },
    render: function() {
        return <div className="console">
            <div className="buttons">
                <button className="pure-button" onClick={this.handleCreation}>建立</button>
                <button className="pure-button" onClick={this.handleUpdate}>修改</button>
                <button className="pure-button" onClick={this.handleDeletion}>刪除</button></div>
            <div className="clr" />
            <form ref="form" className={this.state.hiddenForm ? "pure-form hidden" : "pure-form"}>
                <fieldset>
                    <legend>建立新文章</legend>
                    <div>
                        <input type="text" ref="title" className="pure-u-1" placeholder="標題" value={this.state.title} onChange={this.handleTitle}/>
                    </div>
                    <div>
                        <input type="text" ref="author" placeholder="作者" value={this.state.author} onChange={this.handleAuthor}/>
                        <input type="text" ref="tags" placeholder="標籤" value={this.state.tags} onChange={this.handleTags}/>
                    </div>
                    <div>
                        <textarea ref="marked" className="pure-input-1" placeholder="內容" value={this.state.marked} onChange={this.handleMarked}></textarea>
                    </div>
                    <button type="submit" className="pure-button pure-button-primary" onClick={this.handleSubmit}>確定</button>
                </fieldset>
            </form>
        </div>;
    }
});

module.exports = Console;

