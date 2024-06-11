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
            <div className={styles.container}>
                <div>
                    <Header />
                </div>
                <div className={`${styles.content} `}>

                </div>
                <div>
                    <Footer />
                </div>
            </div>
        </>

    )
}

export default observer(Catalog)