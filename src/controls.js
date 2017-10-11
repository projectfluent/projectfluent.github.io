// vim: ts=4 et sts=4 sw=4

import React from 'react';

export function TextInput(props) {
    const { name, onChange } = props;
    return [
        <dt>${name}</dt>,
        <dd>
            <input
                type="text"
                {...props}
                onChange={evt => onChange(
                    evt.target.name,
                    evt.target.value
                )}
            />
        </dd>
    ];
}

export function RadioInput(props) {
    const { name, value, options, onChange } = props;
    return [
        <dt>${name}</dt>,
        <dd className="radio">
            {options.map(option => [
                <input
                    type="radio"
                    name={name}
                    value={option}
                    checked={value === option}
                    onChange={evt => onChange(
                        evt.target.name,
                        evt.target.value
                    )}
                />,
                <label>
                    {option}
                </label>
            ])}
        </dd>
    ];
}

let range_counter = 0;

export function RangeInput(props) {
    const { name, value, onChange } = props;
    const id = `${name}-${++range_counter}`;
    return [
        <dt>${name}</dt>,
        <dd>
            <input
                id={id}
                type="range"
                min="0"
                max="9"
                step="1"
                {...props}
                onChange={evt => onChange(
                    evt.target.name,
                    parseInt(evt.target.value, 10)
                )}
            />
            <label for={id}>{value}</label>
        </dd>
    ];
}
