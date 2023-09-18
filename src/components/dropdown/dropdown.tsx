import React from "react"
import { useState } from "react"

import "./dropdown.css";


export function Dropdown(props: any): React.ReactElement {

    return <div className="">
        <div className="hex-select hex-select-js">
            <select name="example" id="example-custom" onChange={(e) => props.onClick(e.target.value)}>
                <option value="">Custom select....</option>
                {
                    props.options?.map((option: string) => {
                        return <option
                            key={option}
                            value={option}
                        >
                            {option}
                        </option>
                    })
                }
            </select>
        </div>
    </div>
}