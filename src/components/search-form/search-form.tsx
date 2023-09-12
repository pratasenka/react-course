import React from "react"
import { useState } from "react"

import { Input } from "../input/input"
import { Button } from "../button/button"
import "./search-form.css"


export function SearchForm(props: any): React.ReactElement {
    const [searchText, setSearchText] = useState(props.searchText);

    const onSubmit = () => {
        props.search(searchText)
    }

    return <div className="searchForm">
        <Input
            id='searchFormInput'
            ariaLabel="searchFormInput"
            className='searchFormInput'
            placeholder='What do you want to watch?'
            searchText={searchText}
            setSearchText={setSearchText}
            onEnter={onSubmit}
        />
        <Button
            className='searchFormButton'
            buttonText='SEARCH'
            onClick={onSubmit}
        />
    </div>
}