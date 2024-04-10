import React, { useContext } from "react";
import styles from "../styles/createCourses.module.css"
import Header from "../components/Header";
import { observer } from "mobx-react-lite";
import Image from "../components/Image";
import createback from "../Images/createpageback.svg"
import Footer from "../components/Footer";
import { authRoutes } from "../routes";
import { Link } from "react-router-dom";
import { CHOOSE_COURSE } from "../utils";

function CreateCoursesBlock() {
    return (
        <>
            <div className={styles.header}>
                <Header />
            </div>
            <div className={styles.container}>
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
                        <Link to={CHOOSE_COURSE}>
                            <button className={styles.createbutton}>СОЗДАТЬ КУРС</button>
                        </Link>
                    </div>
                </div>
            </div>
            {/* <div className={styles.background1}>

            </div> */}
            <div className={styles.footer}>
                <Footer />
            </div>

        </>
    )
}

export default observer(CreateCoursesBlock)