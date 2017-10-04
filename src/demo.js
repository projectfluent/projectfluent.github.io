import React, { Component } from 'react';
import Editor from './editor';

import {
    annotation_display, parse_translations, create_context, format_messages
} from './fluent';

const translations = `
hello-user = Hello, { $user }!

unread-emails = You have { $emails-count ->
    [0] no unread emails.
    [one] one unread email
   *[other] { $emails-count } unread emails.
  }
`;

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
      <dt>Error on line {line_offset + 1}</dt>,
      <dd>
        <pre className="annotation__slice">{head}</pre>
        <pre className="annotation__label">
        {indent(column_offset)} {message}
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

export default class Demo extends Component {
    constructor() {
        super();
        const externals = {
            user: "Anne",
            "emails-count": 3,
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

      return [
        <Editor
          className="editor"
          mode="fluent"
          value={translations}
          annotations={editor_annotations}
          onChange={val => this.handleTranslationsChange(val)}
        />,
        <dl className="variables">
          <dt>$user</dt>
          <dd>
            <input
                type="text"
                name="user"
                value={externals.user}
                onChange={evt => this.handleExternalsChange(evt.target.name, evt.target.value)}
/>
          </dd>
          <dt>$emails-count</dt>
          <dd>
            <input
                id="emails-count"
                type="range"
                name="emails-count"
                value={externals["emails-count"]}
                min="0"
                max="9"
                step="1"
                onChange={evt => this.handleExternalsChange(evt.target.name, parseInt(evt.target.value, 10))}
/>
           <label for="emails-count">{externals["emails-count"]}</label>
          </dd>
        </dl>,
        <div className="spacer">
          <span className="fa fa-angle-down"></span>
        </div>,
        <dl className="result">
          {res.body.map(entry => {
              switch (entry.type) {
                  case 'Message': {
                      const { id: { name: id } } = entry;
                      const value = out.get(id);
                      return <Message key={id} id={id} value={value} />;
                  }
                  case 'Junk':
                  case 'Comment':
                  case 'Section':
                  default:
                      return null;
              }
          })}
        </dl>,
        <dl className="annotations">
          {res.body.map(entry => {
              switch (entry.type) {
                  case 'Junk': {
                      const error = entry.annotations[0];
                      const annot = annotation_display(translations, entry, error);
                      const key = Date.now() + Math.random();
                      return <Annotation key={key} annotation={annot} />;
                  }
                  case 'Message':
                  case 'Comment':
                  case 'Section':
                  default:
                      return null;
              }
          })}
        </dl>,
      ];
    }
}
