import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import styles from '../styles/coursesblockprofile.module.css'
import { Context } from "..";
import { Link, useNavigate } from "react-router-dom";
import { COURSES_CONTENT, COURSE_MANAGMENT, COURSE_PAGE, MODULE_PAGE } from "../utils";

function CourseBlockProfile({ courses }) {
    const { store, courseStore } = useContext(Context)
    const navigate = useNavigate()

    const editCourseHandler = (id) => {
        const courseId = JSON.stringify(id)
        courseStore.fetchUserCourse(courseId)
        navigate(COURSE_PAGE + `/${id}`)
    }

    const manageCourseHandler = (id) => {
        const courseId = JSON.stringify(id)
        courseStore.fetchUserCourse(courseId)
        navigate(COURSE_MANAGMENT + `/${id}`)
    }

    return (
        <>
            <p className={styles.zagolovok}>Мои курсы</p>
            <div className={styles.container}>
                {
                    courses.map((item, index) => (
                        <div className={styles.Mycourse} key={index}>
                            <div>
                                <div className={styles.courseblock}>
                                    <div className={styles.info}>
                                        <h1 className={styles.status}>{item.status === 'notpublished' ? 'Неопубликован' : 'Опубликован'}</h1>
                                        <h1 className={styles.name}>{item.name}</h1>
                                        <p className={styles.opisanie}>{item.description}</p>
                                    </div>
                                    <div className={styles.buttons}>
                                        <button onClick={() => editCourseHandler(item.id)}>Редактирование</button>
                                        <button onClick={() => manageCourseHandler(item.id)}>Управление</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default observer(CourseBlockProfile)