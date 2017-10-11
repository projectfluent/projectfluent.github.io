// vim: ts=4 et sts=4 sw=4

import React from 'react';
import Example from './example';
import { TextInput, RadioInput, RangeInput } from "./controls";

const example1 = {
    translations: `shared-photos =
    { $name } { $photo_count ->
        [0] hasn't added any photos yet
        [one] added a new photo
       *[other] added { $photo_count } new photos
    }.`,
    externals: {
        name: "Anne",
        photo_count: 3,
    }
};

const example2 = {
    translations: `liked-comment =
    { $name } liked your comment on { $gender ->
        [male] his
        [female] her
       *[other] their
    } post.`,
    externals: {
        name: "John",
        gender: "male",
    }
};

export default function Examples() {
    return [
        <Example {...example1} chevron="right">
            <TextInput name="name" />
            <RangeInput name="photo_count" min="0" max="9" step="1" />
        </Example>,
        <Example {...example2} chevron="right">
            <TextInput name="name" />
            <RadioInput name="gender" options={["male", "female", "unknown"]} />
        </Example>
    ];
}
