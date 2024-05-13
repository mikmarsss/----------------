import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import styles from '../styles/statsManagment.module.css'
import { Context } from "..";

function MoneySettings() {
    const { store, courseStore } = useContext(Context)
    return (
        <>
            <div className={styles.container}>
                <p className={styles.zagolovok}>Цены и скидки</p>
                <div className={styles.price}>
                    <div className={styles.currentPrice}>
                        <div>
                            <p>
                                Изменить цену:
                            </p>
                            <input
                                type="text"
                                className={styles.logininput}
                                placeholder={courseStore.course.price}
                                value={courseStore.course.price}
                            />
                            <div className={styles.sale}>
                                <input type="checkbox" />
                                <p>Сделать скидку</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default observer(MoneySettings)