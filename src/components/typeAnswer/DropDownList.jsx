import React, { useState } from "react";
import classes from "../../assets/styles/components/typeAnswer/dropDownList.module.scss"

const DropDownList = ({postfix, optionAnswer, answers, updateAnswersForm}) => {
    console.log(optionAnswer)
    return (
        <div className={classes.main}>
            <select 
                value={answers ? answers[postfix].answer : ""} 
                onChange={updateAnswersForm ? (e) => updateAnswersForm(e.target.value, postfix) : () => {}}
            >
                <option selected disabled></option>
                {optionAnswer.map((item, i) => 
                    <option value={item.text} key={i}>{item.text}</option>
                )}
            </select>
        </div>
    )
}

export default DropDownList;