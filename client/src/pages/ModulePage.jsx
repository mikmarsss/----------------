import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "..";
import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import styles from "../styles/modulePage.module.css"
import CoursesService from "../service/CoursesService";
import { useState } from "react";
import { Link } from "react-router-dom";
import EditLesson from "./EditLesson";
import { EDIT_LESSON, MODULE_PAGE, COURSES_CONTENT } from "../utils";

function ModulePage() {
    const { store, courseStore } = useContext(Context)
    const params = useParams()
    const current = params.id
    const [lessons, setLessons] = useState([])
    const [lessonIndex, setLessonIndex] = useState(1)

    useEffect(() => {
        getModule()
    }, [])

    // const removeInfo = (number) => {
    //     setModule(modulee.filter(i => (i.number !== number)))
    // }

    const addLesson = (lessonIndex) => {
        setLessons([...lessons, []])
        setLessonIndex(prevCount => prevCount + 1)
        courseStore.createLesson(courseStore.module.id, lessonIndex)
        console.log(courseStore.module.id, lessonIndex)
    }

    async function getModule() {
        try {
            let moduleId = localStorage.getItem('moduleId')
            await courseStore.fetchCourseModule(moduleId)
            const response = await CoursesService.fetchModuleLessons(courseStore.module.id)
            const dataArray = response.data.lessons;
            if (Array.isArray(dataArray)) {
                setLessons(dataArray);
            } else {
                console.error('Ожидался массив, но получен другой тип данных:', dataArray);
                setLessons([]); // Установка пустого массива в случае ошибки
            }
        } catch (e) {
            console.log(e)
        }
    }
    console.log(lessons)
    return (
        <>
            <Header />
            {
                current == courseStore.module.id &&
                <div className={styles.container}>
                    <div className={styles.moduleContainer}>
                        <div className={styles.title}>
                            <div>
                                {courseStore.module.name}
                            </div>
                            <div>
                                {courseStore.module.description}
                            </div>
                        </div>
                        <div className={styles.createLesson}>
                            <button onClick={() => addLesson(lessonIndex)}>Добавить урок</button>
                        </div>
                        <div className={styles.lessons}>
                            {
                                lessons.length !== 0 &&
                                lessons.map((item, index) => (
                                    <>
                                        <div key={index}>
                                            <div className={styles.lesson}>
                                                <div className={styles.imgLesson}>
                                                    <img className={styles.ava} src={`http://localhost:5000/${item.img}`} alt="" />
                                                </div>
                                                <div className={styles.lessonInfo}>
                                                    <div>Модуль {courseStore.module.number + 1} Урок {index + 1} </div>
                                                    {item.name}
                                                </div>
                                                <Link to={COURSES_CONTENT + `/${courseStore.course.id}` + MODULE_PAGE + `/${courseStore.module.id}` + EDIT_LESSON + `/${item.id}`}>
                                                    <div className={styles.redbutton}>
                                                        <button>редактировать</button>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </>
                                ))
                            }
                            {
                                lessons.length === 0 &&
                                <>
                                    <div>
                                        <h1>У вас нет уроков в этом модуле</h1>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </div>
            }
            <Footer />
        </>
    )
}

export default observer(ModulePage)