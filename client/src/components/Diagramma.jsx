import React, { useContext, useEffect, useState } from "react";
import { VictoryLine, VictoryChart, VictoryAxis, VictoryLabel, VictoryScatter, VictoryTooltip } from "victory";
import { Context } from "..";
import CoursesService from "../service/CoursesService";
import styles from '../styles/statsManagment.module.css'

const MyDiagram = () => {
    const { store, courseStore } = useContext(Context)
    const [modules, setModules] = useState([])
    const [lessons, setLessons] = useState([])
    useEffect(() => {
        getModules()
        getLessons()
    }, [])

    async function getModules() {
        try {
            const response = await CoursesService.fetchCourseModules(courseStore.course.id)
            const dataArray = response.data.modules; // Предполагается, что courses - это массив в модели
            if (Array.isArray(dataArray)) {
                setModules(dataArray);

            } else {
                console.error('Ожидался массив, но получен другой тип данных:', dataArray);
                setModules([]); // Установка пустого массива в случае ошибки
            }
        } catch (e) {
            console.log(e)
        }
    }

    console.log(modules.length)


    async function getLessons() {
        try {
            for (let i = 0; i < modules.length; i++) {
                console.log(modules[i].id)
                const response = await CoursesService.fetchModuleLessons(modules[i].id)
                const dataArray = response.data.lessons;
                if (Array.isArray(dataArray)) {
                    setLessons(dataArray);
                } else {
                    console.error('Ожидался массив, но получен другой тип данных:', dataArray);
                    setLessons([]); // Установка пустого массива в случае ошибки
                }
            }
            // const response = await CoursesService.fetchModuleLessons(254)
            // const dataArray = response.data.lessons;
            // if (Array.isArray(dataArray)) {
            //     setLessons(dataArray);
            // } else {
            //     console.error('Ожидался массив, но получен другой тип данных:', dataArray);
            //     setLessons([]); // Установка пустого массива в случае ошибки
            // }
        } catch (e) {
            console.log(e)
        }
    }

    console.log(lessons)

    const navBarHandler = () => {
        getLessons()
    }

    return (
        <>
            <div style={{ width: '800px', height: '480px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                {
                    modules &&
                    <VictoryChart
                        domainPadding={20}
                        padding={{ top: 50, bottom: 50, left: 75, right: 75 }}
                        width={800}
                        height={400}
                        theme={{
                            axis: {
                                style: {
                                    axis: { stroke: "transparent" },
                                    grid: { stroke: "#C1A875", strokeWidth: 0.7 },
                                    ticks: { stroke: "transparent" },
                                    tickLabels: { fontSize: 20, padding: 5, fill: "#C1A875" }
                                }
                            },
                            line: {
                                style: {
                                    data: { stroke: "black", strokeWidth: 2 }
                                }
                            },
                            labels: {
                                style: {
                                    text: { fontSize: 10, fill: "black" }
                                }
                            }
                        }}
                    >
                        <VictoryAxis
                            tickValues={modules.map((item) => item.number)}
                            tickFormat={(x) => x}
                            label='Номер модуля'
                            style={{
                                axis: { stroke: "transparent" },
                                grid: { stroke: "#C1A875", strokeWidth: 1 },
                                ticks: { stroke: "transparent" },
                                tickLabels: { fontSize: 20, padding: 5, fill: "white" },
                                axisLabel: { fontSize: 20, fill: "#C1A875" }
                            }}
                        />
                        <VictoryAxis
                            dependentAxis
                            style={{
                                axis: { stroke: "transparent" },
                                grid: { stroke: "#C1A875", strokeWidth: 1 },
                                ticks: { stroke: "transparent" },
                                tickLabels: { fontSize: 20, padding: 5, fill: "white" },
                            }}
                        />
                        <VictoryLine data={modules} x="number" y="done_modules" />
                        <VictoryScatter data={modules} x="number" y="done_modules" size={2} />
                        <VictoryTooltip />
                    </VictoryChart>
                }
                <div className={styles.diagbar}>
                    <button>Модули</button>
                    <button onClick={navBarHandler}>Уроки</button>
                </div>
            </div>
        </>
    )
}

export default MyDiagram