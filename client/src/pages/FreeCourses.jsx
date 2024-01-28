import { observer } from "mobx-react-lite";
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CreateCourse from "../components/CreateCourseTitle";
function FreeCourses() {
    return (
        <>
            <Header />
            <div>
                <CreateCourse />
            </div>
            <Footer />
        </>
    )
}

export default observer(FreeCourses)