import React, { useState } from "react"
import "./select-genre.css"


export function SelectGenre(props: any): React.ReactElement {
    const [active, setActive] = useState(props.activeGenres);

    const updateActive = (newActive: string) => {
        setActive([newActive]);
        props.setActiveGenres([newActive]);
    }

    return <div className="selectGenre">
        {props.genres?.map((genre: string) => {
            return <a
                key={genre}
                id={genre}
                className={active.includes(genre) ? 'active' : ''}
                onClick={() => updateActive(genre)}
            >
                {genre}
            </a>
        })}
        <span></span>
    </div>
}