import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from '../styles/editCoursePage.module.css'
import { useParams } from "react-router-dom";
import { Context } from "..";
import { useEffect, useState } from "react";
function EditCoursePage() {
    const { store, courseStore } = useContext(Context)
    const params = useParams()
    const current = params.id
    useEffect(() => {
        getCourse()
    }, [])
    const [dopType, setDopType] = useState(courseStore.course.additional_type)
    const [showDopTypes, setShowDopTypes] = useState(false)
    const [courseContent, setCourseContent] = useState([])
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [ava, setAva] = useState([])
    const [type, setType] = useState('1')

    const addContent = () => {
        setCourseContent([...courseContent, { description: '', number: Date.now() }])
    }

    const changeInfo = (key, value, number) => {
        setCourseContent(courseContent.map(i => (i.number === number ? { ...i, [key]: value } : i)))
    }
    const removeInfo = (number) => {
        setCourseContent(courseContent.filter(i => (i.number !== number)))
    }

    console.log(courseStore.course.img)
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

    const showDopTypesHandler = (show) => {
        if (show === false) {
            setShowDopTypes(true)
        } else {
            setShowDopTypes(false)
        }
    }

    const removedopTegs = (index) => {
        setDopType(dopType.filter(item => (item !== index)))
    }

    async function getCourse() {
        try {
            await courseStore.fetchUserCourse(current)
            if (courseStore.course.course_content) {
                const parsedConent = JSON.parse(courseStore.course.course_content)
                setCourseContent(parsedConent)
            }
        } catch (e) {
            console.log(e)
        }
    }

    const selectAva = (e) => {
        setAva(e.target.files[0])
    }
    console.log(ava)
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
    return (
        <>
            <Header />
            {
                current == courseStore.course.id &&
                <div className={styles.container}>
                    <div className={styles.courseBlock}>
                        <div className={styles.title}>
                            <div>
                                <img className={styles.ava} src={"http://localhost:5000/" + courseStore.course.img} alt="" />
                                <input

                                    type="file"
                                    id="img"
                                    onChange={(e) => selectAva(e)}
                                />
                            </div>
                            <div className={styles.titleName}>
                                <div>
                                    <label htmlFor="name">Название</label>
                                    <input
                                        type="text"
                                        id="name"
                                        placeholder={courseStore.course.name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="price">Цена</label>
                                    <input
                                        type="text"
                                        id="price"
                                        placeholder={courseStore.course.price}
                                        onChange={(e) => setPrice(e.target.value)}

                                    />
                                </div>
                                <div>
                                    <label htmlFor="description">Описание</label>
                                    <textarea
                                        type="text"
                                        id="description"
                                        placeholder={courseStore.course.description}
                                        onChange={(e) => setDescription(e.target.value)}

                                    />
                                </div>
                                <div>
                                    <label htmlFor="type">Выберите основной тип</label>
                                    <select id="type" onChange={e => setType(e.target.value)}>
                                        <option selected value="1">Программирование</option>
                                        <option value="2">Дизайн</option>
                                        <option value="3">Маркетинг</option>
                                        <option value="4">Тестирование</option>
                                    </select>
                                </div>
                                <div>
                                    {
                                        <>
                                            <label htmlFor="choosedTypes">выбранные теги</label>
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
                                        </>
                                    }
                                    <label htmlFor="doptype">Выберите дополнительные теги</label>
                                    <button
                                        className={styles.showDopTypes}
                                        id="doptype"
                                        onClick={() => showDopTypesHandler(showDopTypes)}
                                    >Показать теги</button>
                                    {
                                        showDopTypes === true &&
                                        <div className={styles.dopTypes}>
                                            {icons.map(item => (
                                                <button key={item.id} onClick={() => addDopTypesHandler(item.id)}>
                                                    <img className={styles.ava} src={`http://localhost:5000/${item.name}.svg`} alt="" />
                                                    <p>{item.name}</p>
                                                </button>
                                            ))}
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className={styles.body}>
                            {
                                courseContent.map(i => (
                                    <div key={i.number}>
                                        <label htmlFor="content">Пункт </label>
                                        <input
                                            type="text"
                                            id="content"
                                            value={i.description}
                                            placeholder={i.description}
                                            onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                        />
                                        <button onClick={() => removeInfo(i.number)}>Удалить</button>
                                    </div>
                                ))
                            }
                            <button onClick={addContent}>Добавить пункт</button>
                        </div>
                        <div className={styles.saveButtonBlock} onClick={saveData}>
                            <button>Сохранить</button>
                        </div>
                    </div>

                </div>
            }
            <Footer />
        </>
    )
}

export default observer(EditCoursePage)