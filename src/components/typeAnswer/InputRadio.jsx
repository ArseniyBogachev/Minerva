import React from "react";
import classes from "../../assets/styles/components/typeAnswer/inputRadio.module.scss"

const InputRadio = ({postfix, optionAnswer, answers, updateAnswersForm}) => {
    return (
        <div className={classes.main}>
            {optionAnswer.map((item, i) => 
                <div class="form-check" key={i}>
                    <input 
                        class="form-check-input" 
                        type="radio" 
                        name={`inputRadio_${postfix}`} 
                        id={`choice_${item.id}`} 
                        value={i}  
                        checked={answers ? answers[postfix].answer === i : false}
                        onChange={updateAnswersForm ? (e) => updateAnswersForm(Number(e.target.value), postfix) : () => {}}
                    />
                    {/* <label class="form-check-label" for={`inputRadio_${postfix}`}>{item.text ? item.text : item[1].Value}</label> */}
                    <label class="form-check-label" for={`inputRadio_${postfix}`}>{item.text}</label>
                </div>
            )}
            
        </div>
    )
}

export default InputRadio;