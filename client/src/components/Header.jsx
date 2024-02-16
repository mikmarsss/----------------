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
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate
} from "react-router-dom";
import PersonalAccount from '../pages/PersonalAccount';
import downstrelka from "../Images/downstrelka.svg"
import upstrelka from "../Images/upstrelka.svg"


function Header({ }) {
    const [showBlockFirst, setShowBlockFirst] = useState(null)
    const [showBlockSecond, setShowBlockSecond] = useState(null)
    const [showVhodBlock, setShowVhodBlock] = useState(null)
    const [showRegBlock, setShowRegBlock] = useState(null)
    const { store } = useContext(Context)
    const upArrow = showBlockFirst === "show" ? <Image image={upstrelka} alt="strelka" /> : <Image image={downstrelka} alt="strelka" />
    const downArrow = showBlockSecond === "show" ? <Image image={upstrelka} alt="strelka" /> : <Image image={downstrelka} alt="strelka" />

    const handleClickNavFirst = (showBlockFirst) => {
        const shown = showBlockFirst === "show" ? null : "show"
        setShowBlockFirst(shown)
    }

    const handleClickNavSecond = (showBlockSecond) => {
        const shownn = showBlockSecond === "show" ? null : "show"
        setShowBlockSecond(shownn)
    }
    const regHandleClick = (showRegBlock) => {

        setShowRegBlock(showRegBlock);
    }

    const vhodHandleClick = (showVhodBlock) => {

        setShowVhodBlock(showVhodBlock);
    }

    const showAuth = <ShowAuth onVhodHandleClick={vhodHandleClick} onRegHandleClick={regHandleClick} />
    const showProfile = <ShowProfile name={store.user.username} />


    return (

        <>
            <div className={`${showRegBlock === "show" && !store.isAuth ? styles.showReg : styles.non}`}>
                <RegForm showRegBlock={showRegBlock} onShowRegBlock={regHandleClick} />
            </div>
            <div className={`${(showVhodBlock === "show" && !store.isAuth) ? styles.showVhod : styles.non}`}>
                <VhodForm showVhodBlock={showVhodBlock} onShowVhodBlock={vhodHandleClick} />
            </div>

            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.image}>
                        <button className={styles.logo}>
                            <Link to="/catalog">
                                <Image image={logo2} alt={"logo"} />
                            </Link>

                        </button>
                    </div>
                    <div className={styles.dropdownButtons} >
                        <div className={styles.firstbutton}>
                            <div className={styles.course}>
                                <button onClick={() => handleClickNavFirst(showBlockFirst)} className={styles.navButtuns}>
                                    Курсы
                                </button>

                                <div className={`${styles.workContainer} ${showBlockFirst === "show" ? styles.showSecond : ''}`}>
                                    <button>
                                        <Link style={{ textDecoration: 'none', color: 'black' }} to={"/catalog"}>
                                            Учиться
                                        </Link>
                                    </button>
                                    <button>
                                        <Link style={{ textDecoration: 'none', color: 'black' }} to={"/create"}>
                                            Создать
                                        </Link>
                                    </button>
                                </div>
                            </div>

                        </div>
                        <div className={styles.firstbutton}>
                            <div className={styles.work}>
                                <button onClick={() => handleClickNavSecond(showBlockSecond)} className={styles.navButtuns} >Работа</button>
                                <div className={`${styles.workContainer} ${showBlockSecond === "show" ? styles.showSecond : ''}`}>
                                    <button>Фриланс</button>
                                    <button>Фул тайм</button>
                                </div>
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
    const navigate = useNavigate();

    const { store } = useContext(Context)
    const [showProfileBlock, setShowProfileBlock] = useState(null)
    const handleClick = (show) => {
        const shown = show === "show" ? null : "show"
        setShowProfileBlock(shown)
    }

    const profileHandleClick = (id) => {
        switch (id) {
            case "3":
                store.logout()
                navigate("/catalog")
                break;
        }
    }


    const menuBlok = profile.map((item) => (<ProfileMenu name={item.name} url={item.url} id={item.id} onProfileClick={profileHandleClick} />))
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

function ProfileMenu({ name, id, onProfileClick, url }) {
    const { store } = useContext(Context)
    const handleClick = () => {
        onProfileClick(id)
    }
    return (
        <>
            <button onClick={handleClick}>
                <Link style={{ textDecoration: 'none', color: 'black' }} to={url + `/${store.user.id}`}>
                    {name}
                </Link>
            </button>
        </>
    )
}
export default observer(Header)