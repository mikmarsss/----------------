import React from "react";
import styles from "../styles/courseBlock.module.css"
import { observer } from "mobx-react-lite";
import Image from "./Image";
import courseicon from "../Images/courseicon.svg"
import star from "../Images/star.svg"
import peoplecount from "../Images/peoplecount.svg"
import timeim from "../Images/time.svg"





function CourseBlock({ id, tag, name, description, cost, img, author, point, time, buyer }) {
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
                <hr className={styles.linia} />
                <div className={styles.properties}>
                    <div>
                        <Image image={star} alt="star" />
                        {point}
                    </div>
                    <div>
                        <Image image={peoplecount} alt="star" />
                        {buyer}
                    </div>
                    <div>
                        <Image image={timeim} alt="star" />
                        {time}
                    </div>
                </div>
            </div>
        </>
    )
}

export default observer(CourseBlock)