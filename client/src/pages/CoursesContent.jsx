import { observer } from "mobx-react-lite";
import styles from '../styles/coursesContent.module.css'
import React, { useContext, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { COURSE_LESSONS } from "../utils";
import { Context } from "..";
import { useParams } from "react-router-dom";
import CoursesService from "../service/CoursesService";
import { useEffect } from "react";

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
    return (
        <>
            <Header />
            {
                current == courseStore.course.id &&
                <div className={styles.container}>
                    <div className={styles.contentOfLesson}>
                        <button onClick={() => addModule(moduleIndex)}>Добавить модуль</button>
                        {
                            modulee.map((i, index) => (
                                <div key={index}>
                                    <label htmlFor="moduleName">Модуль {index}</label>
                                    <Link to={COURSE_LESSONS}>
                                        <button>
                                            Редактикровать модуль
                                        </button>
                                    </Link>

                                </div>
                            ))
                        }


                    </div>
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