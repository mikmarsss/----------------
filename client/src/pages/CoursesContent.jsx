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
import ModulePage from "./ModulePage";
function CoursesContent() {

    const [moduleIndex, setModuleIndex] = useState(0)
    const [modulee, setModule] = useState([])
    const { courseStore, store } = useContext(Context)

    const removeInfo = (number) => {
        setModule(modulee.filter(i => (i.number !== number)))
    }

    const addModule = (moduleIndex) => {
        setModule([...modulee, []])
        setModuleIndex(prevCount => prevCount + 1)
        courseStore.createModule(courseStore.course.id, moduleIndex)
        console.log(courseStore.course.id, moduleIndex)
    }
    useEffect(() => {
        getModules()
    }, [])
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
    const choseModel = (id) => {
        localStorage.setItem('moduleId', id)
        courseStore.fetchCourseModule(id)
    }
    return (
        <>
            <Header />
            {
                current == courseStore.course.id &&
                <div className={styles.container}>
                    <div className={styles.contentOfLesson}>
                        <button onClick={() => addModule(moduleIndex)}>Добавить модуль</button>
                        {
                            modulee.map((item, index) => (
                                <div key={index} className={styles.module}>
                                    <label htmlFor="moduleName">Модуль {index + 1}</label>
                                    <Link to={COURSES_CONTENT + `/${courseStore.course.id}` + MODULE_PAGE + `/${item.id}`}>
                                        <button onClick={() => choseModel(item.id)}>
                                            Редактикровать модуль
                                        </button>
                                    </Link>

                                </div>
                            ))
                        }


                    </div>
                    {
                        modulee.length === 0 &&
                        <>
                            <div>
                                <h1>У вас нет уроков в этом модуле</h1>
                            </div>
                        </>
                    }
                </div>
            }


            <Footer />
        </>
    )
}

function CreateLesson() {
    return (
        <>
        </>
    )
}


export default observer(CoursesContent)