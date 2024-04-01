import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import styles from '../styles/authorization.module.css'
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Context } from "..";
import { useNavigate } from "react-router-dom";
import { CATALOG_ROUTE } from "../utils";


function Authorization() {
    const { store } = useContext(Context)
    const navigate = useNavigate()
    const [showAuth, setShowAuth] = useState('vhod')
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const [password, setPassword] = useState('')
    const [passwordRetry, setPasswordRetry] = useState('')
    const [username, setUsername] = useState('')

    const showAuthHandleClick = (auth) => {
        setShowAuth(auth)
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

    }

    const passwordRetryHandler = (e) => {
        setPasswordRetry(e.target.value)

    }

    const usernameHandler = (e) => {
        setUsername(e.target.value)

    }

    const loginHandler = () => {
        navigate(CATALOG_ROUTE)
        store.login(email, password)
    }

    const regHandler = () => {
        navigate(CATALOG_ROUTE)
        if (password === passwordRetry) {
            store.registration(email, password, username)
        }
    }

    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.vhodorreg}>
                    <button onClick={() => showAuthHandleClick('vhod')} className={`${showAuth === 'vhod' ? styles.clickedbutton : styles.c}`}>Вход</button>
                    <button onClick={() => showAuthHandleClick('reg')} className={`${showAuth === 'reg' ? styles.clickedbutton : styles.c}`}>Регистрация</button>
                </div>
                <div className={styles.authcontainer}>
                    {
                        showAuth === 'vhod' &&
                        <div className={styles.vhodBlock}>
                            <input
                                className={styles.logininput}
                                type="email"
                                onChange={(e) => emailHandler(e)}
                                value={email}
                                placeholder="Email"
                            />
                            <input
                                className={styles.logininput}
                                onChange={(e) => passwordHandler(e)}
                                value={password}
                                type="password"
                                placeholder="Password"

                            />
                            <button onClick={loginHandler} className={`${password && email !== '' ? styles.confirm : styles.vhodbutton}`}>Войти</button>
                        </div>
                    }
                    {
                        showAuth === 'reg' &&
                        <div className={styles.vhodBlock}>
                            <input
                                className={styles.logininput}
                                type="email"
                                onChange={(e) => emailHandler(e)}
                                value={email}
                                placeholder="Email"
                            />
                            <input
                                className={styles.logininput}
                                type="text"
                                onChange={(e) => usernameHandler(e)}
                                value={username}
                                placeholder="Username"
                            />
                            <input
                                className={styles.logininput}
                                onChange={(e) => passwordHandler(e)}
                                value={password}
                                type="password"
                                placeholder="Password"

                            />
                            <input
                                className={styles.logininput}
                                onChange={(e) => passwordRetryHandler(e)}
                                value={passwordRetry}
                                type="password"
                                placeholder="Retry Password"

                            />
                            <button onClick={regHandler} className={`${passwordRetry === password ? styles.confirm : styles.vhodbutton}`}>Зарегистрироваться</button>
                        </div>
                    }
                </div>
            </div>
            <Footer />
        </>
    )
}

export default observer(Authorization)