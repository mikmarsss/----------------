import React from "react";
import styles from '../styles/ButtonComponent.module.css'
import { observer } from "mobx-react-lite";

function Button({ text }) {
    return (
        <>
            <div className={styles.redbutton}>
                <button>{text}</button>
            </div>
        </>
    )
}

export default observer(Button)