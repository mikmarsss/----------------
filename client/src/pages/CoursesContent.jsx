import { observer } from "mobx-react-lite";
import styles from '../styles/coursesContent.module.css'
import React, { useContext, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { COURSES_CONTENT, COURSE_LESSONS, MODULE_PAGE } from "../utils";
import { Context } from "..";
import { useParams } from "react-router-dom";
import CoursesService from "../service/CoursesService";
import { useEffect } from "react";

function CoursesContent() {

    const [modulee, setModule] = useState([])
    const { courseStore, store } = useContext(Context)
    const [newModule, setNewModule] = useState(0)

    const deleteModule = (number) => {
        const moduleId = modulee[number - 1].id
        setModule(modulee.filter(i => (i.number !== number)))
        courseStore.deleteModule(moduleId)
        console.log(number)

    }

    async function addModule() {
        setModule([...modulee, []])
        await courseStore.createModule(courseStore.course.id)
        setNewModule(newModule + 1)
    }
    const choseModel = (id) => {
        localStorage.setItem('moduleId', id)
        courseStore.fetchCourseModule(id)
    }
    useEffect(() => {
        getModules()
    }, [newModule])

    async function getModules() {
        try {
            const response = await CoursesService.fetchCourseModules(courseStore.course.id)
            const dataArray = response.data.modules; // Предполагается, что courses - это массив в модели
            if (Array.isArray(dataArray)) {
                setModule(dataArray);

            } else {
                console.error('Ожидался массив, но получен другой тип данных:', dataArray);
                setModule([]); // Установка пустого массива в случае ошибки
            }
        } catch (e) {
            console.log(e)
        }
    }
    console.log(modulee)
    const params = useParams()
    const current = params.id

    return (
        <>
            <Header />
            {
                current == courseStore.course.id &&
                <div className={styles.container}>
                    {
                        modulee.length === 0 &&
                        <>
                            <div className={styles.netmodulei}>
                                <h1>У вас нет модулей в этом курсе</h1>
                                <p>Чтобы добавить новый модуль в этом курсе нажмите на кнопочку</p>
                            </div>
                        </>
                    }
                    <div className={styles.contentOfLesson}>
                        <button className={styles.addModule} onClick={() => addModule()}>Добавить модуль</button>
                        {
                            <>
                                {
                                    modulee.map((item, index) => (
                                        <div key={index} className={styles.module}>
                                            <div className={styles.numberModule}>
                                                {item.number}
                                            </div>
                                            <div className={styles.aboutModule}>
                                                <div className={styles.nameModule}>
                                                    {item.name}
                                                </div>
                                                <Link to={COURSES_CONTENT + `/${courseStore.course.id}` + MODULE_PAGE + `/${item.id}`} >
                                                    <button onClick={() => choseModel(item.id)}>
                                                        Редактикровать модуль
                                                    </button>
                                                </Link>

                                            </div>
                                        </div>
                                    ))
                                }
                                {
                                    modulee.length !== 0 &&
                                    <div>
                                        <button className={styles.deleteButton} onClick={() => deleteModule(modulee.length)}>Удалить модуль</button>
                                    </div>
                                }
                            </>
                        }


                    </div>

                </div>
            }

            <Footer />
        </>
    )
}

const Module = observer(({ modulee }) => {
    const { courseStore, store } = useContext(Context)

    const choseModel = (id) => {
        localStorage.setItem('moduleId', id)
        courseStore.fetchCourseModule(id)
    }
    return (
        <>
            {
                modulee.map((item, index) => (
                    <div key={index} className={styles.module}>
                        <div className={styles.numberModule}>
                            {item.number}
                        </div>
                        <div className={styles.aboutModule}>
                            <div className={styles.nameModule}>
                                {item.name}
                            </div>
                            <Link to={COURSES_CONTENT + `/${courseStore.course.id}` + MODULE_PAGE + `/${item.id}`}>
                                <button onClick={() => choseModel(item.id)}>
                                    Редактикровать модуль
                                </button>
                            </Link>

                        </div>
                    </div>
                ))
            }

        </>
    )
})

export default observer(CoursesContent)