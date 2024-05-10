import { observer } from "mobx-react-lite";
import React from "react";
import styles from '../styles/statsManagment.module.css'
import MyDiagram from "./Diagramma";
function StatsManagment() {
    return (
        <>
            <div className={styles.container}>
                <p className={styles.zagolovok}>Статистика обучения</p>
                <div className={styles.diagram}>
                    <MyDiagram />
                </div>
            </div>
        </>
    )
}

export default observer(StatsManagment)