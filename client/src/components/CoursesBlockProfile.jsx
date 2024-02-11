import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import styles from '../styles/coursesblockprofile.module.css'
import { Context } from "..";



function CourseBlockProfile({ courses }) {
    const { store, courseStore } = useContext(Context)
    return (
        <>
            {courses.map((item, index) => (
                <div className={styles.Mycourse} key={index}>
                    <div>
                        <img className={styles.ava} src={"http://localhost:5000/" + item.img} alt="" />
                        <h1>{item.name}</h1>
                        <p>{item.description}</p>
                        <p>{item.price}</p>

                    </div>

                </div>
            ))}
        </>
    )
}

export default observer(CourseBlockProfile)