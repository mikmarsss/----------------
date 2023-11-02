import React from "react";
import { observer } from "mobx-react-lite";
import styles from "../styles/vhodform.module.css"
import { Context } from "..";
import { useContext, useState } from "react";
import Image from "./Image";
import logo from "../Images/logo.svg"
import exitbutton from "../Images/exitbutton.svg"


function RegForm({ onShowRegBlock, showRegBlock }) {
    const { store } = useContext(Context)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleClick = () => {
        onShowRegBlock(null)
    }

    return (
        <>
            if()
            <div className={`${showRegBlock === "show" ? styles.conthide : styles.nbn}`}>

            </div>
            <div className={styles.container}>
                <div className={styles.exitbutton}>
                    <button onClick={handleClick}>
                        <Image image={exitbutton} alt={"exit"} />
                    </button>
                </div>
                <div className={styles.logo}>
                    <Image image={logo} alt={"logo"} />
                </div>
                <div className={styles.inputfields}>
                    <div className={styles.mailfild}>
                        <span>Адресс электронной почты</span>
                        <input
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                            placeholder="Email"
                            type="email" />
                    </div>
                    <div className={styles.passwordfild}>
                        <span>Пароль</span>
                        <input
                            type="password"
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                            placeholder="Password"

                        />
                    </div>
                </div>
                <div className={styles.loginbutt}>
                    <button onClick={() => store.registration(email, password)}>продолжить</button>
                </div>
                <hr />
                <div className={styles.description}>
                    <span>Продолжая, вы соглашаетесь с положениями основных документов TETA.
                        Это <a href=""><b>Условия предоставления услуг</b></a> и <a href=""> <b>Политика конфиденциальности</b></a>.
                        . А также подтверждаете, что прочли их.</span>
                </div>
                <hr />
                <div className={styles.reg}>
                    <span>
                        <a href=""> <b>Уже зарегистрировались?
                            Войти</b></a>
                    </span>
                </div>
            </div>
        </>
    )
}

export default RegForm