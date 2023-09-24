import React from "react";

import "./labeled-input.css"


export function LabeledInput(props: any): React.ReactElement {
    return <div className="labeled-input">
        <label
            className={props.labelClassName}
            htmlFor={props.movieDetailsElementId}
        >
            {props.label}
        </label>
        <input
            id={props.movieDetailsElementId}
            className={props.inputClassName}
            aria-label={props.ariaLabel}
            placeholder={props.placeholder}
            value={props.value ? props.value : ''}
            onChange={(e) => props.onChange(e.target.value)}
        />
    </div>
}