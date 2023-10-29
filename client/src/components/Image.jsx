import React from "react";

export default function Image(props) {
    return (
        <>
            <img src={props.image} alt={props.alt} />
        </>
    )
}