
import { observer } from "mobx-react-lite";
import React from "react";
import styles from '../styles/settingsManagment.module.css'


function ManagmentSettings() {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.settings}>
                    <div className={styles.publish}>
                        <p className={styles.zagolovok}>Чек-лист</p>
                        <div className={styles.checkList}>
                            <div>
                                <div className={styles.circle}></div>
                                <p>Карточка курса заполнена корректно</p>
                            </div>
                            <div>
                                <div className={styles.circle}></div>
                                <p>Курс содержит не менее 3 модулей и 9 уроков</p>
                            </div>
                            <div>
                                <div className={styles.circle}></div>
                                <p>Нет пустых модулей</p>
                            </div>
                            <div>
                                <div className={styles.circle}></div>
                                <p>Название модулей и уроков должны быть заполнены корректно</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default observer(ManagmentSettings)