import React from "react";
import classes from "../../assets/styles/components/typeAnswer/inputText.module.scss"

const InputText = ({postfix, optionAnswer, answers, updateAnswersForm}) => {
    return (
        <div className={classes.main}>
            <input 
                type="text" 
                placeholder={"Ответ..."} 
                value={answers ? answers[postfix].answer : ""} 
                onChange={updateAnswersForm ? (e) => updateAnswersForm(e.target.value, postfix) : () => {}}/>
        </div>
    )
}

export default InputText;