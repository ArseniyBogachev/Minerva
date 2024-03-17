import React from "react";
import classes from "../../assets/styles/components/typeAnswer/inputRadio.module.scss"

const InputRadio = (props) => {
    return (
        <div className={classes.main}>
            {props.optionAnswer.map((item, i) => 
                <div class="form-check" key={i}>
                    <input 
                        class="form-check-input" 
                        type="radio" 
                        name={`inputRadio_${props.postfix}`} 
                        id={`choice_${item.id}`} 
                        value={i} 
                        checked={props.answers ? props.answers[props.id].answer === i : false}
                        onChange={props.updateAnswersForm ? (e) => props.updateAnswersForm(Number(e.target.value), props.id) : () => {}}
                    />
                    <label class="form-check-label" for={`inputRadio_${props.postfix}`}>{item.text}</label>
                </div>
            )}
            
        </div>
    )
}

export default InputRadio;