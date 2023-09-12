import React from "react"


export function Button(props: any): React.ReactElement {
    return <button
        className={props.className}
        onClick={props.onClick}
    >
        {props.buttonText}
    </button>
}