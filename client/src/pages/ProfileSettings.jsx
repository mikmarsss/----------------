import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import styles from "../styles/personalAcc.module.css"
import { Context } from "..";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, Navigate, useParams } from "react-router-dom";
import Image from "../components/Image";
import { CATALOG_ROUTE } from "../utils";




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
    const [redButton, setRedButton] = useState("confirm")
    const [newPasswordError, setNewPasswordError] = useState(true)
    const [NPErrorText, setNPErrorText] = useState('')
    const [changeCodeError, setChangeCodeError] = useState(true)
    const [changeCodeErrorText, setChangeCodeErrorText] = useState('Поле не может быть пустым')
    const [aboutM, setAboutMe] = useState(store.user.aboutMe)
    const [ava, setAva] = useState([])




    const newPasswordHandler = (e) => {
        setNewPassword(e.target.value)

        if (e.target.value.length < 6 || e.target.value.length > 32) {
            setNewPasswordError(true)
            setNPErrorText('Пароль должен быть больше 6 знаков')
            if (!e.target.value) {
                setNPErrorText('Пароль не может быть пустым')
            }
            if (e.target.value === '') {
                setNewPasswordError(false)
                setNPErrorText('')
            }

        } else {
            setNewPasswordError(false)
            setNPErrorText('')

        }
    }



    const handleClick = (redButton) => {
        const shown = redButton === "confirm" ? "red" : "confirm"
        setRedButton(shown)
        if (redButton === 'red') {

            const formdata = new FormData()
            formdata.append('email', store.user.email)
            formdata.append('name', name)
            formdata.append('surname', surname)
            formdata.append('dob', dob)
            formdata.append('city', city)
            formdata.append('username', username)
            formdata.append('aboutMe', aboutM)
            formdata.append('img', ava)
            formdata.forEach((value, key) => {
                console.log(key, value);
            });
            store.saveData(formdata)
        }

    }


    const sendCodeHandler = () => {
        if (newPasswordError) {
            setNPErrorText('Поле не может быть пустым')
        } else {
            setChangeBlock(true)
            store.sendChangePasswordCode(store.user.email)
        }
    }

    const changePasswordHandler = () => {
        if (newPassword && !changeCodeError) {
            setChangeBlock(false)
            store.changePassword(store.user.email, changeCode, newPassword)
            setNewPasswordError(false)
        } else {
            setNewPasswordError(true)
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
    const selectAva = (e) => {
        setAva(e.target.files[0])
    }
    console.log(store.user.email)
    const params = useParams()
    const current = params.id
    return (
        <>
            {
                !store.isAuth &&
                <Navigate to={CATALOG_ROUTE} />
            }
            <Header />
            <div className={`${store.isAuth && current == store.user.id ? styles.container : styles.non} `}>
                <hr className={styles.linia} />
                <div className={styles.profileinfo}>

                    <div className={styles.photoButton}>

                        <div className={styles.photo}>
                            <img className={styles.ava} src={"http://localhost:5000/" + store.user.img} alt="ava" />
                        </div>
                        <div>
                            <input type="file"
                                onChange={e => selectAva(e)}
                            />
                        </div>
                    </div>
                    <div className={styles.mainInfo} >
                        <div className={`${styles.first} ${redButton === "confirm" ? styles.disabled : styles.first}`}>
                            <div>
                                <p>Имя</p>
                                <input
                                    id="firstname"
                                    type="text"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    placeholder={store.user.name}

                                />
                            </div>
                            <div>
                                <p>Фамилия</p>
                                <input
                                    id="lastname"
                                    type="text"
                                    value={surname}
                                    onChange={e => setSurname(e.target.value)}
                                    placeholder={store.user.surname} />
                            </div>
                            <div>
                                <p>Город</p>
                                <input
                                    id=""
                                    type="text"
                                    value={city}
                                    onChange={e => setCity(e.target.value)}
                                    placeholder={store.user.city}
                                />
                            </div>
                            <div>
                                <p>Дата рождения</p>
                                <input
                                    value={dob}
                                    onChange={e => setDob(e.target.value)}
                                    type="date"
                                    placeholder={store.user.dob}
                                />
                            </div>
                            <div>
                                <p>Имя профиля</p>
                                <input
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    type="text"
                                    placeholder={store.user.username}
                                />
                            </div>
                            <div className={styles.redButton}>
                                <button onClick={() => handleClick(redButton)}>
                                    <ProfileButton redButton={redButton} />
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

                <div className={`${styles.aboutMe} ${redButton === "confirm" ? styles.disabled : styles.aboutMe}`}>
                    <div>
                        <p>Напишите немного о себе</p>
                        <textarea
                            placeholder={store.user.aboutMe}
                            value={aboutM}
                            type="text"
                            onChange={e => setAboutMe(e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <hr className={styles.linia} />
                </div>
                <div className={styles.emailPassword}>
                    <div className={styles.second}>
                        <div>
                            <div>
                                {newPasswordError && <div className={styles.passwordError}>{NPErrorText}</div>}
                                <p>Новый пароль</p>
                                <input
                                    className={`${newPasswordError && styles.passwordInput}`}
                                    id="password"
                                    type="password"
                                    placeholder="Введите новый пароль"
                                    value={newPassword}
                                    onChange={e => newPasswordHandler(e)}
                                />
                            </div>
                            {changeBlock &&
                                <div>
                                    {changeCodeError && <div className={styles.passwordError}>{changeCodeErrorText}</div>}
                                    <p>Код подтверждения</p>
                                    <input
                                        id="password"
                                        type="text"
                                        placeholder="Введите шестизначный код из письма"
                                        value={changeCode}
                                        onChange={e => changeCodeHandler(e)}
                                    />
                                </div>}
                            {!changeBlock &&
                                <div className={`${newPasswordError ? styles.redButtonError : styles.redButton}`}>
                                    <button onClick={() => sendCodeHandler()}>
                                        <p className={styles.buttext}>РЕДАКТИРОВАТЬ</p>
                                    </button>
                                </div>
                            }
                            {changeBlock &&
                                <div className={`${changeCodeError ? styles.redButtonError : styles.redButton}`}>
                                    <button onClick={() => changePasswordHandler()}>
                                        <p className={styles.buttext}>ПРИНЯТЬ</p>
                                    </button>
                                </div>
                            }
                        </div>
                        <div>

                            <div>
                                <p>Новая почта</p>
                                <input
                                    id="email"
                                    type="text"
                                    name="email"
                                    placeholder="Введите новую почту"
                                />
                            </div>
                            <div className={styles.redButton}>
                                <button >
                                    <p className={styles.buttext}>РЕДАКТИРОВАТЬ</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <hr className={styles.linia} />
                </div>
            </div>
            <div className={styles.footer}>
                <Footer />
            </div>
        </>
    )
}

function ProfileButton({ redButton }) {
    const text = redButton === "confirm" ? "РЕДАКТИРОВАТЬ" : "СОХРАНИТЬ"
    return (
        <>
            <p className={styles.buttext}>{text}</p>
        </>
    )
}


export default observer(ProfileSettings)