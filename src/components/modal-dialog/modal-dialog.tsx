import React from "react";
import { useNavigate } from "react-router-dom";

import "./modal-dialog.css";
import { Portal } from "../portal/portal";



export function ModalDialog(props: any): React.ReactElement {
    let navigate = useNavigate();

    return <>
        <Portal>
            <div className="dark-background">
                <div className="modal-dialog">
                    <div className="modal-dialog-close">
                        <button
                            className="modal-dialog-close-button"
                            onClick={() => navigate(-1)}
                        >x</button>
                    </div>
                    <div className="modal-dialog-content">

                        <div className="modal-dialog-title">{props.title}</div>
                        <div className="modal-dialog-children">
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
        </Portal>
    </>
}