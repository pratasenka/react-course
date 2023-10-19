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
            className={`${props.inputClassName} ${props.inputSettings.error[props.inputSettings.field] ? 'labeled-input-error' : ''}`}
            aria-label={props.ariaLabel}
            placeholder={props.placeholder}
            {...props.inputSettings.register(props.inputSettings.field, props.inputSettings.options)}
        />
    </div>
}