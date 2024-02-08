import { observer } from "mobx-react-lite";
import styles from '../styles/coursesContent.module.css'
import React, { useContext, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { COURSE_LESSONS } from "../utils";
import { Context } from "..";

function CoursesContent() {

    const [modulee, setModule] = useState([])
    const { courseStore, store } = useContext(Context)

    const changeInfo = (key, value, number, keyIndex, index) => {
        setModule(modulee.map(i => (i.number === number ? { ...i, [key]: value, [keyIndex]: index } : i)))

    }

    const removeInfo = (number) => {
        setModule(modulee.filter(i => (i.number !== number)))
    }

    const addModule = () => {
        setModule([...modulee, { title: '', number: Date.now(), index: '' }])
        //courseStore.createModule(courseStore.course.id)
        console.log(courseStore.course.id)
        console.log(store.user.id)
    }


    console.log(courseStore.course.id)
    return (
        <>
            <Header />
            <div className={styles.container}>

                <div className={styles.contentOfLesson}>
                    <button onClick={addModule}>Добавить модуль</button>
                    {
                        modulee.map((i, index) => (
                            <div key={i.number}>

                                <div>Модуль</div>
                                <label htmlFor="moduleName">Введите название модуля</label>
                                <input type="text"
                                    id="moduleName"
                                    value={i.title}
                                    onChange={(e) => changeInfo('title', e.target.value, i.number, 'index', index)}
                                />
                                <button onClick={() => removeInfo(i.number)}>Удалить</button>
                            </div>
                        ))
                    }

                    <Link to={COURSE_LESSONS}>
                        <button>
                            Редактикровать модуль
                        </button>
                    </Link>
                </div>

            </div>

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