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
import { TEST_PAGE } from "../utils";
import { Link } from "react-router-dom";
function Catalog() {
    const { store, courseStore } = useContext(Context)



    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.catalog}>
                    <div className={styles.left}>
                        <div >
                            <Link to={TEST_PAGE + `/${store.user.id}`}>
                                <button className={styles.upl}>
                                    <h1>ПРОФ ОРИЕНТАЦИЯ</h1>
                                    <p>пройдите тест и узнайте какая роль в IT подходит именно вам</p>
                                </button>
                            </Link>
                        </div>
                        <div className={styles.downl}>

                        </div>
                    </div>

                    <div className={styles.right}>
                        <div className={styles.upr}>

                        </div>
                        <div className={styles.downr}>

                        </div>
                    </div>
                </div>
            </div>
            <Footer />

        </>

    )
}

export default observer(Catalog)