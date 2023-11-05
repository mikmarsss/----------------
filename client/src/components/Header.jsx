import React, { useContext } from 'react'
import styles from "../styles/header.module.css"
import { Context } from "..";
import { observer } from "mobx-react-lite";
import Image from './Image'
import logo2 from '../Images/logo2.svg'
import RegForm from './RegForm'
import VhodForm from './VhodForm'
import { useState } from 'react'
import { profile } from "../data/coursesData"

function Header({ }) {
    const [showBlockFirst, setShowBlockFirst] = useState(null)
    const [showBlockSecond, setShowBlockSecond] = useState(null)
    const [showVhodBlock, setShowVhodBlock] = useState(null)
    const [showRegBlock, setShowRegBlock] = useState(null)
    const { store } = useContext(Context)
    const handleClickNavFirst = (showBlockFirst) => {
        const shown = showBlockFirst === "show" ? null : "show"
        setShowBlockFirst(shown)
    }

    const handleClickNavSecond = (showBlockSecond) => {
        const shownn = showBlockSecond === "show" ? null : "show"
        setShowBlockSecond(shownn)
    }
    const regHandleClick = (showRegBlock) => {
        setShowRegBlock(showRegBlock)
    }

    const vhodHandleClick = (showVhodBlock) => {
        setShowVhodBlock(showVhodBlock);


    }

    const showAuth = <ShowAuth onVhodHandleClick={vhodHandleClick} onRegHandleClick={regHandleClick} />
    const showProfile = <ShowProfile name={store.user.email} />


    return (
        <>
            <div className={`${showRegBlock === "show" ? styles.showReg : styles.non}`}>
                <RegForm showRegBlock={showRegBlock} onShowRegBlock={regHandleClick} />
            </div>
            <div className={`${(showVhodBlock === "show") ? styles.showVhod : styles.non}`}>
                <VhodForm showVhodBlock={showVhodBlock} onShowVhodBlock={vhodHandleClick} />
            </div>

            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.image}>
                        <Image image={logo2} alt={"logo"} />
                    </div>
                    <div className={styles.dropdownButtons} >
                        <div className={styles.course}>
                            <button onClick={() => handleClickNavFirst(showBlockFirst)} className={styles.navButtuns}>Курсы</button>
                            <div className={`${styles.workContainer} ${showBlockFirst === "show" ? styles.showSecond : ''}`}>
                                <button>Учиться</button>
                                <button>Создать</button>
                            </div>
                        </div>

                        <div className={styles.work}>
                            <button onClick={() => handleClickNavSecond(showBlockSecond)} className={styles.navButtuns} >Работа</button>
                            <div className={`${styles.workContainer} ${showBlockSecond === "show" ? styles.showSecond : ''}`}>
                                <button>Фриланс</button>
                                <button>Фул тайм</button>
                            </div>
                        </div>
                    </div>

                    <div className={styles.containerauth}>
                        {!store.isAuth ? showAuth : showProfile}
                    </div>
                </div>
            </div>
        </>
    )

}


function ShowAuth({ onVhodHandleClick, onRegHandleClick }) {
    const vhodHandleClick = () => {
        onVhodHandleClick("show")
    }
    const regHandleClick = () => {
        onRegHandleClick("show")
    }
    return (
        <>
            <div className={styles.auth}>
                <button className={styles.navButtuns} onClick={vhodHandleClick}>
                    Вход
                </button>
                <button className={styles.navButtuns} onClick={regHandleClick} >
                    Регистрация
                </button>
            </div>
        </>
    )
}

function ShowProfile({ name }) {
    const [showProfileBlock, setShowProfileBlock] = useState(null)
    const handleClick = (show) => {
        const shown = show === "show" ? null : "show"
        setShowProfileBlock(shown)

    }
    const menuBlok = profile.map((item) => (<ProfileMenu name={item.name} />))
    return (
        <>
            <div className={styles.auth}>
                <button className={styles.navButtuns} onClick={() => handleClick(showProfileBlock)}>
                    {name}
                </button>
                <div className={`${showProfileBlock === "show" ? styles.profileMenu : styles.non}`}>
                    {menuBlok}
                </div>
            </div>

        </>
    )
}

function ProfileMenu({ name }) {


    return (
        <>

            <button>
                {name}
            </button>

        </>
    )
}
export default observer(Header)