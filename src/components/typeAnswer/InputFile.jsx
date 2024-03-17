import React, { useState } from "react";
import classes from "../../assets/styles/components/typeAnswer/inputFile.module.scss"

const InputFile = ({postfix, optionAnswer, answers, updateAnswersForm}) => {
    return (
        <div className={classes.main}>
            <input
                type="file" 
                multiple
                accept="image/*,image/jpeg,video/mp4,video/x-m4v,video/*" 
                className={classes.myModal__dialog__content__body__answer__file}
                value={answers ? answers[postfix].answer : ""} 
                onChange={updateAnswersForm ? (e) => updateAnswersForm(e.target.value, postfix) : () => {}}
            ></input> 
        </div>
    )
}

export default InputFile;