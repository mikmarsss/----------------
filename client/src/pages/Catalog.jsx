import React, { useContext, useState } from "react";
import Header from "../components/Header";
import { observer } from "mobx-react-lite";
import Footer from "../components/Footer";
import styles from "../styles/catalog.module.css"
import CourseBlock from "../components/CourseBlock";
import { courses } from "../data/coursesData"
import bookforbutt from "../Images/bookforbutt.svg"
import Image from "../components/Image";
import { Context } from "..";

function Catalog() {
    const { store } = useContext(Context)
    const [selectTheme, setSelectTheme] = useState("1")
    const handleClick = (id) => {
        switch (id) {
            case "1":
                setSelectTheme("1")

                break;
            case "2":
                setSelectTheme("2")
                break;
            case "3":
                setSelectTheme("3")
                break;
            case "4":
                setSelectTheme("4")
                break;
            case "5":
                setSelectTheme("5")
                break;
            case "6":
                setSelectTheme("6")
                break;
            case "popular":
                setSelectTheme("popular")
                break;
        }

    }

    const coursesBlocks = courses.filter(courses => courses.tag === selectTheme, courses => courses.popular === "popular").map((item) => (
        <CourseBlock
            tag={item.tag}
            id={item.id}
            name={item.name}
            description={item.description}
            cost={item.cost}
            img={item.img}
            author={item.author}
            point={item.point}
            time={item.time}
            buyer={item.buyer}
        />
    ))

    return (
        <>
            <Header />
            <div className={styles.centerpos}>
                <div className={styles.container}>
                    <div className={styles.zagolovok}>
                        <h1>КУРСЫ</h1>
                    </div>
                    <div className={styles.buttons}>
                        <button onClick={() => handleClick("1")} className={`${selectTheme === "1" ? styles.underlinedecor : styles.non}`}>Программирование</button>
                        <button onClick={() => handleClick("2")} className={`${selectTheme === "2" ? styles.underlinedecor : styles.non}`}>Дизайн</button>
                        <button onClick={() => handleClick("3")} className={`${selectTheme === "3" ? styles.underlinedecor : styles.non}`}>Маркетинг</button>
                        <button onClick={() => handleClick("4")} className={`${selectTheme === "4" ? styles.underlinedecor : styles.non}`}>Моделирование</button>
                        <button onClick={() => handleClick("5")} className={`${selectTheme === "5" ? styles.underlinedecor : styles.non}`}>Тестирование</button>
                        <button onClick={() => handleClick("6")} className={`${selectTheme === "6" ? styles.underlinedecor : styles.non}`}>Аналитика</button>
                        <button onClick={() => handleClick("popular")} className={`${selectTheme === "popular" ? styles.underlinedecor : styles.non}`}>Популярное</button>
                    </div>
                    <div ><hr className={styles.linia} /></div>
                    <div className={styles.courses}>{coursesBlocks}</div>
                    <div className={styles.ourcourses}>
                        <button>
                            <div className={styles.our}>
                                НАШИ КУРСЫ
                            </div>
                        </button>
                        <button>
                            <div className={styles.schoolSub}>
                                <Image image={bookforbutt} alt={"book"} />
                                ОГЭ ЕГЭ
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            <div className={styles.footer}>
                <Footer />
            </div>
        </>

    )
}

export default observer(Catalog)