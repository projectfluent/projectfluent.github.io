// vim: ts=4 et sts=4 sw=4

import React, {Fragment} from 'react';

export function TextInput(props) {
    const { name, onChange } = props;
    return (
        <Fragment>
            <dt>${name}</dt>
            <dd dir="auto">
                <input
                    type="text"
                    {...props}
                    onChange={evt => onChange(
                        evt.target.name,
                        evt.target.value
                    )}
                />
            </dd>
        </Fragment>
    );
}

export function RadioInput(props) {
    const { name, value, options, onChange } = props;
    return (
        <Fragment>
            <dt>${name}</dt>
            <dd className="radio">
                {options.map(option => {
                    const id = `${name}_${option.replace(/[^a-z]/gi, "_")}`;
                    return (<Fragment key={id}>
                        <input
                            id={id}
                            type="radio"
                            name={name}
                            value={option}
                            checked={value === option}
                            onChange={evt => onChange(
                                evt.target.name,
                                evt.target.value
                            )}
                        />
                        <label htmlFor={id}>
                            {option}
                        </label>
                    </Fragment>)
                })}
            </dd>
        </Fragment>
    );
}

let range_counter = 0;

export function RangeInput(props) {
    const { name, value, onChange } = props;
    const id = `${name}-${++range_counter}`;
    return (
        <Fragment>
            <dt>${name}</dt>
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
                <label htmlFor={id}>{value}</label>
            </dd>
        </Fragment>
    );
}
