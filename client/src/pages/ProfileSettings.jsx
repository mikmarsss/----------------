import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import styles from "../styles/profileSettings.module.css"
import { Context } from "..";

function ProfileSettings() {
    const { store } = useContext(Context)
    const [name, setName] = useState(store.user.name)
    const [surname, setSurname] = useState(store.user.surname)
    const [city, setCity] = useState(store.user.city)
    const [dob, setDob] = useState(store.user.dob)
    const [redButton, setRedButton] = useState("confirm")

    const handleClick = (redButton) => {
        const shown = redButton === "confirm" ? "red" : "confirm"
        setRedButton(shown)
        if (redButton === 'red') {
            store.saveData(store.user.email, name, surname, city, dob)
        }

    }
    return (
        <>
            <div>
                <div className={styles.profileinfo}>
                    <div className={styles.photo}>

                    </div>
                    <div className={styles.info} >
                        <div className={`${styles.first} ${redButton === "confirm" ? styles.disabled : styles.first}`}>
                            <div>
                                <p>Имя</p>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    placeholder={store.user.name}

                                />
                            </div>
                            <div>
                                <p>Фамилия</p>
                                <input
                                    type="text"
                                    value={surname}
                                    onChange={e => setSurname(e.target.value)}
                                    placeholder={store.user.surname} />
                            </div>
                            <div>
                                <p>Город</p>
                                <input
                                    type="text"
                                    value={city}
                                    onChange={e => setCity(e.target.value)}
                                    placeholder={store.user.city}
                                />
                            </div>

                        </div>
                        <div className={`${styles.first} ${redButton === "confirm" ? styles.disabled : styles.first}`}>
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
                                <p>Почта</p>
                                <input
                                    type="mail"
                                />
                            </div>
                            <div>
                                <p>Пароль</p>
                                <input type="password" />
                            </div>

                        </div>
                    </div>
                    <div className={styles.redButton}>
                        <button onClick={() => handleClick(redButton)}>
                            <ProfileButton redButton={redButton} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

function ProfileButton({ redButton }) {
    const text = redButton === "confirm" ? "РЕДАКТИРОВАТЬ" : "ПРИНЯТЬ"
    return (
        <>
            <p className={styles.buttext}>{text}</p>
        </>
    )
}
export default observer(ProfileSettings)