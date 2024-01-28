import React from "react";
import styles from "../styles/image.module.css"


export default function Image(props) {
    return (
        <>
            <img src={props.image} alt={props.alt} />
        </>
    )
}