import React, { useState } from "react";
import classes from "../../assets/styles/components/typeAnswer/dropDownList.module.scss"

const DropDownList = (props) => {
    return (
        <div className={classes.main}>
            {/* <select value={value} onChange={e => setValue(e.target.value)}>
                {props.answers.map((item, i) => 
                    <option value={item.id} key={i}>{item.text}</option>
                )}
            </select> */}
            <select>
                {props.optionAnswer.map((item, i) => 
                    <option value={item.id} key={i}>{item.text}</option>
                )}
            </select>
        </div>
    )
}

export default DropDownList;