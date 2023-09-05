import React from "react"
import "./select-genre.css"


export function SelectGenre(props: any): React.ReactElement {
    return <div className="selectGenre">
        {props.genres?.map((genre: string) => {
            return <a
                key={genre}
                className={props.activeGenres.includes(genre) ? 'active' : ''}
                onClick={() => props.setActiveGenres([genre])}
            >
                {genre}
            </a>
        })}
        <span></span>
    </div>
}