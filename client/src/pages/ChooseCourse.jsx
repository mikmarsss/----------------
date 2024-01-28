import { observer } from "mobx-react-lite";
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from '../styles/createCourses.module.css'
import { Link } from "react-router-dom";
import { FREE_COURSE, PAY_COURSE } from "../utils";
function ChooseCourse() {
    return (
        <>
            <Header />
            <div className={styles.typesOfCourses}>
                <Link to={FREE_COURSE}>
                    <button>
                        <div className={styles.freeCourses}>
                            <p>
                                бесплатные курсы
                            </p>
                        </div>
                    </button>
                </Link>
                <Link to={PAY_COURSE}>
                    <button>
                        <div className={styles.payCourses}>
                            <p>
                                платные курсы
                            </p>
                        </div>
                    </button>
                </Link >
            </div>
            <Footer />
        </>
    )
}

export default observer(ChooseCourse)