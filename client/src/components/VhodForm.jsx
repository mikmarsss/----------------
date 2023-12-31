import React from "react";
import { observer } from "mobx-react-lite";
import styles from "../styles/vhodform.module.css"
import { Context } from "..";
import { useContext, useState } from "react";
import Image from "./Image";
import logo from "../Images/logo.svg"
import exitbutton from "../Images/exitbutton.svg"
import { Link, BrowserRouter as Router } from "react-router-dom";

function VhodForm({ onShowVhodBlock, showVhodBlock }) {
    const { store } = useContext(Context)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailDirty, setEmailDirty] = useState(false)
    const [passwordDirty, setPasswordDirty] = useState(false)
    const [showRegBlock, setShowRegBlock] = useState(null)
    const [emailError, setEmailError] = useState('Поле email не может быть пустым')
    const [passwordError, setPasswordError] = useState('Поле пароль не может быть пустым')
    const handleClick = () => {
        onShowVhodBlock(null)
    }

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true)
                break
            case 'password':
                setPasswordDirty(true)
                break

        }
    }

    const emailHandler = (e) => {
        setEmail(e.target.value)
        const re =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError('Некорректный email')
        } else {
            setEmailError('')
        }
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
        if (e.target.value.length < 6 || e.target.value.length > 32) {
            setPasswordError('Пароль должен быть больше 6 знаков')
            if (!e.target.value) {
                setPasswordError('Пароль не может быть пустым')
            }
        } else {
            setPasswordError('')
        }
    }

    const twoCallsEmail = (e) => {
        emailHandler(e)
        setEmail(e.target.value)
    }

    const twoCallsPassword = (e) => {
        passwordHandler(e)
        setPassword(e.target.value)
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
                        {{ emailDirty, emailError } && <div className={styles.emailError}>{emailError}</div>}
                        <input className={`${emailError ? styles.error : styles.nn}`}
                            name='email'
                            onBlur={e => blurHandler(e)}
                            onChange={e => twoCallsEmail(e)}
                            value={email}
                            placeholder="Электронная почта"
                            type="email" />
                    </div>
                    <div className={styles.passwordfild}>
                        {{ passwordDirty, passwordError } && <div className={styles.passwordError}>{passwordError}</div>}
                        <input className={`${passwordError ? styles.error : styles.nn}`}
                            name="password"
                            onBlur={e => blurHandler(e)}
                            type="password"
                            onChange={e => twoCallsPassword(e)}
                            value={password}
                            placeholder="Пароль"

                        />
                    </div>
                </div>
                <div className={styles.loginbutt}>
                    <button onClick={() => store.login(email, password)}>
                        войти
                    </button>
                </div>
            </div>

        </>
    )
}



export default observer(VhodForm)