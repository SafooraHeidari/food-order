import { Fragment } from "react"
import ReactDOM from "react-dom"
import classes from "./Modal.module.css"

const Backdrop = (props) => {
    return(
        <div className={classes.backdrop} onClick={props.onCloseCart}></div>
    )
}

const ModalOverlay = (props) => {
    return(
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    )
}

export default function Modal(props){
    return(
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onCloseCart={props.onClick}/>, document.getElementById("overlays"))}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, document.getElementById("overlays"))}
        </Fragment>
    )
}