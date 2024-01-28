import { observer } from "mobx-react-lite";
import React from "react";
import styles from '../styles/createCourses.module.css'
import { Link } from "react-router-dom";
import { COURSES_CONTENT } from "../utils";


function CreateCourse() {
    return (
        <>
            <div className={styles.mainInfo}>
                <div className={styles.titleOfCourse}>
                    <div>
                        <label htmlFor="img">Картинка</label>
                        <input id='img' type="file" />
                    </div>
                    <div>
                        <label htmlFor="name">Название</label>
                        <input id="name" type="text" />
                    </div>
                </div>
                <div className={styles.description}>
                    <div>
                        <label htmlFor="description">Описание</label>
                        <input id="description" type="text" />
                    </div>
                    <div>
                        <label htmlFor="content">Что будет в курсе?</label>
                        <input id="content" type="text" />
                    </div>
                    <div>
                        <label htmlFor="dificulty">Выберите уровень сложности</label>
                        <select id="dificulty" type="text">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>
                <div>
                    <Link to={COURSES_CONTENT}>
                        <button className={styles.nextButton}>

                            Далее

                        </button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default observer(CreateCourse) 