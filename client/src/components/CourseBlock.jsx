import React from "react";
import styles from "../styles/courseBlock.module.css"
import { observer } from "mobx-react-lite";
import Image from "./Image";
import courseicon from "../Images/courseicon.svg"

function CourseBlock({ id, tag, name, description, cost, img, author }) {
    return (
        <>
            <div className={styles.coursesblock}>
                <div className={styles.courselogo}>
                    <Image image={courseicon} alt="fd" />
                </div>
                <div className={styles.coursename}>
                    <button>
                        {name}
                    </button>
                </div>
                <div className={styles.courseauthor}>
                    {author}
                </div>
                <div className={styles.coursecost}>
                    {cost} руб
                </div>
            </div>
        </>
    )
}

export default observer(CourseBlock)