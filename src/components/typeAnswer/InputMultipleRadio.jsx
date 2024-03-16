import React from "react";
import classes from "../../assets/styles/components/typeAnswer/inputMultiple.module.scss"

const InputMultipleRadio = (props) => {
    return (
        <div className={classes.main}>
            {props.optionAnswer.map((item, i) => 
                <div class="form-check" key={i}>
                    <input class="form-check-input" type="checkbox" name={`inputMultiple_${props.postfix}`} id={`inputMultiple_${props.postfix}`}/>
                    <label class="form-check-label" for={`inputMultiple_${props.postfix}`}>{item.text}</label>
                </div>
            )}
        </div>
    )
}

export default InputMultipleRadio;