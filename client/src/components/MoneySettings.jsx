import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import styles from '../styles/statsManagment.module.css'
import { Context } from "..";

function MoneySettings() {
    const { store, courseStore } = useContext(Context)
    const [sale, setSale] = useState(false)
    const saleHandler = () => {
        setSale(!sale)
    }
    return (
        <>
            <div className={styles.container}>
                <p className={styles.zagolovok}>Цены и скидки</p>
                <div className={styles.price}>
                    <div className={styles.currentPrice}>
                        <div>
                            <p>
                                Старая цена:
                            </p>
                            <input
                                type="text"
                                className={styles.logininput}
                                placeholder={courseStore.course.price}
                                value={courseStore.course.price}
                            />

                        </div>
                    </div>
                    <div className={styles.sale}>
                        <input
                            type="checkbox"
                            checked={sale}
                            onChange={saleHandler}
                        />
                        <p>Сделать скидку</p>
                    </div>
                    <div className={styles.currentPrice}>
                        <div>
                            <p>
                                Новая цена:
                            </p>
                            <input
                                type="text"
                                className={styles.logininput}
                                placeholder={courseStore.course.new_price}
                                value={courseStore.course.new_price}
                            />
                        </div>
                    </div>
                </div>
                <button>Сохранить</button>
            </div>
        </>
    )
}

export default observer(MoneySettings)