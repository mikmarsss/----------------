import { observer } from "mobx-react-lite";
import React from "react";
import Header from "../components/Header";

function PersonalPage() {
    return (
        <>
            <Header />
        </>
    )
}

export default observer(PersonalPage)