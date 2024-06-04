import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "..";
import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../styles/modulePage.module.css"
import CoursesService from "../service/CoursesService";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { EDIT_LESSON, MODULE_PAGE, COURSES_CONTENT, EDITCOURSE_PAGE } from "../utils";
import arrow from '../Images/Arrow.svg'

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

    const deleteLesson = (number) => {
        const lessonId = lessons[number - 1].id
        setLessons(lessons.filter(i => (i.number !== number)))
        courseStore.deleteLesson(lessonId)

    }

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
    const navigate = useNavigate()

    const navigateHandler = (path) => {
        if (path === 'course') {
            navigate(EDITCOURSE_PAGE + `/${courseStore.course.id}`)
        }
        if (path === 'modules') {
            navigate(COURSES_CONTENT + `/${courseStore.course.id}`)
        }
    }
    return (
        <>
            <div className={styles.container}>
                <div>
                    <Header />
                </div>
                {
                    current == courseStore.module.id &&
                    <div className={styles.content}>
                        <div className={styles.moduleContainer}>
                            <div className={`${styles.title} ${styles.glass}`}>
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
                                            <textarea
                                                className={styles.contentInput}
                                                type="text"
                                                id="content"
                                                onChange={(e) => setDescription(e.target.value)}
                                                value={description}
                                                maxLength={500}
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
                                        <div className={styles.moduledescription}>
                                            <p>{description}</p>

                                        </div>
                                    </>
                                }
                                <button onClick={() => editHandler(editTitle)}>
                                    {
                                        editTitle === true &&
                                        <p>Сохранить</p>
                                    }
                                    {
                                        editTitle === false &&
                                        <p>Редактировать</p>
                                    }
                                </button>
                            </div>
                            {
                                lessons.length === 0 &&
                                <>
                                    <div className={styles.netmodulei}>
                                        <h1>У вас нет уроков в этом модуле</h1>
                                        <p>Чтобы добавить новый урок в этот модуль нажмите на кнопочку</p>
                                    </div>
                                </>
                            }

                            <div className={`${styles.lessons} ${styles.glass}`}>
                                <div>
                                    <button className={styles.addModule} onClick={() => addLesson()}>Добавить урок</button>
                                </div>
                                {
                                    lessons.length !== 0 &&
                                    lessons.map((item, index) => (
                                        <>
                                            <div key={index}>
                                                <div className={styles.lesson}>
                                                    <div className={styles.numberModule}>
                                                        {item.number}
                                                    </div>
                                                    <div className={styles.lessonInfo}>
                                                        {item.name}
                                                    </div>
                                                    <Link to={COURSES_CONTENT + `/${courseStore.course.id}` + MODULE_PAGE + `/${courseStore.module.id}` + EDIT_LESSON + `/${item.id}`}>
                                                        <div className={styles.redbutton}>
                                                            <button>
                                                                <img src={arrow} alt="" />
                                                            </button>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </>
                                    ))
                                }
                                {
                                    lessons.length !== 0 &&
                                    <div>
                                        <button className={styles.addModule} onClick={() => deleteLesson(lessons.length)}>Удалить урок</button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                }
                <div>
                    <Footer />
                </div>
            </div>

        </>
    )
}

export default observer(ModulePage)