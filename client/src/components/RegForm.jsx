import React from "react";
import { observer } from "mobx-react-lite";
import styles from "../styles/regform.module.css"
import { Context } from "..";
import { useContext, useState } from "react";
import Image from "./Image";
import logo from "../Images/logo.svg"
import exitbutton from "../Images/exitbutton.svg"


function RegForm({ onShowRegBlock, showRegBlock }) {
    const { store } = useContext(Context)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [equalPassword, setEqualPassword] = useState('');
    const [emailDirty, setEmailDirty] = useState(false)
    const [passwordDirty, setPasswordDirty] = useState(false)
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [passwordEqualError, setPasswordEqualsError] = useState('')
    const [username, setUsername] = useState('')
    const [usernameError, setUsernameError] = useState('Поле не может быть пустым')
    const handleClick = () => {
        onShowRegBlock(null)
    }

    const usernameHandler = (e) => {
        if (e.target.value === '') {
            setUsernameError('Поле не может быть пустым')
        }
        else {
            setUsernameError('')
        }
    }
    const showRegError = () => {
        console.log('пароли не совпадают')
    }

    const equalHandler = (e) => {
        if (e.target.value === password || e.target.value === '') {
            setPasswordEqualsError('')
        } else {
            setPasswordEqualsError('Пароли не совпадают')
        }
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

    const twoCallsUsername = (e) => {
        usernameHandler(e)
        setUsername(e.target.value)
    }

    const twoCallsPassword = (e) => {
        passwordHandler(e)
        setPassword(e.target.value)
    }

    const twoCallsEqualPassword = (e) => {
        equalHandler(e)
        setEqualPassword(e.target.value)
    }

    return (
        <>

            <div className={`${showRegBlock === "show" ? styles.conthide : styles.nbn}`}>

            </div>
            <div className={styles.container}>
                <div className={styles.exitbutton}>
                    <button onClick={handleClick}>
                        <Image image={exitbutton} alt={"exit"} />
                    </button>
                </div>
                <div className={styles.zagolovok}>
                    <h1>Регистрация</h1>
                </div>
                <div className={styles.inputfields}>
                    <div className={styles.mailfild}>
                        <label htmlFor="username">Имя пользователя</label>
                        {{ usernameError } && <div className={styles.emailError}>{usernameError}</div>}
                        <input className={styles.usernameField}
                            name='email'
                            onBlur={e => blurHandler(e)}
                            onChange={e => twoCallsUsername(e)}
                            value={username}
                            placeholder="Имя пользователя"
                            type="text"
                            id="username"
                        />
                    </div>
                    <div className={styles.mailfild}>
                        <label htmlFor="email">Почта</label>
                        {{ emailDirty, emailError } && <div className={styles.emailError}>{emailError}</div>}
                        <input className={`${emailError ? styles.error : styles.nn}`}
                            name='email'
                            onBlur={e => blurHandler(e)}
                            onChange={e => twoCallsEmail(e)}
                            value={email}
                            placeholder="Электронная почта"
                            type="email"
                            id="email"
                        />
                    </div>
                    <div className={styles.passwordfild}>
                        <label htmlFor="password">Пароль</label>
                        {{ passwordDirty, passwordError } && <div className={styles.passwordError}>{passwordError}</div>}

                        <input className={`${passwordError ? styles.error : styles.nn}`}
                            name='password'
                            onBlur={e => blurHandler(e)}
                            type="password"
                            onChange={e => twoCallsPassword(e)}
                            value={password}
                            placeholder="Пароль"
                            id="password"
                        />
                    </div>
                    <div className={styles.passwordfild}>
                        <label htmlFor="password">Повторите пароль</label>
                        {{ passwordDirty, passwordEqualError } && <div className={styles.passwordError}>{passwordEqualError}</div>}

                        <input className={`${passwordEqualError ? styles.error : styles.nn}`}
                            type="password"
                            onChange={e => twoCallsEqualPassword(e)}
                            onBlur={e => blurHandler(e)}
                            value={equalPassword}
                            placeholder="Повторите пароль"
                            name='equalpassword'
                        />
                    </div>
                </div>
                <button className={styles.loginbutt}>
                    <div onClick={() => store.registration(email, password, username)}>Зарегистрироваться</div>
                </button>
            </div>
        </>
    )
}

export default RegForm