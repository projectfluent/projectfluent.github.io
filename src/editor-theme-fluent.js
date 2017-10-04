/* global ace */

ace.define(
    "ace/theme/fluent",
    ["require", "exports", "module", "ace/lib/dom"],
    theme
);

function theme(acequire, exports, module) {
    exports.isDark = false;
    exports.cssClass = "ace-fluent";


    exports.cssText = `
        .ace-fluent .ace_cursor {
            color: var(--main-accent-lighter-color);
        }

        .ace_hidden-cursors .ace_cursor {
            color: transparent;
        }

        .ace-fluent .ace_gutter {
            width: 1rem;
        }

        .ace-fluent .ace_comment {
            color: var(--code-comment-color);
            font-style: italic;
        }

        .ace-fluent .ace_section {
            color: #666;
        }

        .ace-fluent .ace_message {
            color: var(--code-id-color);
        }

        .ace-fluent .ace_string {
            color: var(--code-string-color); 
        }

        .ace-fluent .ace_number {
            color: var(--code-keyword-color);
        }

        .ace-fluent .ace_symbol {
            color: var(--code-keyword-color);
        }

        .ace-fluent .ace_variable {
            color: var(--code-variable-color);
        }

        .ace-fluent .ace_function {
            color: var(--code-function-color);
        }

        .ace-fluent .ace_invalid {
            background-color: #ffe5e5;
            color: red;
        }

        .ace-fluent .ace_marker-layer .ace_selection {
            background: rgb(181, 213, 255);
        }

        .ace-fluent.ace_multiselect .ace_selection.ace_start {
            box-shadow: 0 0 3px 0px white;
        }

        .ace-fluent.ace_nobold .ace_line > span {
            font-weight: normal !important;
        }

        .ace-fluent .ace_marker-layer .ace_step {
            background: rgb(252, 255, 0);
        }

        .ace-fluent .ace_marker-layer .ace_stack {
            background: rgb(164, 229, 101);
        }

        .ace-fluent .ace_marker-layer .ace_bracket {
            margin: -1px 0 0 -1px;
            border: 1px solid rgb(192, 192, 192);
        }

        .ace-fluent .ace_marker-layer .ace_selected-word {
            background: rgb(250, 250, 255);
            border: 1px solid rgb(200, 200, 250);
        }

        .ace-fluent .ace_error {
            background: #ffa5a5 !important;
        }
    `;

    const dom = acequire("../lib/dom");
    dom.importCssString(exports.cssText, exports.cssClass);
}
