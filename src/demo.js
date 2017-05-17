import React, { Component } from 'react';
import Editor from './editor';

import {
    annotation_display, parse_translations, create_context, format_messages
} from './fluent';

const translations = `// Try editing the translations here!

hello-world = Hello, world!

shared-photos =
    { $user_name } { $photo_count ->
        [0] hasn't added any photos yet
        [one] added a new photo
       *[other] added { $photo_count } new photos
    }.

liked-comment =
    { $user_name } liked your comment on { $user_gender ->
        [male] his
        [female] her
       *[other] their
    } post.
`;

function Message(props) {
    const { id, value } = props;
    return (
        <div className="output__item message">
            <div className="output__key">
                <code className="message__id">{id}</code>
            </div>
            <div className="output__value">{value}</div>
        </div>
    );
}

function indent(spaces) {
    return new Array(spaces + 1).join(' ');
}

function Annotation(props) {
    const {
        annotation: { message, line_offset, column_offset, head, tail }
    } = props;

    return (
        <div className="output__item annotation">
            <div className="output__key">
                <code className="annotation__name">Error on line {line_offset + 1}</code>
            </div>
            <div className="output__value">
                <pre className="annotation__slice">{head}</pre>
                <pre className="annotation__label">
                    {indent(column_offset)}⮤ {message}
                </pre>
                <pre className="annotation__slice">{tail}</pre>
            </div>
        </div>
    );
}

function update(translations, externals) {
    const [res, annotations] = parse_translations(translations);
    const ctx = create_context(translations);
    const [out, out_errors] = format_messages(ctx, externals);

    return {
        res, annotations, out, out_errors
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
        this.setState({
            translations,
            ...update(translations, this.state.externals)
        });
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
        const { translations, externals, res, annotations, out } = this.state;
        const editor_annotations = annotations.map(annot => ({
            type: 'error',
            text: `${annot.code}: ${annot.message}`,
            row: annot.line_offset,
            column: annot.column_offset,
        }));

        return (
            <div className="demo">
                <div className="output">
                    {res.body.map(entry => {
                        switch (entry.type) {
                            case 'Message': {
                                const { id: { name: id } } = entry;
                                const value = out.get(id);
                                return <Message key={id} id={id} value={value} />;
                            }
                            case 'Junk': {
                                const error = entry.annotations[0];
                                const annot = annotation_display(translations, entry, error);
                                const key = Date.now() + Math.random();
                                return <Annotation key={key} annotation={annot} />;
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

                <Editor
                    className="editor"
                    mode="fluent"
                    value={translations}
                    annotations={editor_annotations}
                    onChange={val => this.handleTranslationsChange(val)}
                />
            </div>
        );
    }
}
