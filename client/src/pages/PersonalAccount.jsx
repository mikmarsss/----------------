import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import styles from "../styles/personalAcc.module.css"
import Header from "../components/Header";
import Image from "../components/Image";
import { Context } from "..";
import { courses } from "../data/coursesData"
import Footer from "../components/Footer";
import VhodForm from "../components/VhodForm";
import CourseBlock from "../components/CourseBlock";
import bq from "../Images/questionmark.svg"
import { useParams, Navigate } from "react-router-dom";
import { inProfileMenu } from "../data/coursesData";
import { CATALOG_ROUTE } from "../utils";

function PersonalAccount() {
    const { store } = useContext(Context)
    const params = useParams()
    const current = params.id
    const [showVhodBlock, setShowVhodBlock] = useState(null)
    const [show, setShow] = useState('courses')
    const [showCourses, setShowCourses] = useState('active')
    const handleClick = (show) => {
        setShow(show)
    }

    const coursesHandleClick = (show) => {
        setShowCourses(show)

        console.log(showCourses)
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

    const navMenuWork = 'ok'

    const navMenuCourses = inProfileMenu.map((item) => (<NavMenu id={item.id} url={item.url} name={item.name} onHandleClick={coursesHandleClick} show={showCourses} />))
    return (
        <>
            {
                !store.isAuth &&
                <Navigate to={CATALOG_ROUTE} />
            }
            <div className={`${(showVhodBlock === "show") ? styles.showVhod : styles.non}`}>
                <VhodForm showVhodBlock={showVhodBlock} onShowVhodBlock={vhodHandleClick} />
            </div>
            <Header />
            <div className={`${store.isAuth && current == store.user.id ? styles.container : styles.non}`}>
                <div className={styles.coursesProfile}>
                    <div className={styles.proffileBlockButtons}>
                        <div className={styles.firstNavButtons}>
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
                        <div className={styles.dopFilter}>

                            {show === 'courses' ? navMenuCourses : navMenuWork}
                        </div>
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

function NavMenu({ name, id, onHandleClick, show, url }) {
    const handleClick = (url) => {
        onHandleClick(url)
        console.log({ url })
    }
    return (
        <>
            <button onClick={() => handleClick(url)}>
                <div className={`${show === url ? styles.dopFilterButtonsActive : styles.dopFilterButtons}`}>
                    {name}
                </div>
            </button>
        </>
    )
}



export default observer(PersonalAccount)