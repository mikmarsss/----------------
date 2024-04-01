import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import styles from '../styles/coursesblockprofile.module.css'
import { Context } from "..";
import { Link, useNavigate } from "react-router-dom";
import { COURSES_CONTENT, COURSE_PAGE, MODULE_PAGE } from "../utils";

function CourseBlockProfile({ courses }) {
    const { store, courseStore } = useContext(Context)
    const navigate = useNavigate()
    const chooseCourse = (id) => {

        const courseId = JSON.stringify(id)
        courseStore.fetchUserCourse(courseId)
        navigate(COURSE_PAGE + `/${id}`)
    }
    return (
        <>

            {courses.map((item, index) => (
                <div className={styles.Mycourse} key={index}>
                    <div>
                        <div className={styles.courseblock}>
                            <div className={styles.info}>
                                <h1>{item.name}</h1>
                                <p>{item.description}</p>
                                <p>{item.price}</p>
                            </div>
                            <div className={styles.buttons}>
                                <button onClick={() => chooseCourse(item.id)}>Редактирование</button>
                                <button>Управление</button>
                            </div>
                        </div>

                    </div>
                </div>
            ))}
        </>
    )
}

export default observer(CourseBlockProfile)