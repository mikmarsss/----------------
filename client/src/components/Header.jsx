import React, { useContext } from 'react'
import styles from "../styles/header.module.css"
import { Context } from "..";
import { observer } from "mobx-react-lite";
import Image from './Image'
import logo2 from '../Images/logo2.svg'
import { useState } from 'react'
import { profile } from "../data/coursesData"
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate
} from "react-router-dom";
import { AUTHORIZATION_PAGE, CATALOG_ROUTE, CREATE_ROUTE, PERSONAL_PAGE } from '../utils';



function Header() {
    const [showUnderline, setShowUnderline] = useState(localStorage.getItem('coursetag'))
    const { store } = useContext(Context)

    const handleClickNavButtons = (tag) => {
        localStorage.setItem('coursetag', tag)
        setShowUnderline(tag)
    }

    return (
        <>

            <div className={styles.container}>
                <div className={styles.header}>
                    <div>
                        <button className={styles.logo}>
                            <Link to="/catalog">
                                <Image image={logo2} alt={"logo"} />
                            </Link>

                        </button>
                    </div>
                    <div className={styles.dropdownButtons} >
                        <div className={styles.firstbutton}>
                            <div className={styles.course}>
                                <Link to={CATALOG_ROUTE}>
                                    <button onClick={() => handleClickNavButtons('course')} className={`${styles.navButtuns} ${showUnderline === 'course' ? styles.underline : styles.nn}`}>
                                        Курсы
                                    </button>
                                </Link>
                                <Link to={CREATE_ROUTE}>
                                    <button onClick={() => handleClickNavButtons('create')} className={`${styles.navButtuns} ${showUnderline === 'create' ? styles.underline : styles.nn}`}>
                                        Создать
                                    </button>
                                </Link>
                            </div>

                        </div>
                        <div className={styles.firstbutton}>
                            <div className={styles.work}>
                                <button onClick={() => handleClickNavButtons('freelance')} className={`${styles.navButtuns} ${showUnderline === 'freelance' ? styles.underline : styles.nn}`} >
                                    Фриланс
                                </button>
                            </div>

                        </div>
                        <div className={styles.firstbutton}>
                            <div className={styles.profile}>
                                {
                                    store.isAuth &&
                                    <Link to={PERSONAL_PAGE + `/${store.user.id}`}>
                                        <button onClick={() => handleClickNavButtons('profile')} className={`${styles.navButtuns} ${showUnderline === 'profile' ? styles.underline : styles.nn}`}>
                                            {store.user.username}
                                        </button>
                                    </Link>
                                }
                                {
                                    !store.isAuth &&
                                    <>
                                        <Link to={AUTHORIZATION_PAGE}>
                                            <button className={styles.navButtuns}>
                                                Авторизация
                                            </button>
                                        </Link>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )

}
export default observer(Header)