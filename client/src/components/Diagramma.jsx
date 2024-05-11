import React, { useContext, useEffect, useState } from "react";
import { VictoryLine, VictoryChart, VictoryAxis, VictoryLabel, VictoryScatter, VictoryTooltip } from "victory";
import { Context } from "..";
import CoursesService from "../service/CoursesService";
import styles from '../styles/statsManagment.module.css'
import { observer } from "mobx-react-lite";

const MyDiagram = ({ tag }) => {
    const { store, courseStore } = useContext(Context)
    const [modules, setModules] = useState([])
    const [lessons, setLessons] = useState([])
    const [showStat, setShowStat] = useState('modules')
    useEffect(() => {
        getModules()
        getMonth()
    }, [])

    async function getMonth() {
        try {
            await courseStore.fetchMonthStat(courseStore.course.id)
        } catch (e) {
            console.log(e)
        }
    }

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

    async function getLessons() {
        try {
            for (let i = 0; i < modules.length; i++) {
                console.log(modules[i].id)
                console.log(modules[i].id)
                const response = await CoursesService.fetchModuleLessons(modules[i].id)
                const dataArray = response.data.lessons;
                if (Array.isArray(dataArray)) {
                    setLessons(prevModules => [...prevModules, ...lessons, ...dataArray]);
                } else {
                    console.error('Ожидался массив, но получен другой тип данных:', dataArray);
                    setLessons([]); // Установка пустого массива в случае ошибки
                }
            }
        } catch (e) {
            console.log(e)
        }
    }

    console.log(lessons)
    console.log(modules)

    const navBarHandler = (bar) => {
        setShowStat(bar)
        if (bar === 'lessons' && lessons.length === 0) {
            getLessons()
        }
    }

    let currentId = 1
    let lessonsArray = []
    if (lessons) {
        lessonsArray = lessons.map(item => {
            const newItem = {
                id: currentId,
                done_lessons: item.done_lessons
            };
            currentId++;
            return newItem;
        });
    }



    return (
        <>
            {
                tag === 'done' &&
                <div style={{ width: '800px', height: '480px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    {
                        modules && showStat === 'modules' &&
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
                                    grid: { stroke: "#C1A875", strokeWidth: 0.5 },
                                    ticks: { stroke: "transparent" },
                                    tickLabels: { fontSize: 20, padding: 5, fill: "white" },
                                    axisLabel: { fontSize: 20, fill: "#C1A875" }
                                }}
                                scale="linear"

                            />
                            <VictoryAxis
                                dependentAxis
                                style={{
                                    axis: { stroke: "transparent" },
                                    grid: { stroke: "#C1A875", strokeWidth: 0.5 },
                                    ticks: { stroke: "transparent" },
                                    tickLabels: { fontSize: 20, padding: 5, fill: "white" },
                                }}
                            />
                            <VictoryLine data={modules} x="number" y="done_modules" />
                            <VictoryScatter
                                data={modules}
                                x="number"
                                y="done_modules"
                                size={2}
                                style={{
                                    data: {
                                        fill: "#C1A875",
                                        stroke: "transparent",
                                        strokeWidth: 100
                                    },
                                    labels: {
                                        fill: "#C1A875", // Исправленный цвет текста меток
                                        fontSize: 18,
                                    }
                                }}
                                labels={({ datum }) => datum.done_modules}
                                labelComponent={
                                    <VictoryLabel dy={-10} />
                                }
                            />
                            <VictoryTooltip />
                        </VictoryChart>
                    }
                    {
                        lessons && showStat === 'lessons' &&
                        <VictoryChart
                            domainPadding={{ x: 20 }}
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
                                tickValues={lessonsArray.map((item) => item.id)}
                                tickFormat={(x) => x}
                                label='Номер урока'
                                style={{
                                    axis: { stroke: "transparent" },
                                    grid: { stroke: "#C1A875", strokeWidth: 0.5 },
                                    ticks: { stroke: "transparent" },
                                    tickLabels: { fontSize: 20, padding: 5, fill: "white" },
                                    axisLabel: { fontSize: 20, fill: "#C1A875" }
                                }}
                                scale="linear"
                                domain={{ x: [0, lessons.length] }} />
                            <VictoryAxis
                                dependentAxis
                                style={{
                                    axis: { stroke: "transparent" },
                                    grid: { stroke: "#C1A875", strokeWidth: 0.5 },
                                    ticks: { stroke: "transparent" },
                                    tickLabels: { fontSize: 20, padding: 5, fill: "white" },
                                }}
                            />
                            <VictoryLine data={lessonsArray} x="id" y="done_lessons" />
                            <VictoryScatter
                                data={lessonsArray} x="id" y="done_lessons" size={3}
                                style={{
                                    data: {
                                        fill: "#C1A875",
                                        stroke: "transparent",
                                        strokeWidth: 100
                                    },
                                    labels: {
                                        fill: "#C1A875", // Исправленный цвет текста меток
                                        fontSize: 18,
                                    }
                                }}
                                labels={({ datum }) => datum.done_lessons}
                                labelComponent={
                                    <VictoryLabel dy={-10} />
                                }
                            />
                            <VictoryTooltip />
                        </VictoryChart>
                    }
                    <div className={styles.diagbar}>
                        <button onClick={() => navBarHandler('modules')} disabled={showStat === 'modules' ? true : false}>Модули</button>
                        <button onClick={() => navBarHandler('lessons')} disabled={showStat === 'lessons' ? true : false}>Уроки</button>
                    </div>
                </div>
            }



            {
                tag === 'sold' &&
                <div style={{ width: '800px', height: '480px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    {
                        modules && showStat === 'modules' &&
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
                                    grid: { stroke: "#C1A875", strokeWidth: 0.5 },
                                    ticks: { stroke: "transparent" },
                                    tickLabels: { fontSize: 20, padding: 5, fill: "white" },
                                    axisLabel: { fontSize: 20, fill: "#C1A875" }
                                }}
                                scale="linear"

                            />
                            <VictoryAxis
                                dependentAxis
                                style={{
                                    axis: { stroke: "transparent" },
                                    grid: { stroke: "#C1A875", strokeWidth: 0.5 },
                                    ticks: { stroke: "transparent" },
                                    tickLabels: { fontSize: 20, padding: 5, fill: "white" },
                                }}
                            />
                            <VictoryLine data={modules} x="number" y="done_modules" />
                            <VictoryScatter
                                data={modules}
                                x="number"
                                y="done_modules"
                                size={2}
                                style={{
                                    data: {
                                        fill: "#C1A875",
                                        stroke: "transparent",
                                        strokeWidth: 100
                                    },
                                    labels: {
                                        fill: "#C1A875", // Исправленный цвет текста меток
                                        fontSize: 18,
                                    }
                                }}
                                labels={({ datum }) => datum.done_modules}
                                labelComponent={
                                    <VictoryLabel dy={-10} />
                                }
                            />
                            <VictoryTooltip />
                        </VictoryChart>
                    }
                    {
                        lessons && showStat === 'lessons' &&
                        <VictoryChart
                            domainPadding={{ x: 20 }}
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
                                tickValues={lessonsArray.map((item) => item.id)}
                                tickFormat={(x) => x}
                                label='Номер урока'
                                style={{
                                    axis: { stroke: "transparent" },
                                    grid: { stroke: "#C1A875", strokeWidth: 0.5 },
                                    ticks: { stroke: "transparent" },
                                    tickLabels: { fontSize: 20, padding: 5, fill: "white" },
                                    axisLabel: { fontSize: 20, fill: "#C1A875" }
                                }}
                                scale="linear"
                                domain={{ x: [0, lessons.length] }} />
                            <VictoryAxis
                                dependentAxis
                                style={{
                                    axis: { stroke: "transparent" },
                                    grid: { stroke: "#C1A875", strokeWidth: 0.5 },
                                    ticks: { stroke: "transparent" },
                                    tickLabels: { fontSize: 20, padding: 5, fill: "white" },
                                }}
                            />
                            <VictoryLine data={lessonsArray} x="id" y="done_lessons" />
                            <VictoryScatter
                                data={lessonsArray} x="id" y="done_lessons" size={3}
                                style={{
                                    data: {
                                        fill: "#C1A875",
                                        stroke: "transparent",
                                        strokeWidth: 100
                                    },
                                    labels: {
                                        fill: "#C1A875", // Исправленный цвет текста меток
                                        fontSize: 18,
                                    }
                                }}
                                labels={({ datum }) => datum.done_lessons}
                                labelComponent={
                                    <VictoryLabel dy={-10} />
                                }
                            />
                            <VictoryTooltip />
                        </VictoryChart>
                    }
                    <div className={styles.diagbar}>
                        <button onClick={() => navBarHandler('modules')} disabled={showStat === 'modules' ? true : false}>Модули</button>
                        <button onClick={() => navBarHandler('lessons')} disabled={showStat === 'lessons' ? true : false}>Уроки</button>
                    </div>
                </div>
            }
        </>
    )
}

export default observer(MyDiagram)