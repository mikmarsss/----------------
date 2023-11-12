import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import styles from "../styles/personalAcc.module.css"
import Header from "./Header";
import Image from "./Image";
import { Context } from "..";

function PersonalAccount() {
    const { store } = useContext(Context)
    const [redButton, setRedButton] = useState("confirm")
    const [switchCourses, setSwitchCourses] = useState("active")
    const handleClick = (redButton) => {
        const shown = redButton === "confirm" ? "red" : "confirm"
        setRedButton(shown)
    }

    const coursesHandleClick = (switchCourses) => {
        setSwitchCourses(switchCourses)
    }
    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.profile}>
                    <div className={styles.profileinfo}>
                        <div className={styles.photo}>

                        </div>
                        <div className={styles.info} >
                            <div className={`${styles.first} ${redButton === "confirm" ? styles.disabled : styles.first}`}>
                                <div>
                                    <p>Имя</p>
                                    <input type="text" />
                                </div>
                                <div>
                                    <p>Фамилия</p>
                                    <input type="text" />
                                </div>
                                <div>
                                    <p>Город</p>
                                    <input type="text" />
                                </div>

                            </div>
                            <div className={`${styles.first} ${redButton === "confirm" ? styles.disabled : styles.first}`}>
                                <div>
                                    <p>Почта</p>
                                    <input type="mail" />
                                </div>
                                <div>
                                    <p>Пароль</p>
                                    <input type="password" />
                                </div>
                                <div>
                                    <p>Дата рождения</p>
                                    <input type="date" />
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

                <div className={styles.courses}>
                    <div className={styles.coursbuttons}>
                        <button className={`${switchCourses === "active" ? styles.underlinedecor : ''}`} onClick={() => coursesHandleClick("active")}>Активные курсы</button>
                        <button className={`${switchCourses === "done" ? styles.underlinedecor : ''}`} onClick={() => coursesHandleClick("done")}>Пройденные курсы</button>

                    </div>
                    <hr className={styles.linia} />
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


export default observer(PersonalAccount)