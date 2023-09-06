import React from "react"
import './input.css'


export function Input(props: any): React.ReactElement {
    const _handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            props.onEnter();
        }
    }
    return <input
        className={props.className}
        placeholder={props.placeholder}
        value={props.searchText ? props.searchText : ''}
        onChange={(e) => props.setSearchText(e.target.value)}
        onKeyDown={(e) => _handleKeyDown(e)}
    />
}