import React from "react";
import { observer } from "mobx-react-lite";
import styles from "../styles/vhodform.module.css"
import { Context } from "..";
import { useContext, useState } from "react";
import Image from "./Image";
import logo from "../Images/logo.svg"
import exitbutton from "../Images/exitbutton.svg"
import { Link, useNavigate, Navigate } from "react-router-dom";
import { CATALOG_ROUTE } from "../utils";

function VhodForm({ onShowVhodBlock, showVhodBlock }) {
    const { store } = useContext(Context)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailDirty, setEmailDirty] = useState(false)
    const [passwordDirty, setPasswordDirty] = useState(false)
    const [showRegBlock, setShowRegBlock] = useState(null)
    const [emailError, setEmailError] = useState('Поле email не может быть пустым')
    const [passwordError, setPasswordError] = useState('Поле пароль не может быть пустым')
    const [restorePass, setRestorePass] = useState(false)
    const [changeCode, setChangeCode] = useState('')
    const [vvestiCode, setVvestiCode] = useState(false)
    const [changeCodeError, setChangeCodeError] = useState(true)
    const [changeCodeErrorText, setChangeCodeErrorText] = useState(true)
    const [newPassword, setNewPassword] = useState('')
    const [newPasswordError, setNewPasswordError] = useState('Поле не может быть пустым')
    const handleClick = () => {
        setEmail('')
        setRestorePass(false)
        setVvestiCode(false)
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

    const navigate = useNavigate()
    const loginHandler = () => {
        try {
            store.login(email, password)
            navigate("/catalog")
        } catch (e) {

        }
    }

    const restorePasswordHandler = (show) => {
        setRestorePass(show)
    }

    const sendCode = () => {
        if (emailError) {

        } else {
            store.sendChangePasswordCode(email)
            setVvestiCode(true)
        }

    }

    const changeCodeHandler = (e) => {
        setChangeCode(e.target.value)
        if (e.target.value.length < 6) {
            setChangeCodeError(true)
            setChangeCodeErrorText('Код должен быть шести значным')
            if (!e.target.value) {
                setChangeCodeError(true)
                setChangeCodeErrorText("Поле не может быть пустым")
            }
        } else {
            if (store.user.changeCode == e.target.value) {
                setChangeCodeError(false)
            } else {
                setChangeCodeError(true)
                setChangeCodeErrorText("Код неверный")
            }

        }
    }

    const newPasswordHandler = (e) => {
        setNewPassword(e.target.value)
        if (e.target.value.length < 6 || e.target.value.length > 32) {
            setNewPasswordError('Пароль должен быть больше 6 знаков')
            if (!e.target.value) {
                setNewPasswordError('Пароль не может быть пустым')
            }
        } else {
            setNewPasswordError('')
        }
    }

    const twoCallsCode = () => {
        if (store.user.changeCode == changeCode && !newPasswordError) {
            setChangeCodeError(false)
            store.changePassword(email, changeCode, newPassword)
        } else {

        }
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
                {!restorePass &&
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
                }
                {restorePass &&
                    <div className={styles.restorePassBlock}>
                        <div className={styles.inputfields}>
                            <div className={styles.inputMail}>
                                {{ emailDirty, emailError } && <div className={styles.emailError}>{emailError}</div>}
                                <input
                                    type="email"
                                    placeholder="Введите почту"
                                    onChange={e => twoCallsEmail(e)}
                                />

                            </div>
                            {vvestiCode &&

                                <div className={styles.inputMail}>
                                    {changeCodeError && <div className={styles.emailError}>{changeCodeErrorText}</div>}
                                    <input
                                        type="text"
                                        placeholder="Введите код"
                                        onChange={e => changeCodeHandler(e)}
                                    />

                                </div>
                            }
                            {vvestiCode &&

                                <div className={styles.inputMail}>
                                    {newPasswordError && <div className={styles.passwordError}>{newPasswordError}</div>}
                                    <input
                                        type="password"
                                        placeholder="Введите новый пароль"
                                        onChange={e => newPasswordHandler(e)}
                                    />

                                </div>
                            }
                            {vvestiCode &&
                                <div className={styles.loginbutt}>
                                    <button onClick={(e) => twoCallsCode()}>
                                        изменить пароль
                                    </button>
                                </div>
                            }
                            {!vvestiCode &&
                                <div className={styles.loginbutt}>
                                    <button onClick={() => sendCode()}>
                                        получить код
                                    </button>
                                </div>
                            }
                        </div>
                    </div>
                }
                {!restorePass &&
                    <div className={styles.restorePass}>
                        <button onClick={() => restorePasswordHandler(true)}>Забыли пароль?</button>
                    </div>

                }
                {!restorePass &&

                    <div className={styles.loginbutt}>
                        <button onClick={() => loginHandler()}>
                            войти
                        </button>
                    </div>
                }


            </div>

        </>
    )
}



export default observer(VhodForm)