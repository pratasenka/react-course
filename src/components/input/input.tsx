import React from "react";


export function Input(props: any): React.ReactElement {
    const _handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            props.onEnter();
        }
    }
    return <input
        id={props.id}
        aria-label={props.ariaLabel}
        className={props.className}
        placeholder={props.placeholder}
        value={props.searchText ? props.searchText : ''}
        onChange={(e) => props.setSearchText(e.target.value)}
        onKeyDown={(e) => _handleKeyDown(e)}
    />
}