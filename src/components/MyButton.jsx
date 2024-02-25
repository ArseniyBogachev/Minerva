import React from "react";
import classes from "../assets/styles/components/myButton.module.scss"

const MyButton = (props) => {

    return (
        <div className={classes.main}>
            <button 
                type="button"
                class={props.class} 
                onClick={props.click}
                style={{backgroundColor: props.backgroundColor, ...props.otherStyle}}>
                    {props.text}
            </button>
        </div>
    )
}

export default MyButton;