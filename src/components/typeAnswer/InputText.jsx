import React from "react";
import classes from "../../assets/styles/components/typeAnswer/inputText.module.scss"

const InputText = (props) => {
    return (
        <div className={classes.main}>
            <input type="text" placeholder={"Ответ..."}/>
        </div>
    )
}

export default InputText;