import { observer } from "mobx-react-lite";
import styles from '../styles/coursesContent.module.css'
import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { COURSE_LESSONS } from "../utils";

function CoursesContent() {

    const [modulee, setModule] = useState([])
    const [nomerModule, setNomerModule] = useState('1')

    const addModule = () => {
        setModule([...modulee, { title: '' }])
    }

    const showModel = (index) => {
        setNomerModule(index)
    }

    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.newLesson}>
                    <div>
                        <button onClick={addModule}>Добавить модуль</button>
                    </div>
                    {
                        modulee.map((item, index) => (<CreateModule index={index} showModelCB={showModel} />))
                    }
                </div>
                <div className={styles.contentOfLesson}>
                    <Module index={nomerModule} />
                </div>

            </div>

            <Footer />
        </>
    )
}


function CreateModule({ index, showModelCB }) {
    const showModel = () => {
        showModelCB(index)
    }
    return (
        <>
            <button onClick={showModel}>
                <div>Модуль {index + 1}</div>
            </button>
        </>
    )
}

function Module({ index }) {


    return (
        <>
            <div>
                Модуль {index + 1}
            </div>
            <label htmlFor="moduleName">Введите название модуля</label>
            <input type="text" id="moduleName" />
            <Link to={COURSE_LESSONS}>
                <button>
                    Редактикровать модуль
                </button>
            </Link>
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