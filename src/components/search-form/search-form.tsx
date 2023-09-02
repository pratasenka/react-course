import React from "react"
import { useState } from "react"

import Input from "../input/input"
import Button from "../button/button"
import "./search-form.css"


export default function SearchForm(props: any): React.ReactElement {
    const [searchText, setSearchText] = useState('');

    const onSubmit = () => {
        props.search(searchText)
    }

    return <div className="searchForm">
        <Input
            className='searchFormInput'
            placeholder='What do you want to watch?'
            searchText={searchText}
            setSearchText={setSearchText}
            onEnter={onSubmit}
        ></Input>
        <Button
            className='searchFormButton'
            buttonText='SEARCH'
            onClick={onSubmit}
        ></Button>
    </div>
}