import React, { useContext, useEffect, useState } from "react";
import styles from '../styles/editLesson.module.css'
import { observer } from "mobx-react-lite";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Context } from "..";
import { useParams } from "react-router-dom";
import CoursesService from "../service/CoursesService";
import plus from '../Images/plus.svg'

function EditLesson() {
    const { store, courseStore } = useContext(Context)
    const params = useParams()
    const current = params.id
    const [chapters, setChapters] = useState([])
    const [numChapter, setNumChapter] = useState(1)
    const [chaptersError, setChaptersError] = useState()
    const [addChapterClicker, setAddChapterClicker] = useState(false)
    const [lessonName, setLessonName] = useState('')

    useEffect(() => {
        getLesson()
        getChapters()
    }, [addChapterClicker])

    async function getLesson() {
        try {
            await courseStore.fetchLesson(current)
            setLessonName(courseStore.lesson.name)
        } catch (e) {
            console.log(e)
        }
    }

    async function getChapters() {
        try {
            const response = await CoursesService.fetchChapters(current)
            const dataArray = response.data.chapters; // Предполагается, что courses - это массив в модели
            if (Array.isArray(dataArray)) {
                setChapters(dataArray);

            } else {
                console.error('Ожидался массив, но получен другой тип данных:', dataArray);
                setChapters([]); // Установка пустого массива в случае ошибки
            }
        } catch (e) {
            console.log(e)
        }
    }

    const chapterHandler = (index) => {
        setNumChapter(index)
        localStorage.setItem('chapterNum', index.id)
    }

    async function addChapterHandler(index) {
        await courseStore.createChapter(index)
        setAddChapterClicker(addChapterClicker === true ? false : true)
    }

    return (
        <>
            <Header />
            {
                current == courseStore.lesson.id &&
                <>
                    <div className={styles.container}>
                        <div className={styles.title}>
                            <div className={styles.moduleName}>
                                {courseStore.module.name}
                            </div>
                            <div className={styles.moduleName}>
                                <input type="text"
                                    className={styles.logininput}
                                    placeholder={lessonName}
                                    onChange={(e) => setLessonName(e.target.value)}
                                    value={lessonName}
                                />
                            </div>
                        </div>
                        <div className={styles.chaptersBar}>
                            {
                                chapters.map((index, item) => (
                                    <>
                                        <button onClick={() => chapterHandler(index)} key={index} className={`${index === numChapter ? styles.selectedChapterBox : styles.chapterBox}`}>
                                        </button>
                                    </>
                                ))
                            }
                            <button onClick={() => addChapterHandler(current)} className={styles.addcChapterBox}>
                                <img src={plus} className={styles.addChapter} alt="" />
                            </button>
                        </div>
                        <div className={styles.lessoncontainer}>
                            <div className={styles.body}>
                                {
                                    chapters.length != 0 &&
                                    <LessonInfo lesson={numChapter} lessonName={lessonName} />
                                }
                                {
                                    chapters.length == 0 &&
                                    <>
                                        <div className={styles.netmodulei}>
                                            <h1>У вас нет разделов в этом уроке</h1>
                                            <p>Чтобы добавить новый раздел в этом уроке нажмите на кнопочку</p>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </>
            }
            <Footer />
        </>
    )
}

const LessonInfo = observer(({ lesson, lessonName }) => {
    const { courseStore, store } = useContext(Context)
    const [showElements, setShowElements] = useState(false)
    const [courseContent, setCourseContent] = useState([])
    const [testContent, setTestContent] = useState([])
    const [chapterName, setChapterName] = useState(lesson.name)
    const [ava, setAva] = useState([])

    useEffect(() => {
        getChapter()
        setChapterName(courseStore.chapter.name)
    }, [lesson])

    function isJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    async function getChapter() {
        try {
            await courseStore.fetchChapter(localStorage.getItem('chapterNum'))
            setChapterName(courseStore.chapter.name)

            if (isJsonString(courseStore.chapter.content)) {
                const parsedContent = JSON.parse(courseStore.chapter.content)
                setCourseContent(parsedContent)
                setAva(courseStore.chapter.imgs)
                for (const [key, value] of Object.entries(parsedContent)) {
                    const { description, number, tag, answer, name } = value
                    console.log(tag)
                    if (tag === 'test') {
                        console.log(description)
                        setTestContent(description)
                    }
                }
            }
            else {
                setCourseContent([])
                setTestContent([])
            }
        } catch (e) {
            console.log(e)
        }
    }


    const RenderArea = (i) => {
        const tag = i.tag
        const number = i.number
        const description = i.description
        const name = i.name

        const selectAva = (e) => {
            var reader = new FileReader()
            reader.onload = function () {
                var preview = document.querySelector('#img-preview')
                preview.src = reader.result
            }
            reader.readAsDataURL(e.target.files[0])
            setAva(e.target.files[0])
        }

        return (
            <>
                {
                    tag === 'text' &&
                    <textarea
                        className={styles.contentInput}
                        type="text"
                        id="content"
                        onChange={(e) => changeInfo('description', e.target.value, i.number)}
                        value={description}
                    />
                }
                {
                    tag === 'test' &&
                    <>
                        <div className={styles.test}>
                            <div>
                                <input type="text"
                                    className={styles.chapterInput}
                                    onChange={((e) => changeInfo('name', e.target.value, i.number))}
                                    value={name}
                                />
                            </div>
                            {
                                testContent.map((i) => (
                                    <>
                                        <div className={styles.testContent}>
                                            <div key={i.number}>
                                                <input onChange={(e) => changeInfo('answer', e.target.value, number)} type="radio" id="option2" name="option" value={i.number} />
                                                <label for="option2">
                                                    <input
                                                        type="text"
                                                        className={styles.chapterInput}
                                                        onChange={(e) => changeInfoTestButton('description', e.target.value, i.number)}
                                                        value={i.description}
                                                    />
                                                </label>
                                            </div>
                                            <button className={styles.removeButton} onClick={() => removeInfoTestButton(i.number)}>Удалить вариант ответа</button>
                                        </div>
                                    </>
                                ))
                            }
                            <button className={styles.removeButton} onClick={() => addTestButton('test')}>Добавить вариант ответа</button>
                            <button className={styles.removeButton} onClick={() => concatData('description', testContent, number)}>Сохранить тест</button>

                        </div>
                    </>
                }
                {
                    tag === 'img' &&
                    <>
                        <input
                            type="file"
                            onChange={(e) => selectAva(e)}
                        />

                        <div className={styles.img}>
                            <img src={`${"http://localhost:5000/" + courseStore.chapter.imgs}`} className={styles.ava} id="img-preview" alt="" />
                        </div>
                    </>
                }
            </>
        )
    }

    const concatData = (key, value, number) => {
        setCourseContent(courseContent.map(i => (i.number === number ? { ...i, [key]: value } : i)))
    }

    const addElementHandle = () => {
        setShowElements(showElements === true ? false : true)
    }

    const addTestButton = (tag) => {
        setTestContent([...testContent, { description: '', number: Date.now(), tag: tag }])
    }

    const changeInfoTestButton = (key, value, number) => {
        setTestContent(testContent.map(i => (i.number === number ? { ...i, [key]: value } : i)))
    }

    const removeInfoTestButton = (number) => {
        setTestContent(testContent.filter(i => (i.number !== number)))
    }

    const addContent = (tag) => {
        if (tag === 'text') {
            setCourseContent([...courseContent, { description: '', number: Date.now(), tag: tag }])
        }
        if (tag === 'test') {
            setCourseContent([...courseContent, { description: '', number: Date.now(), tag: tag, answer: '', name: '' }])
        }
        if (tag === 'img') {
            setCourseContent([...courseContent, { description: '', number: Date.now(), tag: tag }])
        }
    }

    const changeInfo = (key, value, number) => {
        setCourseContent(courseContent.map(i => (i.number === number ? { ...i, [key]: value } : i)))
    }

    const removeInfo = (number) => {
        setCourseContent(courseContent.filter(i => (i.number !== number)))
    }

    const saveChapterHandler = () => {
        const chapterData = JSON.stringify(courseContent)
        const formdata = new FormData()
        formdata.append('chapter_id', lesson.id)
        formdata.append('chapter_info', chapterData)
        formdata.append('chapter_name', chapterName)
        formdata.append('img', ava)

        courseStore.saveChapter(formdata)
        courseStore.saveLesson(courseStore.lesson.id, lessonName)
    }

    return (
        <>
            <div className={styles.lessonContainer}>
                <div className={styles.lessonName}>
                    <input
                        className={styles.logininput}
                        placeholder={chapterName}
                        type="text"
                        onChange={(e) => setChapterName(e.target.value)}
                        value={chapterName}
                    />
                </div>
                <div className={styles.chapterContent}>
                    {

                        courseContent.map(i => (
                            <div key={i.number} className={styles.popt} id="popts">
                                {RenderArea(i)}
                                <button className={styles.removeButton} onClick={() => removeInfo(i.number)}>Удалить</button>
                            </div>
                        ))
                    }
                </div>
                <div>
                    <button onClick={() => addElementHandle(showElements)} className={styles.addChapterElement}>
                        Добавить элементы в раздел урока
                    </button>
                    {
                        showElements === true &&
                        <>
                            <div className={styles.chapterElements}>
                                <button onClick={() => addContent('text')}>
                                    Текст
                                </button>
                                <button onClick={() => addContent('test')}>
                                    Тест
                                </button>
                                <button onClick={() => addContent('img')}>
                                    Изображение
                                </button>
                            </div>
                        </>
                    }
                </div>
                <button onClick={saveChapterHandler} className={styles.removeButton}>Сохранить</button>
            </div>
        </>
    )
})



export default observer(EditLesson)