import React, { useState } from "react";
import Header from "../components/Landing";
import styles from '../styles/landing.module.css'
import Footer from "../components/Footer";
import CatalogPage from "./CatalogPage";
import CreateCoursesBlock from "../components/CreateCoursesBlock";
import WorkBlock from "../components/WorkBlock";

export default function LandingPage() {
    const [selectedFunc, setselectedFun] = useState("landingpage");


    const getContent = (selectedFunc) => {
        switch (selectedFunc) {
            case "landingpage":
                return (
                    <LandingBlock
                        catalogpage={"catalogage"}
                        onSelectedFunc={setselectedFun} />
                );
            case "catalogpage":
                return (
                    <CatalogPage />
                );
            case "CreateCoursesBlock":
                return (
                    <CreateCoursesBlock />
                )
            case "workBlock":
                return (
                    <WorkBlock />
                )
            default:
                return selectedFunc;
        }
    }

    return (
        <>
            <Header selectedFunc={selectedFunc} onSelectedFunc={setselectedFun} />
            {getContent(selectedFunc)}
            <Footer />
        </>
    )
}

function LandingBlock({ catalogpage, onSelectedFunc }) {
    return (
        <>
            <div>

                <h1 className={styles.offer}>Что мы предлагаем?</h1>
                <div className={styles.opportunities}>

                    <div className={styles.courses}>
                        <button className={styles.learn} onClick={() => onSelectedFunc("catalogpage")}>
                            <h1>Учиться</h1>
                        </button>
                        <button className={styles.teach} onClick={() => onSelectedFunc("CreateCoursesBlock")}>
                            <h1>Преподавать</h1>
                        </button>
                    </div>
                    <div className={styles.work}>
                        <button className={styles.work1} onClick={() => onSelectedFunc("workBlock")} >
                            <h1>Работать</h1>
                        </button>
                    </div>
                </div>
                <div className={styles.aboutUs} >
                    <h2>
                        Почему именно мы?
                    </h2>
                    <div >
                        <div className={styles.pointers}>
                            <h1>01</h1>
                            <p className={styles.description}>Предварительные выводы неутешительны: убеждённость некоторых оп</p>
                        </div>
                        <div className={styles.pointers}>
                            <h1>02</h1>
                            <p className={styles.description}>Предварительные выводы неутешительны: убеждённость некоторых оп</p>
                        </div>
                        <div className={styles.pointers}>
                            <h1>03</h1>
                            <p className={styles.description}>Предварительные выводы неутешительны: убеждённость некоторых оп</p>
                        </div>
                    </div>
                </div>
                <div className={styles.joinUs}>
                    <h2>
                        Уже не терпится попробовать?
                    </h2>
                    <p>Присоединяйся к нам и получи первый курс в подарок!</p>
                    <button> присоедениться</button>
                </div>
            </div>
        </>
    )
}