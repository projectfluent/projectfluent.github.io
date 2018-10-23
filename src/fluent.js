// vim: ts=4 et sts=4 sw=4

import 'intl-pluralrules';
import { FluentBundle } from 'fluent/compat';
import { FluentParser, lineOffset, columnOffset, Resource }
    from 'fluent-syntax/compat';

const fluent_parser = new FluentParser();

export function annotation_display(source, junk, annot) {
    const { code, message, span: { start } } = annot;

    const slice = source.substring(junk.span.start, junk.span.end);
    const line_offset = lineOffset(source, start);
    const column_offset = columnOffset(source, start);
    const span_offset = lineOffset(source, junk.span.start);
    const head_len = line_offset - span_offset + 1;
    const lines = slice.split('\n');
    const head = lines.slice(0, head_len).join('\n') + '\n';
    const tail = lines.slice(head_len).join('\n');

    return {
        code,
        message,
        line_offset,
        column_offset,
        head,
        tail
    }
}

export function parse_translations(translations) {
    try {
        var res = fluent_parser.parse(translations);
    }  catch (err) {
        console.error(err);
        return [
          new Resource([]),
          []
        ];
    }

    const junks = res.body.filter(entry => entry.type === "Junk");
    const annotations = junks.reduce(
        (annots, junk) => annots.concat(
            junk.annotations.map(
                annot => annotation_display(translations, junk, annot)
            )
        ),
        []
    );
    return [res, annotations];
}

export function create_bundle(translations) {
    const bundle = new FluentBundle('en-US');
    bundle.addMessages(translations);
    return bundle;
}

export function format_messages(ast, bundle, externals) {
    const outputs = new Map(); 
    const errors = [];
    for (let entry of ast.body) {
        if (entry.type !== 'Message') {
            continue;
        }
        const id = entry.id.name;
        const message = bundle.getMessage(id);
        outputs.set(id, bundle.format(message, externals, errors));
    }
    return [outputs, errors];
}

export function parse_externals(externals) {
    try {
        return [JSON.parse(externals), []];
    } catch (err) {
        return [{}, [err]];
    }
}
