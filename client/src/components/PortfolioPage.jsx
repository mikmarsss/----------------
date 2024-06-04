import React from "react";
import { observer } from 'mobx-react-lite'
import styles from "../styles/PortfolioPage.module.css"

function PortfolioPage() {
    return (
        <>
            <div className={`${styles.container} ${styles.glass}`}>
                <p className={styles.zagolovok}>Портфолио</p>
                <p className={styles.info}>Здесь будут отоброжаться ваши сертификаты и работы выполненные во время обучения</p>
            </div>
        </>
    )
}

export default observer(PortfolioPage)