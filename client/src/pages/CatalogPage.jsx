import React from "react";
import styles from '../styles/catalog.module.css'
import { tags } from "../data/coursesData";
import CoursesBlock from "../components/CoursesBlock";

export default function CatalogPage() {
    const tagsList = tags.map((item) => (
        <Tags
            id={item.id}
            tag={item.tag}
            name={item.name}
        />
    ))
    return (
        <>
            <div className={styles.container}>
                <div className={styles.catalog}>
                    <div className={styles.search}>
                        <p>Поиск</p>
                        <input type="text" placeholder="найдите что не нашли" />
                    </div>
                    <div className={styles.coursesExample}>
                        <h2>Курсы</h2>
                        <div className={styles.coursesANDtags}>
                            <div className={styles.tags}>
                                {tagsList}
                            </div>
                            <div className={styles.courses}>
                                <CoursesBlock />
                                <CoursesBlock />
                                <CoursesBlock />
                                <CoursesBlock />
                                <CoursesBlock />
                                <CoursesBlock />
                                <CoursesBlock />
                                <CoursesBlock />
                                <CoursesBlock />
                                <CoursesBlock />
                                <CoursesBlock />
                                <CoursesBlock />
                                <CoursesBlock />
                                <CoursesBlock />
                                <CoursesBlock />
                                <CoursesBlock />
                                <CoursesBlock />
                                <CoursesBlock />
                            </div>
                        </div>
                    </div>
                    <div className={styles.ourCourses}>
                        <div className={styles.ourCoursesBlock}>

                        </div>
                        <div className={styles.ogEg}>

                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

function Tags({ id, tag, name }) {
    return (
        <>
            <button className={styles.tagButtons} type="button">{name}</button>
        </>
    )
}