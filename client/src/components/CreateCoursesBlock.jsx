import React from "react";
import styles from "../styles/createCourses.module.css"
import Header from "./Header";
import { observer } from "mobx-react-lite";
import Image from "./Image";
import createback from "../Images/createpageback.svg"
import Footer from "./Footer";

function CreateCoursesBlock() {
    return (
        <>
            <div className={styles.header}>
                <Header />
            </div>
            <div className={styles.container}>
                <div className={styles.zagolovok}>
                    <p>КАКОЙ ТО НЕВЕРОЯТНО<br /> КРАСИВЫЙ ТЕКСТ  ПРИЗЫВАЮЩИЙ<br /> РАЗМЕЩАТЬ КУРСЫ У НАС</p>
                </div>
                <div className={styles.opisanie}>
                    <p>
                        Равным образом, начало повседневной работы по формированию<br /> позиции предоставляет широкие возможности <br />для системы массового участия.
                    </p>
                </div>
                <div >
                    <button className={styles.createbutton}>СОЗДАТЬ КУРС</button>
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