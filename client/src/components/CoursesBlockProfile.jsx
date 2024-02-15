import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import styles from '../styles/coursesblockprofile.module.css'
import { Context } from "..";
import { Link } from "react-router-dom";
import { COURSES_CONTENT } from "../utils";

function CourseBlockProfile({ courses }) {
    const { store, courseStore } = useContext(Context)

    const chooseCourse = (id) => {
        const courseId = JSON.stringify(id)

        courseStore.fetchUserCourse(courseId)
    }
    return (
        <>
            {courses.map((item, index) => (
                <div className={styles.Mycourse} key={index}>
                    <Link to={COURSES_CONTENT + `/${item.id}`}>
                        <button onClick={() => chooseCourse(item.id)}>
                            <div>
                                <img className={styles.ava} src={"http://localhost:5000/" + item.img} alt="" />
                                <h1>{item.name}</h1>
                                <p>{item.description}</p>
                                <p>{item.price}</p>

                            </div>

                        </button>
                    </Link>
                </div>
            ))}
        </>
    )
}

export default observer(CourseBlockProfile)