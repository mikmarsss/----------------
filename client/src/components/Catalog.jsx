import React from "react";
import Header from "./Header";
import { observer } from "mobx-react-lite";

function Catalog() {
    return (
        <>
            <Header />
        </>
    )
}

export default observer(Catalog)