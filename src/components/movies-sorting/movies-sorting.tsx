import React from "react"
import { useState } from "react"

import "./movies-sorting.css";
import { Dropdown } from "../dropdown/dropdown";

export function MoviesSorting(props: any): React.ReactElement {


    return <>
        <div className="movies-sorting ">
            <span>SORTBY</span>
            <Dropdown
                options={props.options}
                onClick={props.onClick}
            />
        </div>
    </>
}