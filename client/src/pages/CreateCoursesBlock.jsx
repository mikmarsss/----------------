import React, { useContext } from "react";
import styles from "../styles/createCourses.module.css"
import Header from "../components/Header";
import { observer } from "mobx-react-lite";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { FREE_COURSE } from "../utils";
import { Context } from "..";

function CreateCoursesBlock() {
    const { store, courseStore } = useContext(Context)
    const createCourse = () => {
        courseStore.createCourse(store.user.id)
    }
    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <Header />
                </div>
                <div className={styles.content}>
                    <div className={styles.zagolovok}>
                        <p>КАКОЙ ТО НЕВЕРОЯТНО КРАСИВЫЙ ТЕКСТ  ПРИЗЫВАЮЩИЙ РАЗМЕЩАТЬ КУРСЫ У НАС</p>
                    </div>
                    <div className={styles.opisanie}>
                        <p>
                            Равным образом, начало повседневной работы по формированию позиции предоставляет широкие возможности для системы массового участия.
                        </p>
                    </div>
                    <div >
                        <Link to={FREE_COURSE}>
                            <button onClick={createCourse} className={`${styles.createbutton} ${styles.glass2}`}>СОЗДАТЬ КУРС</button>
                        </Link>
                    </div>
                </div>
                <div className={styles.footer}>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default observer(CreateCoursesBlock)