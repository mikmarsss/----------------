import React, { useContext, useEffect, useState } from "react";
import styles from '../styles/editLesson.module.css'
import { observer } from "mobx-react-lite";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Context } from "..";
import { useParams } from "react-router-dom";


function EditLesson() {
    const { store, courseStore } = useContext(Context)
    const params = useParams()
    const current = params.id
    const [name, setName] = useState(courseStore.lesson.name)
    const [content, setContent] = useState(courseStore.lesson.content)
    const [ava, setAva] = useState([])

    useEffect(() => {
        getLesson()
    }, [])

    async function getLesson() {
        try {
            await courseStore.fetchLesson(current)

        } catch (e) {
            console.log(e)
        }
    }
    const selectAva = (e) => {
        setAva(e.target.files[0])
    }

    const saveData = () => {
        const formdata = new FormData()
        formdata.append('lessonId', courseStore.lesson.id)
        formdata.append('name', name)
        formdata.append('content', content)
        formdata.append('img', ava)
    }

    return (
        <>
            <Header />
            {
                current == courseStore.lesson.id &&
                <>
                    <div className={styles.container}>
                        <div className={styles.moduleName}>
                            {courseStore.module.name}
                        </div>
                        <div className={styles.lessoncontainer}>
                            <div className={styles.title}>
                                <div className={styles.lessonName}>
                                    <input
                                        className={styles.logininput}
                                        type="text"
                                        placeholder={courseStore.lesson.name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className={styles.body}>

                            </div>
                            <button onClick={saveData}>Сохранить</button>

                        </div>
                    </div>
                </>
            }
            <Footer />
        </>
    )
}

export default observer(EditLesson)