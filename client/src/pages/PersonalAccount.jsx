import React, { useContext, useEffect, useState } from "react";
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
import CoursesService from "../service/CoursesService";
import CoursesBlockProfile from "../components/CoursesBlockProfile";


function PersonalAccount() {
    const { store, courseStore } = useContext(Context)
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
    }



    const vhodHandleClick = (showVhodBlock) => {
        setShowVhodBlock(showVhodBlock);
    }

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

                            {<ShowCourses onShowCourses={showCourses} />}

                        </div>
                    </div>
                </div>
                <div className={styles.footer}>
                    <Footer />
                </div>
            </div>
        </>
    )
}

function NavMenu({ name, id, onHandleClick, show, url }) {
    const handleClick = (url) => {
        onHandleClick(url)
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

function ShowCourses({ onShowCourses }) {
    const { store, courseStore } = useContext(Context)
    const [courses, setCourses] = useState([])
    useEffect(() => {
        if (onShowCourses === 'mycourses') {
            getCourses()
        }
    }, [onShowCourses])

    async function getCourses() {
        try {
            const response = await CoursesService.fetchUserCourses(store.user.id)
            const dataArray = response.data.courses; // Предполагается, что courses - это массив в модели
            if (Array.isArray(dataArray)) {
                setCourses(dataArray);
            } else {
                console.error('Ожидался массив, но получен другой тип данных:', dataArray);
                setCourses([]); // Установка пустого массива в случае ошибки
            }
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <>
            <CoursesBlockProfile courses={courses} />

        </>
    )
}



export default observer(PersonalAccount)