import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import styles from '../styles/createCourses.module.css'
import { Link } from "react-router-dom";
import { COURSES_CONTENT } from "../utils";
import { Context } from "..";

function CreateCourse() {
    const { courseStore, store } = useContext(Context)
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [courseContent, setCourseContent] = useState([])
    const [ava, setAva] = useState([])
    const [type, setType] = useState('1')
    const [dopType, setDopType] = useState([1, 2, 3, 4])


    const selectAva = (e) => {
        setAva(e.target.files[0])
    }

    const addContent = () => {
        setCourseContent([...courseContent, { description: '', number: Date.now() }])
    }

    const changeInfo = (key, value, number) => {
        setCourseContent(courseContent.map(i => (i.number === number ? { ...i, [key]: value } : i)))
    }
    const removeInfo = (number) => {
        setCourseContent(courseContent.filter(i => (i.number !== number)))
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
    console.log(courseStore.course.id)
    console.log(store.user.id)
    return (

        <>

            <div className={styles.mainInfo}>
                <div className={styles.leftBlock}>
                    <div>
                        <label htmlFor="img">Картинка</label>
                        <input

                            type="file"
                            id="img"
                            onChange={(e) => selectAva(e)}
                        />
                    </div>
                </div>
                <div className={styles.rightBlock}>
                    <div>
                        <label htmlFor="price">Введите цену</label>
                        <input
                            value={price}
                            type="text"
                            id="price"
                            onChange={e => setPrice(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="name">Введите название</label>
                        <input
                            value={name}
                            type="text"
                            id="name"
                            onChange={e => setName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="description">Введите описание</label>
                        <textarea
                            value={description}
                            type="text"
                            id="description"
                            onChange={e => setDescription(e.target.value)}
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
                    {/* <div>
                        <label htmlFor="doptype">Выберите основной тип</label>
                        <select id="doptype" onChange={e => setDopType(e.target.value)}>
                            <option selected value="1">C++</option>
                            <option value="2">JavaScript</option>
                            <option value="3">Java</option>
                            <option value="4">GO</option>
                        </select>
                    </div> */}
                    <div className={styles.courseContent}>
                        {
                            courseContent.map(i => (
                                <div key={i.number}>
                                    <label htmlFor="content">Пункт </label>
                                    <input
                                        type="text"
                                        id="content"
                                        value={i.description}
                                        onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                    />
                                    <button onClick={() => removeInfo(i.number)}>Удалить</button>
                                </div>
                            ))
                        }
                        <button onClick={addContent}>Добавить пункт</button>
                    </div>
                </div>
            </div>

            <Link to={COURSES_CONTENT + `/${courseStore.course.id}`}>
                <button onClick={saveData} className={styles.saveButton}>СОХРАНИТЬ</button>
            </Link>
        </>
    )
}




export default observer(CreateCourse) 