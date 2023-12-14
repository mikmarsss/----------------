import styles from "./style.module.css"
import React from "react"



function Email(activateLink) {
    return (
        <>
            <div className={styles.container}>
                <a href={activateLink}>{activateLink}</a>
            </div>
        </>
    )
}

export default Email