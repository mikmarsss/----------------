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
import { CATALOG_ROUTE, CREATE_ROUTE, PERSONAL_PAGE } from '../utils';



function Header({ }) {
    const [showUnderline, setShowUnderline] = useState('course')
    const { store } = useContext(Context)

    const handleClickNavButtons = (tag) => {
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
                            <div>
                                {
                                    store.isAuth &&
                                    <Link to={PERSONAL_PAGE + `/${store.user.id}`}>
                                        <button className={styles.navButtuns}>
                                            {store.user.username}
                                        </button>
                                    </Link>
                                }
                                {
                                    !store.isAuth &&
                                    <>
                                        <button className={styles.navButtuns}>
                                            Вход
                                        </button>
                                        <button className={styles.navButtuns}>
                                            Регистрация
                                        </button>
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