import React from "react";
import styles from '../styles/coursesBlock.module.css'
import { courses } from "../data/coursesData";

export default function CoursesBlock() {
    const [coursesList] = courses

    return (
        <>
            <div className={styles.coursesBlock}>
                <div>
                    <CoursesInfo
                        content={coursesList}
                    />
                </div>
            </div>
        </>
    )
}

function CoursesInfo({ content }) {
    const { id, tag, name, description, cost } = content
    return (
        <>
            <div>
                <p>{name}</p>
                <p>{description}</p>
            </div>
        </>
    )
}