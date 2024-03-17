import React from "react";
import classes from "../../assets/styles/components/typeAnswer/textArea.module.scss"

const TextArea = ({postfix, optionAnswer, answers, updateAnswersForm}) => {
    return (
        <div className={classes.main}>
            <textarea 
                placeholder={"Ответ..."} 
                value={answers ? answers[postfix].answer : ""} 
                onChange={updateAnswersForm ? (e) => updateAnswersForm(e.target.value, postfix) : () => {}}
            ></textarea>
        </div>
    )
}

export default TextArea;