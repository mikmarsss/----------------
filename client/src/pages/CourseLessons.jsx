import { observer } from "mobx-react-lite";
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";


function CourseLessons() {
    return (
        <>
            <Header />
            <Footer />
        </>
    )
}

export default observer(CourseLessons)