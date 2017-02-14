/* global Fluent */

import React, { Component } from 'react';
import Editor from './editor';

const translations = `# Try editing the translations here!

hello-world = Hello, world!

shared-photos = { $user_name } { $photo_count ->
    [0] hasn't added any photos yet
    [one] added a new photo
   *[other] added { $photo_count } new photos
}.

liked-comment = { $user_name } liked your comment on { $user_gender ->
    [male] his
    [female] her
   *[other] their
} post.
`;

function Message(props) {
    const { id, value } = props;
    return (
        <div className="message">
            <div className="message__id">
                <code>{id}</code>
            </div>
            <div className="message__value">{value}</div>
        </div>
    );
}

function Junk(props) {
    const { value } = props;
    return (
        <div className="junk">
            <div className="junk__id">
                <code>SyntaxError</code>
            </div>
            <div className="junk__value">
                <code>{value}</code>
            </div>
        </div>
    );
}

function update(translations, externals) {
    const [ast, ast_errors] = Fluent.syntax.parser.parse(translations);

    const ctx = new Fluent.MessageContext('en-US');
    ctx.addMessages(translations);

    const out = new Map(); 
    const out_errors = [];
    for (const [id, message] of ctx.messages) {
        out.set(id, ctx.format(message, externals, out_errors)); 
    }

    return {
        ast, ast_errors, out, out_errors
    };
}

export default class Demo extends Component {
    constructor() {
        super();
        const externals = {
            user_name: "Anne",
            user_gender: "female",
            photo_count: 3,
        };

        this.state = {
            externals,
            translations,
            ...update(translations, externals)
        }
    }

    handleTranslationsChange(translations) {
        this.setState(
            update(translations, this.state.externals)
        );
    }

    handleExternalsChange(name, value) {
        const externals = {
            ...this.state.externals,
            [name]: value
        };

        this.setState({
            externals,
            ...update(this.state.translations, externals)
        });
    }

    render() {
        const { translations, externals, ast, ast_errors, out } = this.state;
        const annotations = ast_errors.map(err => ({
            type: 'error',
            text: err.message,
            row: err.lineNumber - 1,
            column: err.columnNumber
        }));

        return (
            <div className="demo">
                <Editor
                    className="editor"
                    mode="fluent"
                    value={translations}
                    annotations={annotations}
                    onChange={val => this.handleTranslationsChange(val)}
                />
                <div className="output">
                    {ast.body.map(entry => {
                        switch (entry.type) {
                            case 'Message': {
                                const { id: { name: id } } = entry;
                                const value = out.get(id);
                                return <Message key={id} id={id} value={value} />;
                            }
                            case 'JunkEntry': {
                                const { content } = entry;
                                return <Junk key={Date.now() + Math.random()} value={content} />;
                            }
                            case 'Comment':
                            case 'Section':
                            default:
                                return null;
                        }
                    })}
                </div>

                <div className="externals">
                    <div className="externals__control">
                        <div className="externals__name">
                            User name
                        </div>
                        <div className="externals__data">
                            <input
                                className="externals__input"
                                type="text"
                                name="user_name"
                                value={externals.user_name}
                                onChange={evt => this.handleExternalsChange(evt.target.name, evt.target.value)}
                            />
                        </div>
                    </div>

                    <div className="externals__control">
                        <div className="externals__name">
                            User gender
                        </div>
                        <div className="externals__data">
                            <label className="externals__label">
                                <input
                                    className="externals__input"
                                    type="radio"
                                    name="user_gender"
                                    value="male"
                                    checked={externals.user_gender === 'male'}
                                    onChange={evt => this.handleExternalsChange(evt.target.name, evt.target.value)}
                                /> male
                            </label>
                            <label className="externals__label">
                                <input
                                    className="externals__input"
                                    type="radio"
                                    name="user_gender"
                                    value="female"
                                    checked={externals.user_gender === 'female'}
                                    onChange={evt => this.handleExternalsChange(evt.target.name, evt.target.value)}
                                /> female
                            </label>
                            <label className="externals__label">
                                <input
                                    className="externals__input"
                                    type="radio"
                                    name="user_gender"
                                    value="na"
                                    checked={externals.user_gender === 'na'}
                                    onChange={evt => this.handleExternalsChange(evt.target.name, evt.target.value)}
                                /> not specified
                            </label>
                        </div>
                    </div>

                    <div className="externals__control">
                        <div className="externals__name">
                            Photo count
                        </div>
                        <div className="externals__data">
                            <input
                                className="externals__input"
                                type="range"
                                name="photo_count"
                                value={externals.photo_count}
                                min="0"
                                max="9"
                                step="1"
                                onChange={evt => this.handleExternalsChange(evt.target.name, parseInt(evt.target.value, 10))}
                            />
                            <input
                                className="externals__input"
                                type="number"
                                name="photo_count"
                                value={externals.photo_count}
                                onChange={evt => this.handleExternalsChange(evt.target.name, parseInt(evt.target.value, 10))}
                            />
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
