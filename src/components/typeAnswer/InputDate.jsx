import React from "react";
import classes from "../../assets/styles/components/typeAnswer/inputDate.module.scss"

const InputDate = ({postfix, optionAnswer, answers, updateAnswersForm}) => {
    return (
        <div className={classes.main}>
            <input 
                type="datetime-local" 
                value={answers ? answers[postfix].answer : ""} 
                onChange={updateAnswersForm ? (e) => updateAnswersForm(e.target.value, postfix) : () => {}}
            />
        </div>
    )
}

export default InputDate;