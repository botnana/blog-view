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
var createPost = require('../../actions/createPost');

var Console = React.createClass({
    getInitialState: function() {
        return {
            hiddenForm: true
        };
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
    handleUpdate: function(ev) {
    },
    handleDeletion: function(ev) {
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
                        <input type="text" ref="title" className="pure-u-1" placeholder="標題"/>
                    </div>
                    <div>
                        <input type="text" ref="author" placeholder="作者"/>
                        <input type="text" ref="tags" placeholder="標籤"/>
                    </div>
                    <div>
                        <textarea ref="marked" className="pure-input-1" placeholder="內容"></textarea>
                    </div>
                    <button type="submit" className="pure-button pure-button-primary" onClick={this.handleSubmit}>確定</button>
                </fieldset>
            </form>
        </div>;
    }
});

module.exports = Console;

