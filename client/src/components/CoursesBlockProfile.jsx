import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import styles from '../styles/coursesblockprofile.module.css'
import { Context } from "..";
import { Link } from "react-router-dom";
import { COURSES_CONTENT, COURSE_PAGE, MODULE_PAGE } from "../utils";

function CourseBlockProfile({ courses }) {
    const { store, courseStore } = useContext(Context)

    const chooseCourse = (id) => {

        const courseId = JSON.stringify(id)
        courseStore.fetchUserCourse(courseId)
    }
    return (
        <>

            {courses.map((item, index) => (
                <Link to={COURSE_PAGE + `/${item.id}`}>

                    <div className={styles.Mycourse} key={index}>
                        {/* 
                    <div className={styles.imgfield}>
                        <img className={styles.ava} src={"http://localhost:5000/" + item.img} alt="" />
                    </div> */}
                        <button onClick={() => chooseCourse(item.id)}>
                            <div>

                                <div className={styles.info}>
                                    <h1>{item.name}</h1>
                                    <p>{item.description}</p>
                                    <p>{item.price}</p>
                                </div>
                            </div>

                        </button>
                    </div>
                </Link >
            ))}
        </>
    )
}

export default observer(CourseBlockProfile)