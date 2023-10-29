import React from "react";
import { observer } from "mobx-react-lite";
import styles from "../styles/vhodform.module.css"
import { Context } from "..";
import { useContext, useState } from "react";
import Image from "./Image";
import logo from "../Images/logo.svg"

function VhodForm() {
    const { store } = useContext(Context)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <>
            <div className={styles.container}>
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
                    <button onClick={() => store.login(email, password)}>продолжить</button>
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
                        <a href=""> <b>Еще не зарегистрировались в TETA? Зарегистрироваться.</b></a>
                    </span>
                </div>
            </div>
        </>
    )
}

export default VhodForm