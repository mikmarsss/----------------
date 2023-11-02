import React from "react";
import { observer } from "mobx-react-lite";
import styles from "../styles/vhodform.module.css"
import { Context } from "..";
import { useContext, useState } from "react";
import Image from "./Image";
import logo from "../Images/logo.svg"
import exitbutton from "../Images/exitbutton.svg"
import Landing from "./Landing";
import RegForm from "./RegForm";

function VhodForm({ onShowVhodBlock, showVhodBlock }) {
    const { store } = useContext(Context)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showRegBlock, setShowRegBlock] = useState(null)
    const handleClick = () => {
        onShowVhodBlock(null)
    }

    return (
        <>
            <div className={`${showVhodBlock === "show" && showRegBlock === null ? styles.conthide : styles.nbn}`}>

            </div>

            <div className={`${showRegBlock === null ? styles.container : styles.none}`}>
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
                            minLength={6}
                            maxLength={32}
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
                        А также подтверждаете, что прочли их.</span>
                </div>
                <hr />
                <div className={styles.reg}>
                    <span>
                        <button className={styles.regssilka}> <b>Еще не зарегистрировались в TETA? Зарегистрироваться.</b></button>
                    </span>
                </div>
            </div>
        </>
    )
}



export default observer(VhodForm)