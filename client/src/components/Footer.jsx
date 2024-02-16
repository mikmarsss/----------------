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
            <footer>
                <div className={styles.container}>
                    <div className={styles.left}>
                        <Image image={logo} />
                        <div>
                            <button className={styles.privacyPolicy}>
                                <p>Политика конфеденциальности</p>
                            </button>
                        </div>
                    </div>
                    <div className={styles.middle}>
                        <div>
                            <button>
                                Учиться
                            </button>
                        </div>
                        <div>
                            <button>
                                Преподавать
                            </button>
                        </div>
                    </div>
                    <div className={styles.middle}>
                        <div>
                            <button>
                                Вход
                            </button>
                        </div>
                        <div>
                            <button>
                                Регистрация
                            </button>
                        </div>
                    </div>

                </div>
            </footer>
        </>)

}

export default observer(Footer)