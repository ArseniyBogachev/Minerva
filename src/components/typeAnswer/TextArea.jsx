import React from "react";
import classes from "../../assets/styles/components/typeAnswer/textArea.module.scss"

const TextArea = (props) => {
    return (
        <div className={classes.main}>
            <textarea 
                placeholder={"Ответ..."} 
                value={props.answers ? props.answers[props.id].answer : ""} 
                onChange={props.updateAnswersForm ? (e) => props.updateAnswersForm(e.target.value, props.id) : () => {}}
            ></textarea>
        </div>
    )
}

export default TextArea;