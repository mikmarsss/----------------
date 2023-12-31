import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import styles from "../styles/personalAcc.module.css"
import { Context } from "..";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
function ProfileSettings() {
    const { store } = useContext(Context)
    const [name, setName] = useState(store.user.name)
    const [surname, setSurname] = useState(store.user.surname)
    const [city, setCity] = useState(store.user.city)
    const [dob, setDob] = useState(store.user.dob)
    const [username, setUsername] = useState(store.user.username)
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [changeCode, setChangeCode] = useState('')
    const [changeBlock, setChangeBlock] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [redButton, setRedButton] = useState("confirm")

    const handleClick = (redButton) => {
        const shown = redButton === "confirm" ? "red" : "confirm"
        setRedButton(shown)
        if (redButton === 'red') {
            store.saveData(store.user.email, name, surname, city, dob, username)
        }

    }

    const passwordHandler = () => {
        if (password === '') {
            setPasswordError(true)
        } else {
            setPasswordError(false)
            setChangeBlock(true)
            store.sendChangePasswordCode(store.user.email, password)
        }
    }

    const changePasswordHandler = () => {
        setChangeBlock(false)
        store.changePassword(store.user.email, changeCode, newPassword)
    }

    const params = useParams()
    const current = params.username
    return (
        <>
            <Header />
            <div className={`${store.isAuth && current === store.user.username ? styles.container : styles.non} `}>
                <hr className={styles.linia} />
                <div className={styles.profileinfo}>

                    <div className={styles.photoButton}>
                        <div className={styles.photo}>

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
                <div>
                    <hr className={styles.linia} />
                </div>
                <div className={styles.emailPassword}>
                    <div className={styles.second}>
                        <div>
                            <div>
                                {passwordError && <div className={styles.passwordError}>Поле пароль не может быть пустым</div>}
                                <p>Пароль</p>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Текущий пароль"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                <p>Новый пароль</p>
                                <input
                                    id="password"
                                    type="text"
                                    placeholder="Введите новый пароль"
                                    value={newPassword}
                                    onChange={e => setNewPassword(e.target.value)}
                                />
                            </div>
                            {changeBlock &&
                                <div>
                                    <p>Код подтверждения</p>
                                    <input
                                        id="password"
                                        type="text"
                                        placeholder="Введите шестизначный код из письма"
                                        value={changeCode}
                                        onChange={e => setChangeCode(e.target.value)}
                                    />
                                </div>}
                            {!changeBlock &&
                                <div className={styles.redButton}>
                                    <button onClick={() => passwordHandler()}>
                                        <p className={styles.buttext}>РЕДАКТИРОВАТЬ</p>
                                    </button>
                                </div>
                            }
                            {changeBlock &&
                                <div className={styles.redButton}>
                                    <button onClick={() => changePasswordHandler()}>
                                        <p className={styles.buttext}>ПРИНЯТЬ</p>
                                    </button>
                                </div>
                            }
                        </div>
                        <div>
                            <div>
                                <p>Почта</p>
                                <input
                                    id="email"
                                    type="text"
                                    name="email"
                                    placeholder="Введите текущую почту"
                                />
                            </div>
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