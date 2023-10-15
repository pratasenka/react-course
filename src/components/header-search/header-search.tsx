import React from "react"
import { useState } from "react"

import "./header-search.css";
import { Button } from "../button/button";
import { SearchForm } from "../search-form/search-form";
import { useNavigate } from "react-router-dom";


export function HeaderSearch(props: any): React.ReactElement {
    let navigate = useNavigate();

    return <>
        <div className="header-search-background-image">
            <div className="content header-search-background-blur">
                <div className="header-search-company-name">
                    <span><span className="header-search-company-name-bold">netflix</span>roulette</span>
                    <Button className="header-search-add-movie-button" onClick={() => navigate('/new')}>+ Add Movie</Button>
                </div>

                <div className="header-search-search">
                    <SearchForm
                        searchText={props.searchText}
                        searchCallback={props.searchCallback}
                    />
                </div>
            </div>
        </div>
    </>
}