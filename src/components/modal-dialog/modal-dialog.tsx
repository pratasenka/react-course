import React from "react"

import "./modal-dialog.css";


export function ModalDialog(props: any): React.ReactElement {
    return <>
        <div className="dark-background centered">
            <div className="modal-dialog">
                <div className="modal-dialog-close">
                    <button className="modal-dialog-close-button">x</button>
                </div>
                <div className="modal-dialog-content">

                    <div className="modal-dialog-title">{props.title}</div>
                    <div className="modal-dialog-children">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    </>
}