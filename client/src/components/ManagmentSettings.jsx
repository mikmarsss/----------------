
import { observer } from "mobx-react-lite";
import React from "react";
import styles from '../styles/settingsManagment.module.css'
import box from '../Images/boxforcheck.svg'

function ManagmentSettings() {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.settings}>
                    <div className={styles.publish}>
                        <p className={styles.zagolovok}>Чек-лист</p>
                        <div className={styles.checkList}>
                            <div>
                                <img src={box} alt="" />
                                <p>Карточка курса заполнена корректно</p>
                            </div>
                            <div>
                                <img src={box} alt="" />
                                <p>Курс содержит не менее 3 модулей и 9 уроков</p>
                            </div>
                            <div>
                                <img src={box} alt="" />
                                <p>Нет пустых модулей</p>
                            </div>
                            <div>
                                <img src={box} alt="" />
                                <p>Название модулей и уроков заполнены корректно</p>
                            </div>
                        </div>
                        <div className={styles.publicButton}>
                            <button>Опубликовать</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default observer(ManagmentSettings)