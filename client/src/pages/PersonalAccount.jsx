import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import styles from "../styles/personalAcc.module.css"
import Header from "../components/Header";
import { Context } from "..";
import Footer from "../components/Footer";
import { useParams, Navigate } from "react-router-dom";
import CoursesService from "../service/CoursesService";
import CoursesBlockProfile from "../components/CoursesBlockProfile";


function PersonalAccount() {
    const { store, courseStore } = useContext(Context)
    const params = useParams()
    const current = params.id
    const [showCourses, setShowCourses] = useState(localStorage.getItem('choosedCourse'))

    const showCourseHandler = (courseTag) => {
        localStorage.setItem('choosedCourse', courseTag)
        setShowCourses(courseTag)
    }

    return (
        <>
            <Header />
            {
                store.isAuth && current == store.user.id &&
                <div className={styles.container}>
                    <div className={styles.navmenu}>
                        <button onClick={() => showCourseHandler('active')} className={`${showCourses === 'active' ? styles.choosed : styles.bb}`}>активные</button>
                        <button onClick={() => showCourseHandler('done')} className={`${showCourses === 'done' ? styles.choosed : styles.bb}`}>пройденные</button>
                        <button onClick={() => showCourseHandler('favorite')} className={`${showCourses === 'favorite' ? styles.choosed : styles.bb}`}>избранные</button>
                        <button onClick={() => showCourseHandler('portfolio')} className={`${showCourses === 'portfolio' ? styles.choosed : styles.bb}`}>портфолио</button>
                        <button onClick={() => showCourseHandler('created')} className={`${showCourses === 'created' ? styles.choosed : styles.bb}`}>созданные</button>
                    </div>
                    <div className={styles.courses}>
                        <ShowCourses courseTag={showCourses} />
                    </div>
                </div >
            }
            <Footer />

        </>
    )
}

function ShowCourses({ courseTag }) {
    console.log(courseTag)
    const { store, courseStore } = useContext(Context)
    const [courses, setCourses] = useState([])
    useEffect(() => {
        if (courseTag === 'created') {
            getCourses()
        }
    }, [courseTag])

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
            <div className={styles.coursesList}>
                {
                    <CoursesBlockProfile courses={courses} />
                }
            </div>
        </>
    )
}

export default observer(PersonalAccount)