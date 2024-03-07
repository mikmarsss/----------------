import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { Context } from "..";
import styles from '../styles/testPage.module.css'
import { useState } from "react";


function TestPage() {
    const { store, courseStore } = useContext(Context)
    const params = useParams()
    const [next, setNext] = useState(0)
    const [click, setClick] = useState(0)
    const current = params.id
    const nextQuestion = () => {
        setNext(prevNext => prevNext + 1)
    }

    // const handleMouseUp = () => {

    //     setClick(prevClick => prevClick - 1)

    // }

    // const handleMouseDown = () => {

    //     setClick(prevClick => prevClick + 1)

    // }

    console.log(next)
    return (
        <>

            <Header />
            {
                current == store.user.id &&
                <div className={styles.container}>

                    <div className={styles.test}>
                        {
                            <div className={`${click === 1 ? styles.questionBlockAnimation : styles.f}`}>
                                <div className={styles.questionBlock}>
                                    <ShowQuestion number={next} />
                                </div>
                            </div>

                        }
                        <button
                            onClick={() => nextQuestion()}
                        // onMouseDown={handleMouseDown}
                        // onMouseUp={handleMouseUp}
                        >
                            <p>
                                {
                                    next === 0 &&
                                    "Поехали!"
                                }
                                {
                                    next !== 0 &&
                                    "Далее"
                                }
                            </p>

                        </button>
                    </div>

                </div >
            }
            <Footer />
        </>
    )
}

function ShowQuestion({ number }) {
    const { store } = useContext(Context)
    const [type, setType] = useState('Выберите направление')
    const [showList, setShowList] = useState(false)

    const showListHandler = () => {
        if (showList === false) {
            setShowList(true)
        } else (
            setShowList(false)
        )
    }

    const setTypeHandler = (type) => {
        setType(type)
        setShowList(false)
    }
    return (
        <>
            {
                number === 0 &&
                <>
                    <p>Приветствую, {store.user.name}, здесь мы сможем подобрать для тебя необходимые курсы и вектор обучения по твоим интересам! </p>
                    <p>Чтобы узнать результат, тебе необходимо ответить на нескуолько вопрос!</p>
                    <p>НАЧНЕМ?</p>
                </>
            }
            {
                number === 1 &&
                <>
                    <p>Для начала, давай определимся с направлением</p>
                    <p>Из предложенного списка выбери направление, которые больше всего тебе интересно</p>
                    <div className={styles.firstQeustion}>
                        <button onClick={showListHandler}>{type}</button>
                        {
                            showList === true &&
                            <div className={styles.firstQeustionAnswers}>
                                <button onClick={() => setTypeHandler("Программирование")}>Программирование</button>
                                <button onClick={() => setTypeHandler("Дизайн")}>Дизайн</button>
                                <button onClick={() => setTypeHandler("Моделирование")}>Моделирование</button>
                                <button onClick={() => setTypeHandler("Тестирование")}>Тестирование</button>
                                <button onClick={() => setTypeHandler("Аналитика данных")}>Аналитика данных</button>
                                <button onClick={() => setTypeHandler("Другое")}> Другое</button>

                            </div>
                        }
                    </div>
                </>
            }

            {
                number === 2 &&
                <>
                    <p>Теперь тебе необходимо более детально описать, то чем ты хотел бы заниматься</p>
                    <div className={styles.secondQuestion}>
                        <textarea name="" id="" maxLength={500}></textarea>
                        <p>Максимальная длинна 500 символов</p>
                    </div>
                </>
            }
        </>
    )
}

export default observer(TestPage)