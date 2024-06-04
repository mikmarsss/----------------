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
    const [months, setMonths] = useState([])
    const [showStat, setShowStat] = useState('modules')
    const [yearIncome, setYearIncome] = useState([])
    useEffect(() => {
        getModules()
        getMonth()
        getYearIncome()
    }, [])

    async function getYearIncome() {
        try {
            const response = await CoursesService.fetchYearIncome(courseStore.course.id)
            const data = response.data.yearIncome; // Предполагается, что courses - это массивs в модели
            delete data['id']
            setYearIncome(Object.entries(data).map(([id, value]) => ({ id, value })))
        } catch (e) {
            console.log(e)
        }
    }
    const minY = Math.min(...yearIncome.map((item) => item.value));
    const maxY = Math.max(...yearIncome.map((item) => item.value));
    console.log(yearIncome)

    async function getMonth() {
        try {
            const response = await CoursesService.fetchMonthStat(courseStore.course.id)
            const dataArray = response.data.months; // Предполагается, что courses - это массив в модели
            if (Array.isArray(dataArray)) {
                setMonths(dataArray);

            } else {
                console.error('Ожидался массив, но получен другой тип данных:', dataArray);
                setMonths([]); // Установка пустого массива в случае ошибки
            }
        } catch (e) {
            console.log(e)
        }
    }
    console.log(months)
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

    console.log(months)

    let monthId = 1
    let monthValues1 = []
    if (months.length !== 0) {
        monthValues1 = [
            months[0].one,
            months[0].two,
            months[0].three,
            months[0].four,
            months[0].five,
            months[0].six,
            months[0].seven,
            months[0].eight,
            months[0].nine,
            months[0].ten,
            months[0].eleven,
            months[0].twelve,
            months[0].thirteen,
            months[0].fourteen,
            months[0].fifteen,
            months[0].sixteen,
            months[0].seventeen,
            months[0].eighteen,
            months[0].nineteen,
            months[0].twenty,
            months[0].twentyone,
            months[0].twentytwo,
            months[0].twentythree,
            months[0].twentyfour,
            months[0].twentyfive,
            months[0].twentysix,
            months[0].twentyseven,
            months[0].twentyeight,
            months[0].twentynine,
            months[0].thirty,
            months[0].thirtyone,
        ]
        console.log(monthValues1)
    }
    let monthArray = []
    if (monthValues1) {
        monthArray = monthValues1.map(item => {
            const newItem = {
                id: monthId,
                value: item
            };
            monthId++;
            return newItem;
        });
    }


    let monthValues2 = []
    if (months.length !== 0) {
        monthValues2 = [
            months[1].one,
            months[1].two,
            months[1].three,
            months[1].four,
            months[1].five,
            months[1].six,
            months[1].seven,
            months[1].eight,
            months[1].nine,
            months[1].ten,
            months[1].eleven,
            months[1].twelve,
            months[1].thirteen,
            months[1].fourteen,
            months[1].fifteen,
            months[1].sixteen,
            months[1].seventeen,
            months[1].eighteen,
            months[1].nineteen,
            months[1].twenty,
            months[1].twentyone,
            months[1].twentytwo,
            months[1].twentythree,
            months[1].twentyfour,
            months[1].twentyfive,
            months[1].twentysix,
            months[1].twentyseven,
            months[1].twentyeight,
            months[1].twentynine,
            months[1].thirty,
            months[1].thirtyone,
        ]
        console.log(monthValues2)
    }

    let curentid = 1
    let monthArray2 = []
    if (monthValues2) {
        monthArray2 = monthValues2.map(item => {
            const newItem = {
                id: curentid,
                value: item
            };
            curentid++;
            return newItem;
        });
    }

    return (
        <>
            {
                tag === 'done' &&
                <div style={{ width: '800px', height: '480px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    {
                        modules.length !== 0 && showStat === 'modules' &&
                        <VictoryChart
                            domainPadding={20}
                            padding={{ top: 50, bottom: 50, left: 75, right: 75 }}
                            width={800}
                            height={400}
                            theme={{
                                axis: {
                                    style: {
                                        axis: { stroke: "transparent" },
                                        grid: { stroke: "#243F5D", strokeWidth: 0.7 },
                                        ticks: { stroke: "transparent" },
                                        tickLabels: { fontSize: 20, padding: 5, fill: "#243F5D" }
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
                                    grid: { stroke: "#243F5D", strokeWidth: 0.5 },
                                    ticks: { stroke: "transparent" },
                                    tickLabels: { fontSize: 20, padding: 5, fill: "white" },
                                    axisLabel: { fontSize: 20, fill: "#243F5D" }
                                }}
                                scale="linear"

                            />
                            <VictoryAxis
                                dependentAxis
                                style={{
                                    axis: { stroke: "transparent" },
                                    grid: { stroke: "#243F5D", strokeWidth: 0.5 },
                                    ticks: { stroke: "transparent" },
                                    tickLabels: { fontSize: 20, padding: 5, fill: "black" },
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
                                        fill: "white",
                                        stroke: "transparent",
                                        strokeWidth: 100
                                    },
                                    labels: {
                                        fill: "white", // Исправленный цвет текста меток
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
                        modules.length === 0 &&
                        <div className={styles.statWarning}>
                            Чтобы получить статистику по курсу, создайте модули и уроки.
                        </div>
                    }
                    {
                        lessons.length !== 0 && showStat === 'lessons' &&
                        <VictoryChart
                            domainPadding={{ x: 20 }}
                            padding={{ top: 50, bottom: 50, left: 75, right: 75 }}
                            width={800}
                            height={400}
                            theme={{
                                axis: {
                                    style: {
                                        axis: { stroke: "transparent" },
                                        grid: { stroke: "#243F5D", strokeWidth: 0.7 },
                                        ticks: { stroke: "transparent" },
                                        tickLabels: { fontSize: 20, padding: 5, fill: "#243F5D" }
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
                                    grid: { stroke: "#243F5D", strokeWidth: 0.5 },
                                    ticks: { stroke: "transparent" },
                                    tickLabels: { fontSize: 20, padding: 5, fill: "white" },
                                    axisLabel: { fontSize: 20, fill: "#243F5D" }
                                }}
                                scale="linear"
                                domain={{ x: [0, lessons.length] }} />
                            <VictoryAxis
                                dependentAxis
                                style={{
                                    axis: { stroke: "transparent" },
                                    grid: { stroke: "#243F5D", strokeWidth: 0.5 },
                                    ticks: { stroke: "transparent" },
                                    tickLabels: { fontSize: 20, padding: 5, fill: "black" },
                                }}
                            />
                            <VictoryLine data={lessonsArray} x="id" y="done_lessons" />
                            <VictoryScatter
                                data={lessonsArray} x="id" y="done_lessons" size={3}
                                style={{
                                    data: {
                                        fill: "white",
                                        stroke: "transparent",
                                        strokeWidth: 100
                                    },
                                    labels: {
                                        fill: "white", // Исправленный цвет текста меток
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
                    {
                        modules.length !== 0 &&
                        <div className={styles.diagbar}>
                            <button onClick={() => navBarHandler('modules')} disabled={showStat === 'modules' ? true : false}>Модули</button>
                            <button onClick={() => navBarHandler('lessons')} disabled={showStat === 'lessons' ? true : false}>Уроки</button>
                        </div>
                    }
                </div>
            }



            {
                tag === 'sold' &&
                <div style={{ width: '800px', height: '480px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    {
                        monthArray.length !== 0 && showStat === 'modules' &&
                        <VictoryChart
                            domainPadding={{ x: 20 }}
                            padding={{ top: 50, bottom: 50, left: 75, right: 75 }}
                            width={1000}
                            height={500}
                            theme={{
                                axis: {
                                    style: {
                                        axis: { stroke: "transparent" },
                                        grid: { stroke: "#243F5D", strokeWidth: 0.7 },
                                        ticks: { stroke: "transparent" },
                                        tickLabels: { fontSize: 20, padding: 5, fill: "#243F5D" }
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
                                tickValues={monthArray.map((item) => item.id)}
                                tickFormat={(x) => x}
                                label='День месяца'
                                style={{
                                    axis: { stroke: "transparent" },
                                    grid: { stroke: "#243F5D", strokeWidth: 0.5 },
                                    ticks: { stroke: "transparent" },
                                    tickLabels: { fontSize: 20, padding: 5, fill: "white" },
                                    axisLabel: { fontSize: 20, fill: "#243F5D" }
                                }}
                                scale="linear"

                            />
                            <VictoryAxis
                                dependentAxis
                                style={{
                                    axis: { stroke: "transparent" },
                                    grid: { stroke: "#243F5D", strokeWidth: 0.5 },
                                    ticks: { stroke: "transparent" },
                                    tickLabels: { fontSize: 20, padding: 5, fill: "white" },
                                }}
                            />
                            <VictoryLine data={monthArray} x="id" y="value" />
                            <VictoryScatter
                                data={monthArray}
                                x="id"
                                y="value"
                                size={2}
                                style={{
                                    data: {
                                        fill: "white",
                                        stroke: "transparent",
                                        strokeWidth: 1
                                    },
                                    labels: {
                                        fill: "white", // Исправленный цвет текста меток
                                        fontSize: 18,
                                    }
                                }}
                                labels={({ datum }) => datum.value}
                                labelComponent={
                                    <VictoryLabel dy={-10} />
                                }
                            />
                            <VictoryTooltip />
                        </VictoryChart>
                    }
                    {
                        monthArray2.length !== 0 && showStat === 'lessons' &&
                        <VictoryChart
                            domainPadding={{ x: 20 }}
                            padding={{ top: 50, bottom: 50, left: 75, right: 75 }}
                            width={1000}
                            height={500}
                            theme={{
                                axis: {
                                    style: {
                                        axis: { stroke: "transparent" },
                                        grid: { stroke: "#243F5D", strokeWidth: 0.7 },
                                        ticks: { stroke: "transparent" },
                                        tickLabels: { fontSize: 20, padding: 5, fill: "#243F5D" }
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
                                tickValues={monthArray2.map((item) => item.id)}
                                tickFormat={(x) => x}
                                label='День месяца'
                                style={{
                                    axis: { stroke: "transparent" },
                                    grid: { stroke: "#243F5D", strokeWidth: 0.5 },
                                    ticks: { stroke: "transparent" },
                                    tickLabels: { fontSize: 20, padding: 5, fill: "white" },
                                    axisLabel: { fontSize: 20, fill: "#243F5D" }
                                }}
                                scale="linear"
                                domain={{ x: [0, lessons.length] }} />
                            <VictoryAxis
                                dependentAxis
                                style={{
                                    axis: { stroke: "transparent" },
                                    grid: { stroke: "#243F5D", strokeWidth: 0.7 },
                                    ticks: { stroke: "transparent" },
                                    tickLabels: { fontSize: 20, padding: 5, fill: "white" },
                                }}
                            />
                            <VictoryLine data={monthArray2} x="id" y="value" />
                            <VictoryScatter
                                data={monthArray2} x="id" y="value" size={3}
                                style={{
                                    data: {
                                        fill: "white",
                                        stroke: "transparent",
                                        strokeWidth: 1
                                    },
                                    labels: {
                                        fill: "white", // Исправленный цвет текста меток
                                        fontSize: 18,
                                    }
                                }}
                                labels={({ datum }) => datum.value}
                                labelComponent={
                                    <VictoryLabel dy={-10} />
                                }
                            />
                            <VictoryTooltip />
                        </VictoryChart>
                    }
                    <div className={styles.diagbar}>
                        <button className={`${showStat === 'modules' ? styles.selected : false}`} onClick={() => navBarHandler('modules')} disabled={showStat === 'modules' ? true : false}>Прошлый месяц</button>
                        <button className={`${showStat === 'lessons' ? styles.selected : false}`} onClick={() => navBarHandler('lessons')} disabled={showStat === 'lessons' ? true : false}>Текущий месяц</button>
                    </div>
                </div>
            }
            {
                tag === 'income' &&
                <VictoryChart
                    domainPadding={{ x: 20 }}
                    padding={{ top: 50, bottom: 50, left: 75, right: 75 }}
                    width={1300}
                    height={500}
                    theme={{
                        axis: {
                            style: {
                                axis: { stroke: "transparent" },
                                grid: { stroke: "#243F5D", strokeWidth: 0.7 },
                                ticks: { stroke: "transparent" },
                                tickLabels: { fontSize: 20, padding: 5, fill: "#243F5D" }
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
                        tickValues={yearIncome.map((item) => item.id)}
                        tickFormat={(id) => id}
                        label='Месяц'
                        style={{
                            axis: { stroke: "transparent" },
                            grid: { stroke: "#243F5D", strokeWidth: 0.5 },
                            ticks: { stroke: "transparent" },
                            tickLabels: { fontSize: 20, padding: 5, fill: "white" },
                            axisLabel: { fontSize: 20, fill: "white" }
                        }}
                        scale="linear"
                        domain={{ x: [0, yearIncome.length] }}
                    />
                    <VictoryAxis
                        dependentAxis
                        style={{
                            axis: { stroke: "transparent" },
                            grid: { stroke: "#243F5D", strokeWidth: 0.7 },
                            ticks: { stroke: "transparent" },
                            tickLabels: { fontSize: 20, padding: 5, fill: "white" },
                        }}
                        domain={{ y: [1, yearIncome.length - 1] }}
                    />
                    <VictoryLine data={yearIncome} x="id" y="value" />
                    <VictoryScatter
                        data={yearIncome} x="id" y="value" size={3}
                        style={{
                            data: {
                                fill: "white",
                                stroke: "transparent",
                                strokeWidth: 1
                            },
                            labels: {
                                fill: "white", // Исправленный цвет текста меток
                                fontSize: 18,
                            }
                        }}
                        labels={({ datum }) => datum.value}
                        labelComponent={
                            <VictoryLabel dy={-10} />
                        }
                    />
                    <VictoryTooltip />
                </VictoryChart>
            }
        </>
    )
}

export default observer(MyDiagram)