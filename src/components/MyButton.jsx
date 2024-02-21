import React from "react";
import classes from "../assets/styles/components/myButton.module.scss"

const MyButton = () => {
    return (
        <div className={classes.main}>
            <button type="button">Создать</button>
        </div>
    )
}

export default MyButton;