import React, { useContext } from "react";
import styles from '../styles/footer.module.css'
import Image from "./Image";
import logo from "../Images/logo.svg"
import profileicon from "../Images/profileIcon.svg"
import { Link } from "react-router-dom";
import { Context } from "..";
import { observer } from "mobx-react-lite";

function Footer() {
    const { store } = useContext(Context)
    return (
        <>
            <footer className={styles.footer1}>
                <div className={styles.container}>

                    <div className={styles.logo}>
                        <div>
                            <Image image={logo} alt={"logo"} />
                        </div>
                        <button>Политика конфиденциальности</button>
                    </div>
                    <div className={styles.oppblock}>
                        <div className={styles.courses}>
                            <p>Курсы</p>
                            <div className={styles.buttons}>
                                <button>
                                    <Link to="/catalog" style={{ textDecoration: 'none', color: 'white' }}>
                                        Учиться
                                    </Link>
                                </button>
                                <button>
                                    <Link to="/create" style={{ textDecoration: 'none', color: 'white' }}>
                                        Создать
                                    </Link>
                                </button>
                            </div>
                        </div>
                        <div className={styles.courses}>
                            <p>Работа</p>
                            <div className={styles.buttons}>
                                <button>Фриланс</button>
                                <button>Фулл тайм</button>
                            </div>
                        </div>
                    </div>
                    <div className={`${!store.isAuth ? styles.auth : styles.non}`}>
                        <div>
                            <Image image={profileicon} alt={"icon"} />
                        </div>
                        <div>
                            <button>Вход</button>
                        </div>
                        <div>
                            <button>Регистрация</button>
                        </div>
                    </div>
                    <div className={`${store.isAuth ? styles.auth : styles.non}`}>
                        <div>
                            <button>
                                {store.user.email}
                            </button>
                        </div>
                    </div>
                </div>
            </footer>
        </>)

}

export default observer(Footer)