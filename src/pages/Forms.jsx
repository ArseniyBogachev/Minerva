import React from "react";
import classes from "../assets/styles/forms.module.scss"
import MyButton from "../components/MyButton.jsx";
import MyInput from "../components/MyInput.jsx";

const Forms = () => {
    return (
        <div className={classes.main}>
            <div className={classes.wrapper}>
                <div className={classes.panel}>
                    <MyInput/>
                    <MyButton/>
                </div>
                <div className={classes.listForms}></div>
            </div>
        </div>
    )
}

export default Forms;