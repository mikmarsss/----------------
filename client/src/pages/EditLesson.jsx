import React, { useContext, useEffect, useState } from "react";
import styles from '../styles/editLesson.module.css'
import { observer } from "mobx-react-lite";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Context } from "..";
import { useParams } from "react-router-dom";
import CoursesService from "../service/CoursesService";
import plus from '../Images/plus.svg'
import 'react-quill/dist/quill.snow.css';
import TextEditor from "../components/TextEditor";
import ChapterTest from "../components/ChapterTest";
import ChapterMultiTest from "../components/ChapterMultiTest";
import textIcon from '../Images/textIcon.svg'
import radioBtn from '../Images/radioBtn.svg'
import checkBox from '../Images/checkBox.svg'

function EditLesson() {
    const { store, courseStore } = useContext(Context)
    const params = useParams()
    const current = params.id
    const [chapters, setChapters] = useState([])
    const [chapter, setChapter] = useState({})
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
                // console.log(dataArray[0])
                // setChapter(dataArray[dataArray.length - 1])
            } else {
                console.error('Ожидался массив, но получен другой тип данных:', dataArray);
                setChapters([]); // Установка пустого массива в случае ошибки
            }
        } catch (e) {
            console.log(e)
        }
    }

    const chapterHandler = (item, index) => {
        setChapter(item)
        setAddChapterClicker(addChapterClicker === true ? false : true)
        localStorage.setItem('chapterId', item.id)
    }

    async function addChapterHandler(index) {
        await courseStore.createChapter(index)
        localStorage.setItem('chapter', chapters.length)
        setAddChapterClicker(addChapterClicker === true ? false : true)
    }

    return (
        <>
            <div className={styles.container}>
                <div>
                    <Header />
                </div>
                {
                    current == courseStore.lesson.id &&
                    <>
                        <div className={`${styles.content} `}>
                            <div className={`${styles.title} ${styles.glass}`}>
                                <div >
                                    {courseStore.module.name}
                                </div>
                                <div className={styles.lessonname}>
                                    <input type="text"
                                        className={styles.logininput}
                                        placeholder={lessonName}
                                        onChange={(e) => setLessonName(e.target.value)}
                                        value={lessonName}
                                    />
                                </div>
                            </div>

                            <div className={`${styles.lessoncontainer} ${styles.glass}`}>
                                <div className={styles.chapterZagolovok}>
                                    Разделы урока
                                </div>
                                <div className={styles.chaptersBar}>
                                    {
                                        chapters.map((item, index) => (
                                            <>
                                                <button onClick={() => chapterHandler(item, index)} key={index} className={`${localStorage.getItem('chapterId') == item.id ? styles.selectedChapterBox : styles.chapterBox}`}>
                                                </button>
                                            </>
                                        ))
                                    }
                                    <button onClick={() => addChapterHandler(current)} className={styles.addcChapterBox}>
                                        <img src={plus} className={styles.addChapter} alt="" />
                                    </button>
                                </div>
                                <div className={styles.body}>
                                    {
                                        chapter &&
                                        <ChapterInfo chapter={chapter} lessonName={lessonName} />
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
                <div>
                    <Footer />
                </div>
            </div>
        </>
    )
}

const ChapterInfo = observer(({ chapter, lessonName }) => {
    const { store, courseStore } = useContext(Context)
    const [showElements, setShowelements] = useState(false)
    const [element, setElement] = useState('')
    const [chapterContent, setChapterContent] = useState([])
    const [chapterInfo, setChapterInfo] = useState([])
    const [chapterName, setChapterName] = useState()
    const [ava, setAva] = useState()
    console.log(ava)

    function isJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    function getChapter() {
        setChapterName(chapter.name)
        setAva(chapter.imgs)
        if (!isJsonString(chapter.content)) {
            setChapterContent([])
        } else {
            const parsedContent = JSON.parse(chapter.content)
            setChapterContent([parsedContent])
        }

        // const parsedContent = JSON.parse(chapter.content)
        //console.log(chapter.content)
        // setChapterContent([parsedContent])
    }

    useEffect(() => {
        getChapter()

    }, [chapter])

    const showElementsHandler = (state) => {
        setShowelements(state)
    }

    const textDescriptionHandler = (result, ava) => {
        setAva(ava)
        setChapterInfo(result)
    }

    const testDescriptionHandler = (result, ava) => {
        setAva(ava)
        setChapterInfo(result)
    }

    const addElement = (tag) => {
        if (tag === 'text') {

            setChapterContent([...chapterContent, { description: '', number: Date.now(), tag: tag }])
        }
        if (tag === 'test') {
            setChapterContent([...chapterContent, { description: '', number: Date.now(), tag: tag, answer: '', name: '' }])
        }
        if (tag === 'testMulti') {
            setChapterContent([...chapterContent, { description: '', number: Date.now(), tag: tag, answer: [], name: '' }])
        }
        if (tag === 'video') {
            setChapterContent([...chapterContent, { description: '', number: Date.now(), tag: tag }])
        }
    }

    const saveChapterHandler = () => {
        const chapterData = JSON.stringify(chapterInfo)
        const formdata = new FormData()
        formdata.append('chapter_id', chapter.id)
        formdata.append('chapter_info', chapterData)
        formdata.append('chapter_name', chapterName)
        formdata.append('img', ava)
        // formdata.append('video', video)
        courseStore.saveChapter(formdata)
        courseStore.saveLesson(courseStore.lesson.id, lessonName)
    }

    const removeInfo = (number) => {
        setChapterContent(chapterContent.filter(i => (i.number !== number)))
        setChapterInfo([])
    }



    const RenderArea = (i) => {
        return (
            <>
                {
                    i.tag === 'text' &&
                    <>
                        <div>
                            <TextEditor chapter={i} img={ava} onTextHandler={textDescriptionHandler} />
                        </div>
                    </>
                }
                {
                    i.tag === 'test' &&
                    <>
                        <div>
                            <ChapterTest chapter={i} img={ava} onTestHandler={testDescriptionHandler} />
                        </div>
                    </>
                }
                {
                    i.tag === 'testMulti' &&
                    <>
                        <div>
                            <ChapterMultiTest chapter={i} img={ava} onTestHandler={testDescriptionHandler} />
                        </div>
                    </>
                }
            </>
        )
    }

    const nameHandler = (e) => {
        setChapterName(e.target.value)
    }

    return (
        <>
            <div className={styles.chapterContainer}>
                <div className={styles.chapterName}>
                    <input
                        onChange={(e) => nameHandler(e)}
                        type="text"
                        className={styles.logininput}
                        placeholder={chapter.name}
                        value={chapter.name}
                    />
                </div>
                <div className={styles.listElements}>
                    {
                        showElements === false &&
                        <button onClick={() => showElementsHandler(true)}>
                            Показать элементы
                        </button>
                    }
                    {
                        showElements === true &&
                        <>
                            <div className={`${styles.elementsBar}`}>
                                <div className={styles.elements}>
                                    <div className={styles.text}>
                                        <button>
                                            <div>
                                                <img className={styles.textIcon} src={textIcon} alt="" />
                                                <button onClick={() => addElement('text')}>Текст</button>
                                            </div>
                                        </button>
                                    </div>
                                    <div className={styles.testelements}>
                                        <button>
                                            <div>
                                                <img className={styles.textIcon} src={radioBtn} alt="" />
                                                <button onClick={() => addElement('test')}>Тест <p>(один ответ)</p></button>
                                            </div>
                                        </button>
                                        <button>
                                            <div>
                                                <img className={styles.textIcon} src={checkBox} alt="" />
                                                <button onClick={() => addElement('testMulti')}>Тест <p>(несколько ответов)</p></button>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                                <button className={styles.hideElements} onClick={() => showElementsHandler(false)}>
                                    Скрыть элементы
                                </button>
                            </div>

                        </>
                    }
                </div>
                <div className={styles.chapterContent}>
                    {
                        chapterContent.map(i => (
                            <div key={i.number} className={styles.popt} id="popts">
                                {RenderArea(i)}
                                <button className={styles.removeButton} onClick={() => removeInfo(i.number)}>Удалить элемент</button>
                            </div>
                        ))
                    }
                </div>
                <button onClick={saveChapterHandler} className={styles.removeButton}>Сохранить</button>
            </div >

        </>
    )

})



export default observer(EditLesson)