
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import styles from '../styles/settingsManagment.module.css'
import box from '../Images/boxforcheck.svg'
import { Context } from "..";
import { useParams } from "react-router-dom";
import checkedBox from '../Images/checkedBox.svg'
import CoursesService from "../service/CoursesService";

function ManagmentSettings() {
    const { courseStore } = useContext(Context)
    const params = useParams()
    const current = params.id
    const [cardCheck, setCardCheck] = useState(false)
    const [lessonsCheck, setLessonsCheck] = useState(false)
    const [moduleCheck, setModuleCheck] = useState(false)
    const [nameCheck, setNameCheck] = useState(false)
    const [chapterCheck, setChapterCheck] = useState(false)
    const [modules, setModules] = useState([])
    const [lessons, setLessons] = useState([])

    useEffect(() => {
        async function fetchData() {
            try {
                checkCourseCardHandler()
                await getCourse()
                await getModules()
            } catch (e) {
                console.log(e)
            }
        }
        fetchData()
    }, [])

    async function getCourse() {
        await courseStore.checkCourse(current)
    }

    async function getModules() {
        try {
            const response = await CoursesService.fetchCourseModules(current)
            const dataArray = response.data.modules; // Предполагается, что courses - это массив в модели
            if (Array.isArray(dataArray)) {
                setModules(dataArray);
            } else {
                console.error('Ожидался массив, но получен другой тип данных:', dataArray);
                setModules([]); // Установка пустого массива в случае ошибки
            }
            getLessons(dataArray)
        } catch (e) {
            console.log(e)
        }
    }

    async function getLessons(arr) {
        const prevArayy = []
        for (let modulee of arr) {
            try {
                const response = await CoursesService.fetchModuleLessons(modulee.id)
                const dataArray = response.data.lessons; // Предполагается, что courses - это массив в модели
                if (Array.isArray(dataArray)) {
                    prevArayy.push(dataArray)

                } else {
                    console.error('Ожидался массив, но получен другой тип данных:', dataArray);
                    setLessons([]); // Установка пустого массива в случае ошибки
                }
            } catch (e) {
                console.log(e)
            }
        }
        setLessons(prevArayy)
        checkForModulesLessonsHandler(prevArayy, arr.length)
    }

    const checkCourseCardHandler = () => {
        if (courseStore.course.name && courseStore.course.course_content && courseStore.course.img && courseStore.course.additional_type && courseStore.course.description) {
            setCardCheck(true)
        }
    }

    const checkForModulesLessonsHandler = (prevArayy, moduleslength) => {
        const totalLength = prevArayy.reduce((accumulator, innerArray) => {
            return accumulator + innerArray.length;
        }, 0);
        console.log(totalLength, moduleslength)
        if (moduleslength >= 3 && totalLength >= 9) {
            setLessonsCheck(true)
        }
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.settings}>
                    <div className={styles.publish}>
                        <p className={styles.zagolovok}>Чек-лист</p>
                        <div className={styles.checkList}>
                            <div>
                                <img src={cardCheck ? checkedBox : box} alt="" />
                                <p>Карточка курса заполнена</p>
                            </div>
                            <div>
                                <img src={lessonsCheck ? checkedBox : box} alt="" />
                                <p>Курс содержит не менее 3 модулей и 9 уроков (по 3 в каждом модуле)</p>
                            </div>
                            <div>
                                <img src={box} alt="" />
                                <p>Нет пустых модулей</p>
                            </div>
                            <div>
                                <img src={box} alt="" />
                                <p>Название модулей и уроков заполнены</p>
                            </div>
                            <div>
                                <img src={box} alt="" />
                                <p>Описание модулей и уроков заполнены</p>
                            </div>
                            <div>
                                <img src={box} alt="" />
                                <p>Уроки содержат не менее 3 глав</p>
                            </div>
                        </div>
                        <div className={styles.publicButton}>
                            <button>Опубликовать</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default observer(ManagmentSettings)