import React from "react"
import { useState } from "react"

import "./movies-sorting.css";
import { Dropdown } from "../dropdown/dropdown";

export function MoviesSorting(props: any): React.ReactElement {
    const SORT_OPTIONS = ['Title', 'Release Date'];

    const onChangeSort = (option: string) => {
        if (option === 'Title') {
            props.setSortBy('title');
            return;
        }

        if (option === 'Release Date') {
            props.setSortBy('release_date');
            return;
        }

        props.setSortBy('');
    }

    return <>
        <div className="movies-sorting ">
            <span>SORTBY</span>
            <Dropdown
                options={SORT_OPTIONS}
                onClick={onChangeSort}
            />
        </div>
    </>
}