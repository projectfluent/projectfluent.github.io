// vim: ts=4 et sts=4 sw=4

import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';

import Example from './example';
import { TextInput, RadioInput, RangeInput } from "./controls";

const example0 = {
    translations: `\
# Simple things are simple.
hello-user = Hello, {$userName}!

# Complex things are possible.
shared-photos =
    {$userName} {$photoCount ->
        [one] added a new photo
       *[other] added {$photoCount} new photos
    } to {$userGender ->
        [male] his stream
        [female] her stream
       *[other] their stream
    }.`,
    externals: {
        userName: "Anne",
        userGender: "female",
        photoCount: 3,
    }
};

function Example0() {
    return (
        <Example {...example0}>
            <TextInput name="userName" />
            <RadioInput name="userGender" options={["male", "female", "unspecified"]} />
            <RangeInput name="photoCount" min="1" max="9" step="1" />
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

ReactDOM.render(
    <Example {...example1}>
        <TextInput name="user_name" />
        <RangeInput name="photo_count" min="0" max="9" step="1" />
    </Example>,
    document.getElementById('example1-app')
);

ReactDOM.render(
    <Example {...example2}>
        <TextInput name="user_name" />
        <RadioInput name="user_gender" options={["male", "female", "unspecified"]} />
    </Example>,
    document.getElementById('example2-app')
);
