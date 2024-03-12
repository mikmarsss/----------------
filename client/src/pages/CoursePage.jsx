import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from '../styles/coursePage.module.css'
import { useParams } from "react-router-dom";
import { Context } from "..";
import { useContext, useEffect } from "react";
import CoursesService from "../service/CoursesService";
import { toJS } from "mobx";
import { Link } from "react-router-dom";
import { EDITCOURSE_PAGE } from "../utils";

function CoursePage() {
    const [contentList, setContentList] = useState([])
    const params = useParams()
    const { store, courseStore } = useContext(Context)
    const current = params.id

    useEffect(() => {
        getCourse()
    }, [])

    async function getCourse() {
        try {
            await courseStore.fetchUserCourse(current)
            if (courseStore.course.course_content) {
                const parsedConent = JSON.parse(courseStore.course.course_content)
                setContentList(parsedConent)
            }
        } catch (e) {
            console.log(e)
        }
    }

    const icons = [
        {
            id: 1,
            name: 'angular.svg',
        },
        {
            id: 2,
            name: 'bootstrap.svg',
        },
        {
            id: 3,
            name: 'c.svg',
        },
        {
            id: 4,
            name: 'cshj.svg',
        },
        {
            id: 5,
            name: 'c++.svg',
        },
        {
            id: 6,
            name: 'github.svg',
        },
        {
            id: 7,
            name: 'go-lang.svg',
        },
        {
            id: 8,
            name: 'html5.svg',
        },
        {
            id: 9,
            name: 'java.svg',
        },
        {
            id: 10,
            name: 'js.svg',
        },
        {
            id: 11,
            name: 'mysql.svg',
        },
        {
            id: 12,
            name: 'nodejs.svg',
        },
        {
            id: 13,
            name: 'php.svg',
        },
        {
            id: 14,
            name: 'postgresql.svg',
        },
        {
            id: 15,
            name: 'python.svg',
        },
        {
            id: 16,
            name: 'react.svg',
        },
        {
            id: 17,
            name: 'sql-server.svg',
        },
        {
            id: 18,
            name: 'swift.svg',
        },
        {
            id: 19,
            name: 'typescript.svg',
        },
        {
            id: 20,
            name: 'unity.svg',
        },
        {
            id: 21,
            name: 'visual-studio.svg',
        },
        {
            id: 22,
            name: 'vue.svg',
        },
        {
            id: 23,
            name: 'wordpress.svg',
        },
    ]
    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.courseInfo}>
                    <div className={styles.title}>
                        {
                            courseStore.course.creator_id === store.user.id &&
                            <Link to={EDITCOURSE_PAGE + `/${courseStore.course.id}`}>
                                <button className={styles.button}>
                                    <p>
                                        редактировать
                                    </p>
                                </button>
                            </Link>
                        }

                        {
                            courseStore.course.creator_id !== store.user.id &&
                            <button className={styles.button}>
                                <p>
                                    Купить
                                </p>
                            </button>
                        }

                        {
                            courseStore.course.price === 0 &&
                            <button className={styles.button}>
                                <p>
                                    учиться
                                </p>
                            </button>
                        }
                        <div className={styles.imgfield}>
                            <img className={styles.ava} src={"http://localhost:5000/" + courseStore.course.img} alt="" />
                        </div>
                        <div className={styles.titleInfo}>
                            <div>
                                <h1>{courseStore.course.name}</h1>
                            </div>
                            <div>
                                <p>{courseStore.course.description}</p>
                            </div>
                            <div className={styles.langicons}>
                                {courseStore.course.additional_type &&
                                    icons.filter(item => courseStore.course.additional_type.includes(item.id)).map(item => (
                                        <div key={item.id}>
                                            <img className={styles.ava} src={`http://localhost:5000/${item.name}`} alt="" />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className={styles.body}>
                        <h1>На этом курсе вы изучите</h1>
                        {
                            contentList.length !== 0 &&
                            <CreateDescriptionList content={contentList} />
                        }
                    </div>

                </div>
            </div>
            <Footer />
        </>
    )
}

function CreateDescriptionList({ content }) {

    return (
        <>
            {

                content.map((item, index) => (
                    <div key={index}>
                        <li>{item.description}</li>
                    </div>
                ))

            }
        </>
    )
}

export default observer(CoursePage)