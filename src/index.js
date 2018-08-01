// vim: ts=4 et sts=4 sw=4

import React from 'react';
import ReactDOM from 'react-dom';

import Example from './example';
import { TextInput, RadioInput, RangeInput } from "./controls";

const example0 = {
    translations: `hello-user = Hello, { $user_name }!

unread-emails =
    You have { $emails_count ->
        [0] no unread emails
        [one] one unread email
       *[other] { $emails_count } unread emails
    }.`,
    externals: {
        user_name: "Anne",
        emails_count: 3,
    }
};

function Example0() {
    return (
        <Example {...example0}>
            <TextInput name="user_name" />
            <RangeInput name="emails_count" min="0" max="9" step="1" />
        </Example>
    );
}

ReactDOM.render(
   <Example0 />,
   document.getElementById('demo-app')
);

const example1 = {
    translations: `shared-photos =
    { $user_name } { $photo_count ->
        [0] hasn't added any photos yet
        [one] added a new photo
       *[other] added { $photo_count } new photos
    }.`,
    externals: {
        user_name: "Anne",
        photo_count: 3,
    }
};

const example2 = {
    translations: `liked-comment =
    { $user_name } liked your comment on { $user_gender ->
        [male] his
        [female] her
       *[other] their
    } post.`,
    externals: {
        user_name: "John",
        user_gender: "male",
    }
};

function Examples() {
    return [
        <Example {...example1}>
            <TextInput name="user_name" />
            <RangeInput name="photo_count" min="0" max="9" step="1" />
        </Example>,
        <Example {...example2}>
            <TextInput name="user_name" />
            <RadioInput name="user_gender" options={["male", "female", "unknown"]} />
        </Example>
    ];
}

ReactDOM.render(
   <Examples />,
   document.getElementById('examples-app')
);
