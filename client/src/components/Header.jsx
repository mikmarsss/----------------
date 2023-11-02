import styles from '../styles/header.module.css'
import React from 'react'
import Image from './Image'
import logo from '../Images/logo.svg'
import RegForm from './RegForm'
import VhodForm from './VhodForm'
import { useState } from 'react'



function Header({ onSelectedFunc }) {
    const [showBlockFirst, setShowBlockFirst] = useState(null)
    const [showBlockSecond, setShowBlockSecond] = useState(null)
    const [showVhodBlock, setShowVhodBlock] = useState(null)
    const [showRegBlock, setShowRegBlock] = useState(null)

    const regHandleClick = (showRegBlock) => {
        setShowRegBlock(showRegBlock)
    }

    const vhodHandleClick = (showVhodBlock) => {
        setShowVhodBlock(showVhodBlock);
    }

    const handleClickNavFirst = (showBlockFirst) => {
        const shown = showBlockFirst === "show" ? null : "show"
        setShowBlockFirst(shown)
    }

    const handleClickNavSecond = (showBlockSecond) => {
        const shownn = showBlockSecond === "show" ? null : "show"
        setShowBlockSecond(shownn)
    }
    return (
        <>
            <div className={`${showRegBlock === "show" ? styles.showReg : styles.non}`}>
                <RegForm showRegBlock={showRegBlock} onShowRegBlock={regHandleClick} />
            </div>
            <div className={`${(showVhodBlock === "show") ? styles.showVhod : styles.non}`}>
                <VhodForm showVhodBlock={showVhodBlock} onShowVhodBlock={vhodHandleClick} />
            </div>
            <div className={styles.container}>
                <div className={styles.navBar}>
                    <div className={styles.logo}>
                        <button onClick={() => onSelectedFunc("landingpage")}>
                            <Image image={logo} alt={"logo"} />
                        </button>
                    </div>
                    <div className={styles.dropdownButtons} >
                        <div className={styles.course}>
                            <button onClick={() => handleClickNavFirst(showBlockFirst)} className={styles.navButtuns}>Курсы</button>
                            <div className={`${styles.workContainer} ${showBlockFirst === "show" ? styles.showSecond : ''}`}>
                                <button onClick={() => onSelectedFunc("catalogpage")}>Учиться</button>
                                <button onClick={() => onSelectedFunc("CreateCoursesBlock")}>Создать</button>
                            </div>
                        </div>
                        <div className={styles.work}>
                            <button onClick={() => handleClickNavSecond(showBlockSecond)} className={styles.navButtuns} >Работа</button>
                            <div className={`${styles.workContainer} ${showBlockSecond === "show" ? styles.showSecond : ''}`}>
                                <button onClick={() => onSelectedFunc("workBlock")}>Фриланс</button>
                                <button onClick={() => onSelectedFunc("workBlock")}>Фул тайм</button>
                            </div>
                        </div>
                    </div>
                    <div >
                        <div className={styles.container}>
                            <div>
                                <div className={styles.auth}>
                                    <button className={styles.navButtuns} onClick={() => vhodHandleClick("show")}>
                                        Вход
                                    </button>
                                    <button className={styles.navButtuns} onClick={() => regHandleClick("show")} >
                                        Регистрация
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header