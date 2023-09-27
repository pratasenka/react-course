import React from "react"

import { Portal as ReactPortal } from 'react-portal';


export function Portal(props: any): React.ReactElement {
    return <ReactPortal>
        {props.children}
    </ReactPortal>
}