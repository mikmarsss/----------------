import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "..";
import styles from '../styles/testPage.module.css'
import { useState } from "react";
import { LANDING_ROUTE } from "../utils";
import logo from '../Images/logoTETA.svg'

function TestPage() {
    const { store } = useContext(Context)
    const params = useParams()
    const current = params.id

    return (
        <>
            <div className={styles.container}>
                <div>
                    <Header />
                </div>
                {
                    current == store.user.id &&
                    <div className={styles.content}>
                        <div className={`${styles.test} ${styles.glass}`}>
                            {
                                <div>
                                    <div >
                                        <ShowQuestion />
                                    </div>
                                </div>

                            }

                        </div>

                    </div >
                }
                <div>
                    <Footer />
                </div>
            </div>
        </>
    )
}

const ShowQuestion = observer(() => {
    const [answer, setAnswer] = useState('')
    const [next, setNext] = useState(0)
    const navigate = useNavigate()
    const { store } = useContext(Context)
    const [type, setType] = useState('Выберите направление')
    const [showList, setShowList] = useState(false)



    const nextQuestion = (next) => {
        setNext(prevNext => prevNext + 1)
        if (next === 2) {
            store.sendToAI(answer)
        }
        if (next === 3) {
            navigate(LANDING_ROUTE)
            store.saveTestResult(store.test.choices[0].message.content, store.user.id)
        }
    }
    const showListHandler = () => {
        if (showList === false) {
            setShowList(true)
        } else (
            setShowList(false)
        )
    }

    console.log(store.test.id)

    const setAnswerHandler = (e) => {
        setAnswer(e.target.value)
    }

    const setTypeHandler = (type) => {
        setType(type)
        setShowList(false)
    }
    return (
        <>
            <div className={styles.questionBlock}>
                {
                    next === 0 &&
                    <>
                        <p>Приветствую, {store.user.name}, пройдя данный тест вы получите рекомендации по обучению! </p>
                        <p>Чтобы узнать результат, тебе необходимо ответить на несколько вопросов!</p>
                        <p>НАЧНЕМ?</p>

                    </>
                }
                {
                    next === 1 &&
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
                    next === 2 &&
                    <>
                        <p>Теперь тебе необходимо описать, то чем ты хотел бы заниматься</p>
                        <div className={styles.secondQuestion}>
                            <textarea name="" id="" maxLength={500} placeholder="я хотел бы создавать сайты "
                                onChange={(e) => setAnswerHandler(e)}
                            ></textarea>
                            <p>Максимальная длинна 500 символов</p>
                        </div>
                    </>
                }
                {
                    next === 3 && !store.isLoading &&
                    <>
                        <p>РЕЗУЛЬТАТ</p>
                        <div className={styles.secondQuestion}>
                            <p className={styles.answer}>
                                {store.test.choices[0].message.content}
                            </p>
                        </div>
                    </>
                }
                {
                    store.isLoading &&
                    <>
                        <p>ЗАГРУЗКА</p>
                        <img src={logo} alt="" />
                    </>
                }
            </div>
            <div className={styles.buttonBlock}>
                <button
                    className={styles.nextButton}
                    onClick={() => nextQuestion(next)}
                // onMouseDown={handleMouseDown}
                // onMouseUp={handleMouseUp}
                >
                    <p>
                        {
                            next === 0 &&
                            "Поехали!"
                        }
                        {
                            next === 1 &&
                            "Далее"
                        }
                        {
                            next === 2 &&
                            "Результат"
                        }
                        {
                            next === 3 &&
                            "Закончить"
                        }
                    </p>

                </button>
            </div>
        </>
    )
})

export default observer(TestPage)