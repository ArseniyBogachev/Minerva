import React from "react";
import classes from "../../assets/styles/components/typeAnswer/inputText.module.scss"

const InputText = (props) => {
    return (
        <div className={classes.main}>
            <input 
                type="text" 
                placeholder={"Ответ..."} 
                value={props.answers ? props.answers[props.id].answer : ""} 
                onChange={props.updateAnswersForm ? (e) => props.updateAnswersForm(e.target.value, props.id) : () => {}}/>
        </div>
    )
}

export default InputText;