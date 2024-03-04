import React from "react";
import classes from "../../assets/styles/components/typeAnswer/textArea.module.scss"

const TextArea = (props) => {
    return (
        <div className={classes.main}>
            <textarea placeholder={"Ответ..."}></textarea>
        </div>
    )
}

export default TextArea;