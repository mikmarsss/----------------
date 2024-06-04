import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from '../styles/editCoursePage.module.css'
import { useParams } from "react-router-dom";
import { Context } from "..";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { COURSES_CONTENT } from "../utils";
function EditCoursePage() {
    const { store, courseStore } = useContext(Context)
    const params = useParams()
    const current = params.id
    useEffect(() => {
        getCourse()
    }, [])
    const [dopType, setDopType] = useState(courseStore.course.additional_type)
    const [courseContent, setCourseContent] = useState([])
    const [name, setName] = useState(courseStore.course.name)
    const [price, setPrice] = useState(courseStore.course.price)
    const [description, setDescription] = useState(courseStore.course.description)
    const [coursseLogo, setCourseLogo] = useState('')
    const [ava, setAva] = useState([])
    const [type, setType] = useState(`${courseStore.course.type}`)
    const [tags, setTags] = useState([])

    const addContent = () => {
        setCourseContent([...courseContent, { description: '', number: Date.now() }])
    }

    const changeInfo = (key, value, number) => {
        setCourseContent(courseContent.map(i => (i.number === number ? { ...i, [key]: value } : i)))
    }

    const removeInfo = (number) => {
        setCourseContent(courseContent.filter(i => (i.number !== number)))
    }

    const icons = [
        {
            id: 1,
            name: 'angular',
        },
        {
            id: 2,
            name: 'bootstrap',
        },
        {
            id: 3,
            name: 'c',
        },
        {
            id: 4,
            name: 'cshj',
        },
        {
            id: 5,
            name: 'c++',
        },
        {
            id: 6,
            name: 'github',
        },
        {
            id: 7,
            name: 'go-lang',
        },
        {
            id: 8,
            name: 'html5',
        },
        {
            id: 9,
            name: 'java',
        },
        {
            id: 10,
            name: 'js',
        },
        {
            id: 11,
            name: 'mysql',
        },
        {
            id: 12,
            name: 'nodejs',
        },
        {
            id: 13,
            name: 'php',
        },
        {
            id: 14,
            name: 'postgresql',
        },
        {
            id: 15,
            name: 'python',
        },
        {
            id: 16,
            name: 'react',
        },
        {
            id: 17,
            name: 'sql-server',
        },
        {
            id: 18,
            name: 'swift',
        },
        {
            id: 19,
            name: 'typescript',
        },
        {
            id: 20,
            name: 'unity',
        },
        {
            id: 21,
            name: 'visual-studio',
        },
        {
            id: 22,
            name: 'vue',
        },
        {
            id: 23,
            name: 'wordpress',
        },
    ]

    const addDopTypesHandler = (id) => {
        setDopType(prev => [...prev, id])

    }


    const removedopTegs = (index) => {
        setDopType(dopType.filter(item => (item !== index)))
    }

    async function getCourse() {
        try {
            await courseStore.fetchUserCourse(current)
            setCourseLogo(`${"http://localhost:5000/" + courseStore.course.img}`)

            if (courseStore.course.course_content) {
                const parsedConent = JSON.parse(courseStore.course.course_content)
                setCourseContent(parsedConent)
            }
        } catch (e) {
            console.log(e)
        }
    }

    const selectAva = (e) => {
        var reader = new FileReader()
        reader.onload = function () {
            var preview = document.querySelector('#img-preview')
            preview.src = reader.result
        }
        reader.readAsDataURL(e.target.files[0])
        setAva(e.target.files[0])
    }

    const saveData = () => {
        const formdata = new FormData()
        formdata.append('courseId', courseStore.course.id)
        formdata.append('name', name)
        formdata.append('price', price)
        formdata.append('description', description)
        formdata.append('courseContent', JSON.stringify(courseContent))
        formdata.append('img', ava)
        formdata.append('type', type)
        dopType.forEach((index, item) => {
            formdata.append('additional_type', index)
        })
        courseStore.saveCourseData(formdata)
    }

    const findTag = (e) => {
        let pattern = e.target.value
        let result = icons.filter(item => item.name.startsWith(pattern))
        setTags(result)
        console.log(tags)
    }
    return (
        <>
            <div className={styles.container}>
                <div>
                    <Header />
                </div>
                {
                    current == courseStore.course.id &&
                    <div className={`${styles.courseBlock} ${styles.glass}`}>
                        <div className={styles.title}>
                            <div className={styles.imgfield}>
                                <img className={styles.ava} id="img-preview" src={coursseLogo} alt="" />
                                <label className={styles.inputFiles}>
                                    <input
                                        type="file"
                                        id="img"
                                        onChange={(e) => selectAva(e)}
                                    />
                                    <span className={styles.inputButton}>Выберите файл</span>
                                </label>
                            </div>
                            <div className={styles.titleName}>
                                <div>
                                    <label htmlFor="name">Название</label>
                                    <input
                                        className={styles.logininput}
                                        type="text"
                                        id="name"
                                        placeholder={courseStore.course.name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="description">Описание</label>
                                    <textarea
                                        className={styles.contentInput}
                                        type="text"
                                        id="description"
                                        placeholder={courseStore.course.description}
                                        onChange={(e) => setDescription(e.target.value)}

                                    />
                                </div>
                            </div>
                        </div>
                        <div className={styles.body}>
                            <div className={styles.maintype}>
                                <p>Чтобы ваш курс было проще найти,
                                    <label className={styles.help} htmlFor="type"> выберите основной тег</label>
                                </p>
                                <div className={styles.maintypes}>
                                    <button className={`${type === '1' ? styles.selected : false}`} onClick={() => setType('1')}>Программирование</button>
                                    <button className={`${type === '2' ? styles.selected : false}`} onClick={() => setType('2')}>Дизайн</button>
                                    <button className={`${type === '3' ? styles.selected : false}`} onClick={() => setType('3')}>Маркетинг</button>
                                    <button className={`${type === '4' ? styles.selected : false}`} onClick={() => setType('4')}>Тестирование</button>
                                </div>
                            </div>

                            <div className={styles.searchtag}>
                                <label htmlFor="tags">Введите теги</label>
                                <input
                                    className={styles.logininput}
                                    type="text"
                                    id="tags"
                                    placeholder="Введите дополнительные теги"
                                    onChange={(e) => findTag(e)}
                                />
                            </div>

                            <div className={styles.dopTypes}>
                                {
                                    tags && tags.length !== 23 &&
                                    tags.map(item => (
                                        <button key={item.id} onClick={() => addDopTypesHandler(item.id)}>
                                            <img src={`http://localhost:5000/${item.name}.svg`} alt="" />
                                            <p>{item.name}</p>
                                        </button>
                                    ))
                                }
                            </div>

                            <div className={styles.doptags}>
                                <label className={styles.tagslabel} htmlFor="choosedTypes">Выбранные теги</label>
                                <div className={styles.choosedTypes} id="choosedTypes">
                                    {icons.filter(item => dopType.includes(item.id)).map(item => (
                                        <div key={item.id}>

                                            <div className={styles.tegblock}>
                                                <img src={`http://localhost:5000/${item.name}.svg`} alt="" />
                                                <button className={styles.deleteButton} onClick={() => removedopTegs(item.id)}>x</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={styles.content}>
                                <label className={styles.tagslabel} htmlFor="popts">Опишите в кратце что будет в вашем курсе</label>
                                {
                                    courseContent.map(i => (
                                        <div key={i.number} className={styles.popt} id="popts">
                                            <label htmlFor="content">Пункт </label>
                                            <input
                                                className={styles.logininput}
                                                type="text"
                                                id="content"
                                                value={i.description}
                                                placeholder={i.description}
                                                onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                            />
                                            <button className={styles.removeButton} onClick={() => removeInfo(i.number)}>Удалить</button>
                                        </div>
                                    ))
                                }
                                <div>
                                    <button className={styles.removeButton} onClick={addContent}>Добавить пункт</button>
                                </div>
                            </div>
                        </div>
                        <div className={styles.saveButtonBlock} onClick={saveData}>
                            <button className={styles.removeButton}>Сохранить</button>
                        </div>
                        <Link to={COURSES_CONTENT + `/${courseStore.course.id}`}>
                            <div className={styles.saveButtonBlock}>
                                <button className={styles.removeButton}>Редактировать модули</button>
                            </div>
                        </Link>
                    </div>
                }
                <div className={styles.footer}>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default observer(EditCoursePage)