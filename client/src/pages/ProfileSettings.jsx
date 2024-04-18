import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import styles from "../styles/personalAcc.module.css"
import { Context } from "..";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, Navigate, useParams } from "react-router-dom";
import Image from "../components/Image";
import { CATALOG_ROUTE, TEST_PAGE } from "../utils";




function ProfileSettings() {
    const { store } = useContext(Context)
    const [name, setName] = useState(store.user.name)
    const [surname, setSurname] = useState(store.user.surname)
    const [city, setCity] = useState(store.user.city)
    const [dob, setDob] = useState(store.user.dob)
    const [username, setUsername] = useState(store.user.username)
    const [newPassword, setNewPassword] = useState('')
    const [changeCode, setChangeCode] = useState('')
    const [changeBlock, setChangeBlock] = useState(false)
    const [changeEmailBlock, setChangeEmailBlock] = useState(false)
    const [newPasswordError, setNewPasswordError] = useState(true)
    const [NPErrorText, setNPErrorText] = useState('')
    const [changeCodeError, setChangeCodeError] = useState(true)
    const [changeCodeErrorText, setChangeCodeErrorText] = useState('Поле не может быть пустым')
    const [aboutM, setAboutMe] = useState(store.user.aboutMe)
    const [ava, setAva] = useState([])
    const [avaSrc, setAvaSrc] = useState(`${"http://localhost:5000/" + store.user.img}`)
    const [email, setEmail] = useState(store.user.email)
    const [newEmail, setNewEmail] = useState('')
    const [emailError, setEmailError] = useState('')



    const newPasswordHandler = (e) => {
        setNewPassword(e.target.value)

        if (e.target.value.length < 6 || e.target.value.length > 32) {
            setNewPasswordError(true)
            setNPErrorText('Пароль должен быть больше 6 знаков')
        }
        if (e.target.value === '') {
            setNewPasswordError(false)
            setNPErrorText('')
        }
        if (e.target.value.length >= 6 && e.target.value.length < 32) {
            setNewPasswordError(false)
            setNPErrorText('')
        }
    }


    const handleClick = () => {
        const formdata = new FormData()
        formdata.append('email', store.user.email)
        formdata.append('name', name)
        formdata.append('surname', surname)
        formdata.append('dob', dob)
        formdata.append('city', city)
        formdata.append('username', username)
        formdata.append('aboutMe', aboutM)
        formdata.append('img', ava)
        store.saveData(formdata)
    }


    const sendCodeHandler = () => {
        if ((NPErrorText !== '' || newPassword) && NPErrorText !== 'Поле не может быть пустым' && NPErrorText !== 'Пароль должен быть больше 6 знаков') {
            setChangeBlock(true)
            store.sendChangePasswordCode(store.user.email)
        }
    }

    const sendCodeEmailHandler = () => {
        if ((emailError !== '' || newEmail) && emailError !== 'Некорректный email') {
            setChangeEmailBlock(true)
            store.sendChangePasswordCode(store.user.email, newEmail)
        }
    }

    const changePasswordHandler = () => {
        if (newPassword && !changeCodeError) {
            setChangeBlock(false)
            store.changePassword(store.user.email, changeCode, newPassword)
            setNewPasswordError(false)
            setNewPassword('')
            setChangeBlock(false)
            setChangeCode('')
        } else {
            setNPErrorText('Поле не может быть пустым')
            setNewPasswordError(true)
        }
    }

    const changeEmail = () => {
        if (newEmail && !changeCodeError) {
            setChangeBlock(false)
            store.changeEmail(store.user.email, newEmail, changeCode)
            setEmailError('')
            setNewEmail('')
            setChangeEmailBlock(false)
        } else {
            setEmailError('Поле не может быть пустым')
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

    const emailHandler = (e) => {
        setNewEmail(e.target.value)
        const re =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError('Некорректный email')
        }
        if (e.target.value === '') {
            setEmailError('')
        }
    }

    console.log(newEmail)

    const selectAva = (e) => {
        var reader = new FileReader()
        reader.onload = function () {
            var preview = document.querySelector('#img')
            preview.src = reader.result
        }
        reader.readAsDataURL(e.target.files[0])
        setAva(e.target.files[0])
    }
    const params = useParams()
    const current = params.id
    return (
        <>
            {
                current == store.user.id &&
                <div className={styles.container}>
                    <div className={styles.settingContainer}>
                        <p className={styles.zagolovok}>Настройки</p>

                        <div className={styles.mainInfo}>
                            <img className={styles.ava} id="img" src={avaSrc} />
                            <div className={styles.avausername}>
                                <div>
                                    <p>Имя профиля</p>
                                    <input
                                        className={styles.logininput}
                                        value={username}
                                        type="text"
                                        placeholder={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <p>Фото</p>
                                    <input type="file"
                                        id="img"
                                        onChange={(e) => selectAva(e)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={styles.otherInfo}>
                            <div>
                                <p>Почта</p>
                                <input
                                    value={store.user.email}
                                    placeholder={store.user.email}
                                    type="text"
                                    className={styles.logininput}
                                    onChange={(e) => setEmail(e.target.value)}

                                />
                            </div>
                            <div>
                                <p>Имя</p>
                                <input
                                    value={name}
                                    placeholder={name}
                                    type="text"
                                    className={styles.logininput}
                                    onChange={(e) => setName(e.target.value)}

                                />
                            </div>
                            <div>
                                <p>Фамилия</p>
                                <input
                                    value={surname}
                                    placeholder={surname}
                                    type="text"
                                    className={styles.logininput}
                                    onChange={(e) => setSurname(e.target.value)}

                                />
                            </div>
                            <div>
                                <p>Дата рождения</p>
                                <input
                                    value={dob}
                                    placeholder={dob}
                                    type="date"
                                    className={styles.logininput}
                                    onChange={(e) => setDob(e.target.value)}

                                />
                            </div>
                            <div>
                                <p>Город</p>
                                <input
                                    value={city}
                                    placeholder={city}
                                    type="text"
                                    className={styles.logininput}
                                    onChange={(e) => setCity(e.target.value)}

                                />
                            </div>
                        </div>
                        <button onClick={() => handleClick()} className={styles.saveButton}>Сохранить</button>
                    </div>
                    <div className={styles.emailPassword}>
                        <div className={styles.second}>
                            <div className={styles.editPassword}>
                                <p>{newPasswordError ? <div className={styles.error} >{NPErrorText}</div> : false}</p>
                                <div>
                                    <p >Новый пароль</p>
                                    <input type="password"
                                        className={styles.logininput}
                                        placeholder="Введите новый пароль"
                                        onChange={(e) => newPasswordHandler(e)}
                                        value={newPassword}
                                    />
                                </div>
                                {changeBlock &&
                                    <div>
                                        {changeCodeError && <div className={styles.error}>{changeCodeErrorText}</div>}
                                        <p>Код подтверждения</p>
                                        <input
                                            className={styles.logininput}
                                            id="password"
                                            type="text"
                                            placeholder="Введите шестизначный код из письма"
                                            value={changeCode}
                                            onChange={e => changeCodeHandler(e)}
                                        />
                                    </div>}
                                <div className={styles.redButton}>
                                    {!changeBlock && <button onClick={sendCodeHandler}>
                                        <p>РЕДАКТИРОВАТЬ</p>
                                    </button>}
                                    {changeBlock &&
                                        <div className={styles.redButton}>
                                            <button onClick={() => changePasswordHandler()}>
                                                <p className={styles.buttext}>СОХРАНИТЬ</p>
                                            </button>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className={styles.editEmail}>
                                <p>{emailError ? <div className={styles.error} >{emailError}</div> : false}</p>
                                <div>
                                    <p>Новая почта</p>
                                    <input
                                        className={styles.logininput}
                                        id="email"
                                        type="text"
                                        name="email"
                                        placeholder="Введите новую почту"
                                        onChange={(e) => emailHandler(e)}
                                    />
                                </div>
                                {changeEmailBlock &&
                                    <div>
                                        {changeCodeError && <div className={styles.error}>{changeCodeErrorText}</div>}
                                        <p>Код подтверждения</p>
                                        <input
                                            className={styles.logininput}
                                            id="password"
                                            type="text"
                                            placeholder="Введите шестизначный код из письма"
                                            value={changeCode}
                                            onChange={e => changeCodeHandler(e)}
                                        />
                                    </div>}
                                <div className={styles.redButton}>
                                    {!changeEmailBlock && <button onClick={sendCodeEmailHandler}>
                                        <p>РЕДАКТИРОВАТЬ</p>
                                    </button>}
                                    {changeEmailBlock &&
                                        <div className={styles.redButton}>
                                            <button onClick={() => changeEmail()}>
                                                <p className={styles.buttext}>СОХРАНИТЬ</p>
                                            </button>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

            <div className={styles.footer}>
            </div>
        </>
    )
}


export default observer(ProfileSettings)