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
import { useParams } from "react-router-dom";
import { inProfileMenu } from "../data/coursesData";

function PersonalAccount() {
    const { store } = useContext(Context)
    const params = useParams()
    const current = params.id
    const [showVhodBlock, setShowVhodBlock] = useState(null)
    const [show, setShow] = useState('courses')
    const handleClick = (show) => {
        setShow(show)
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

    return (
        <>
            <div className={`${(showVhodBlock === "show") ? styles.showVhod : styles.non}`}>
                <VhodForm showVhodBlock={showVhodBlock} onShowVhodBlock={vhodHandleClick} />
            </div>
            <Header />
            <div className={`${store.isAuth && current == store.user.id ? styles.container : styles.non}`}>
                <div className={styles.coursesProfile}>
                    <div className={styles.proffileBlockButtons}>
                        <button onClick={() => handleClick('courses')}>
                            <div className={`${show === 'courses' ? styles.buttonClicked : styles.coursesNavButt}`}>
                                курсы
                            </div>
                        </button>
                        <button onClick={() => handleClick('work')}>
                            <div className={`${show === 'work' ? styles.buttonClicked : styles.coursesNavButt}`}>
                                работа
                            </div>
                        </button>
                    </div>

                    <div className={styles.courses}>

                        <div className={styles.coursescont}>

                        </div>
                    </div>
                </div>
                <div className={styles.footer}>
                    <Footer />
                </div>
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



export default observer(PersonalAccount)