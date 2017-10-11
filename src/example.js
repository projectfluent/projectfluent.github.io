// vim: ts=4 et sts=4 sw=4

import React, { Children, Component, cloneElement } from 'react';
import Editor from './editor';

import {
    annotation_display, parse_translations, create_context, format_messages
} from './fluent';

function Message(props) {
    const { id, value } = props;
    return [
        <dt>{id}</dt>,
        <dd>{value}</dd>,
    ];
}

function indent(spaces) {
    return new Array(spaces + 1).join(' ');
}

function Annotation(props) {
    const {
        annotation: { message, line_offset, column_offset, head, tail }
    } = props;

    return [
        <dt className="annotation__name">Error on line {line_offset + 1}</dt>,
        <dd className="annotation__body">
            <pre className="annotation__slice">{head}</pre>
            <pre className="annotation__label">
                {indent(column_offset)}⮤ {message}
            </pre>
            <pre className="annotation__slice">{tail}</pre>
        </dd>,
    ];
}

function update(translations, externals) {
    const [res, annotations] = parse_translations(translations);
    const ctx = create_context(translations);
    const [out, out_errors] = format_messages(ctx, externals);

    return {
        res, annotations, out, out_errors
    };
}

export default class Example extends Component {
    constructor(props) {
        super(props);

        const { translations, externals } = props;

        this.state = {
            translations,
            externals,
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
        const { chevron = "down", children } = this.props;
        const { translations, externals, res, annotations, out } = this.state;

        const editor_annotations = annotations.map(annot => ({
            type: 'error',
            text: `${annot.code}: ${annot.message}`,
            row: annot.line_offset,
            column: annot.column_offset,
        }));

        const externals_controls = Children.map(
            children, control => cloneElement(control, {
                value: externals[control.props.name],
                onChange: this.handleExternalsChange.bind(this)
            })
        );

        const messages = res.body.filter(entry => entry.type === "Message");
        const junk = res.body.filter(entry => entry.type === "Junk");

        return [
            <Editor
                className="editor"
                mode="fluent"
                value={translations}
                annotations={editor_annotations}
                onChange={val => this.handleTranslationsChange(val)}
            />,

            <dl className="variables">
                {externals_controls}
            </dl>,

            <div className="spacer">
                <span className={`fa fa-angle-${chevron}`}></span>
            </div>,

            <div className="results">
                <dl className="output">
                    {messages.map(entry => {
                        const { id: { name: id } } = entry;
                        const value = out.get(id);
                        return <Message key={id} id={id} value={value} />;
                    })}
                </dl>

                {junk.length > 0 &&
                    <dl className="annotations">
                        {junk.map(entry => {
                            const error = entry.annotations[0];
                            const annot = annotation_display(translations, entry, error);
                            const key = Date.now() + Math.random();
                            return <Annotation key={key} annotation={annot} />;
                        })}
                    </dl>
                }
            </div>
        ];
    }
}
