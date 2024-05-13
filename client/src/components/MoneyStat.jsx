import { observer } from "mobx-react-lite";
import React from "react";
import styles from '../styles/statsManagment.module.css'
import MyDiagram from "./Diagramma";

function MoneyStat() {
    return (
        <>
            <div className={styles.container}>
                <p className={styles.zagolovok}>Статистика продаж за текущий год</p>
                <div className={styles.diagram}>
                    <p>Количество проданных копий курса</p>
                    <MyDiagram tag={'income'} />
                </div>
            </div>
        </>
    )
}

export default observer(MoneyStat)