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
import { Link, useLocation } from "react-router-dom";
import EditLesson from "./EditLesson";
import { EDIT_LESSON, MODULE_PAGE, COURSES_CONTENT } from "../utils";


function ModulePage() {
    const { store, courseStore } = useContext(Context)
    const params = useParams()
    const current = params.id
    const [lessons, setLessons] = useState([])
    const [name, setName] = useState(courseStore.module.name)
    const [description, setDescription] = useState(courseStore.module.description)
    const [newLesson, setNewLesson] = useState(0)

    useEffect(() => {
        getModule()
    }, [newLesson])

    const [editTitle, setEditTilte] = useState(false)

    const editHandler = (e) => {
        setEditTilte(e === false ? true : false)
        if (e === true) {
            courseStore.saveModule(courseStore.module.id, name, description)
        }
    }
    // const removeInfo = (number) => {
    //     setModule(modulee.filter(i => (i.number !== number)))
    // }

    const addLesson = () => {
        setLessons([...lessons, []])
        setNewLesson(newLesson + 1)
        courseStore.createLesson(courseStore.module.id, courseStore.module.number)
    }

    async function getModule() {
        try {
            await courseStore.fetchCourseModule(current)
            setName(courseStore.module.name)
            setDescription(courseStore.module.description)

            const response = await CoursesService.fetchModuleLessons(current)
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
    return (
        <>
            <Header />
            {
                current == courseStore.module.id &&
                <div className={styles.container}>
                    <div className={styles.moduleContainer}>
                        <div className={styles.title}>
                            {
                                editTitle === true &&
                                <>
                                    <div>
                                        <input
                                            className={styles.logininput}
                                            type="text"
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder={name}
                                        />

                                    </div>
                                    <div>
                                        <input
                                            className={styles.logininput}
                                            type="text"
                                            onChange={(e) => setDescription(e.target.value)}
                                            placeholder={description}
                                        />
                                    </div>

                                </>
                            }

                            {
                                editTitle === false &&
                                <>
                                    <div>
                                        {name}
                                    </div>
                                    <div>
                                        {description}
                                    </div>
                                </>
                            }
                            <button onClick={() => editHandler(editTitle)}>
                                {
                                    editTitle === true &&
                                    <p>Сохрнаить</p>
                                }
                                {
                                    editTitle === false &&
                                    <p>Редактировать</p>
                                }
                            </button>
                        </div>
                        <div className={styles.createLesson}>
                            <button onClick={() => addLesson()}>Добавить урок</button>
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
                                                    <div>Модуль {courseStore.module.number} Урок {index + 1} </div>
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