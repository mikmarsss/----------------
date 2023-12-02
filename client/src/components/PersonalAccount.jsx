import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import styles from "../styles/personalAcc.module.css"
import Header from "./Header";
import Image from "./Image";
import { Context } from "..";
import { courses } from "../data/coursesData"
import courseicon from '../Images/courseicon.svg'
import Footer from "./Footer";
import VhodForm from "./VhodForm";
import CourseBlock from "./CourseBlock";
import bq from "../Images/questionmark.svg"

function PersonalAccount() {
    const { store } = useContext(Context)
    const [redButton, setRedButton] = useState("confirm")
    const [showVhodBlock, setShowVhodBlock] = useState(null)
    const [switchCourses, setSwitchCourses] = useState("active")
    const handleClick = (redButton) => {
        const shown = redButton === "confirm" ? "red" : "confirm"
        setRedButton(shown)
    }
    const vhodHandleClick = (showVhodBlock) => {
        setShowVhodBlock(showVhodBlock);
    }

    const coursesBlocks = courses.map((item) => (
        <CourseBlock
            tag={item.tag}
            id={item.id}
            name={item.name}
            description={item.description}
            cost={item.cost}
            img={item.img}
            author={item.author}
        />
    ))
    const coursesHandleClick = (switchCourses) => {
        setSwitchCourses(switchCourses)
    }
    return (
        <>
            <div className={`${(showVhodBlock === "show") ? styles.showVhod : styles.non}`}>
                <VhodForm showVhodBlock={showVhodBlock} onShowVhodBlock={vhodHandleClick} />
            </div>
            <Header />
            <div className={`${store.isAuth ? styles.container : styles.non}`}>
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
                    <div className={styles.butbar}>
                        <div className={styles.coursbuttons}>
                            <button className={`${switchCourses === "active" ? styles.underlinedecor : ''}`} onClick={() => coursesHandleClick("active")}>Активные курсы</button>
                            <button className={`${switchCourses === "done" ? styles.underlinedecor : ''}`} onClick={() => coursesHandleClick("done")}>Пройденные курсы</button>

                        </div>
                        <hr className={styles.linia} />
                    </div>
                    <div className={styles.coursescont}>
                        <div className={switchCourses === "active" ? `${styles.activecourses}` : `${styles.non}`}>
                            {coursesBlocks}
                        </div>
                        <div className={switchCourses === "active" ? `${styles.donecourses}` : `${styles.non}`}>

                        </div>
                    </div>
                </div>
                <Footer />
            </div>
            <div className={`${!store.isAuth ? styles.unauth : styles.non}`}>
                <div className={styles.qm}>
                    <Image image={bq} alt="?" />
                </div>
                <div className={styles.qm1}>
                    <Image image={bq} alt="?" />
                </div>
                <div className={styles.qm2}>
                    <Image image={bq} alt="?" />
                </div>
                <div className={styles.qm3}>
                    <Image image={bq} alt="?" />
                </div>
                <div className={styles.qm4}>
                    <Image image={bq} alt="?" />
                </div>
                <p>ПОХОЖЕ ВЫ НЕ АВТОРИЗОВАНЫ</p>
                <button onClick={() => vhodHandleClick("show")}>ВОЙТИ</button>
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