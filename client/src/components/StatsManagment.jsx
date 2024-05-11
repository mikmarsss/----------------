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
                    <p>Количество пройденных модулей/уроков</p>
                    <MyDiagram tag={'done'} />
                </div>
                <div className={styles.diagram}>
                    <p>Количество человек купивших курс</p>
                    <MyDiagram tag={'sold'} />
                </div>
                <div >

                </div>
                {/* <div className={styles.minMax}>
                    <div className={styles.modules}>
                        <div>
                            <p>Модуль, который прошли больше всего людей</p>
                        </div>
                        <div>
                            <p>Модуль, который прошли больше всего людей</p>
                        </div>
                    </div>
                    <div className={styles.lessons}>
                        <div>
                            <p>Урок, который прошли больше всего людей</p>
                        </div>
                        <div>
                            <p>Урок, который прошли больше всего людей</p>
                        </div>
                    </div>
                </div> */}
            </div>
        </>
    )
}

export default observer(StatsManagment)