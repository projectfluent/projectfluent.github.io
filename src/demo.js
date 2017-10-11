// vim: ts=4 et sts=4 sw=4

import React from "react";
import Example from "./example";
import { TextInput, RangeInput } from "./controls";

const translations = `hello-user = Hello, { $user }!

unread-emails =
    You have { $emails_count ->
        [0] no unread emails
        [one] one unread email
       *[other] { $emails_count } unread emails
    }.`;

const externals = {
    user: "Anne",
    emails_count: 3
}

export default function Demo() {
    return (
        <Example translations={translations} externals={externals}>
            <TextInput name="user" />
            <RangeInput name="emails_count" min="0" max="9" step="1" />
        </Example>
    );
}
