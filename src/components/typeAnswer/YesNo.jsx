import React from "react";
import classes from "../../assets/styles/components/typeAnswer/yesNo.module.scss"

const YesNo = ({postfix, optionAnswer, answers, updateAnswersForm}) => {
    return (
        <div className={classes.main}>
            <div class="form-check">
                <input 
                    class="form-check-input" 
                    type="radio" 
                    name={`YesOrNo_${postfix}`} 
                    id="choiceYes"
                    value="1" 
                    checked={answers ? answers[postfix].answer === "1" : false}
                    onChange={updateAnswersForm ? () => updateAnswersForm("1", postfix) : () => {}}
                />
                <label class="form-check-label" for="choiceYes">Да</label>
            </div>
            <div class="form-check">
                <input 
                    class="form-check-input" 
                    type="radio" 
                    name={`YesOrNo_${postfix}`} 
                    id="choiceNo"
                    value="2" 
                    checked={answers ? answers[postfix].answer === "2" : false}
                    onChange={updateAnswersForm ? () => updateAnswersForm("2", postfix) : () => {}}
                />
                <label class="form-check-label" for="choiceNo">Нет</label>
            </div>
        </div>
    )
}

export default YesNo;