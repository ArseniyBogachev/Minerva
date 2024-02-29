import React from "react";
import classes from "../assets/styles/components/answerModal.module.scss";
import MyButton from "./MyButton.jsx"

const AnswerModal = ({
    cleanStates, 
    currentTypeAnswer, 
    updateAnswerByForm,
    stateModal,
    saveStates, 
    question, 
    file,
    listTypeAnswer,
    optionAnswer,
    setOptionAnswer,
    currentOptionAnswer,
    setCurrentOptionAnswer,
    comment, 
    datetime,
    mandatory,
    setMandatory,
    addOptionAnswer,
    setQuestion,
    setComment,
    setDatetime,
    setCurrentTypeAnswer,
    setFile
    }) => {
    

    return (
        <div class="modal fade myModal" className={classes.myModal} id="answerModal" tabIndex="-1" aria-labelledby="exampleModalLabel" data-bs-backdrop="static" aria-hidden="true">
            <div class="modal-dialog myModal__dialog" className={classes.myModal__dialog}>
                <div class="modal-content" className={classes.myModal__dialog__content}>
                    <div class="modal-header" className={classes.myModal__dialog__content__header}>
                        <h5 class="modal-title" id="exampleModalLabel">Редактирование вопроса</h5>
                        <select value={currentTypeAnswer} onChange={e => setCurrentTypeAnswer(Number(e.target.value))}>
                            {listTypeAnswer.map((item, i) => 
                                <option value={item.id} key={i}>{item.text}</option>
                            )}
                        </select>
                    </div>
                    <div class="modal-body" className={classes.myModal__dialog__content__body}>
                        <div className={classes.myModal__dialog__content__body__answer}>
                            <span className={classes.myModal__dialog__content__body__answer__title}>Вопрос</span>
                            <textarea className={classes.myModal__dialog__content__body__answer__text} value={question} onChange={event => setQuestion(event.target.value)}></textarea>
                            <input 
                                type="file" 
                                multiple 
                                accept="image/*,image/jpeg,video/mp4,video/x-m4v,video/*" 
                                className={classes.myModal__dialog__content__body__answer__file}
                                value={file}
                                onChange={event => setFile(event.target.value)}
                            ></input>                         
                        </div>
                        <div className={classes.myModal__dialog__content__body__comment}>
                            <span className={classes.myModal__dialog__content__body__comment__title}>Комментарий</span>
                            <textarea className={classes.myModal__dialog__content__body__comment__text} value={comment} onChange={event => setComment(event.target.value)}></textarea>
                        </div>
                        {[3, 4, 5].find(item => item === currentTypeAnswer) ? <div className={classes.myModal__dialog__content__body__answerOptions}>
                            <span className={classes.myModal__dialog__content__body__answerOptions__title}>Варианты ответа</span>
                            <div className={classes.myModal__dialog__content__body__answerOptions__list}>
                                {optionAnswer.map((item, i) => 
                                    <span key={i} className={classes.myModal__dialog__content__body__answerOptions__list__answer}>{item.id}) {item.text}</span>
                                )}
                            </div>
                            <input 
                                type="text" 
                                className={classes.myModal__dialog__content__body__answerOptions__text} 
                                value={currentOptionAnswer} 
                                onChange={event => setCurrentOptionAnswer(event.target.value)}/>
                            <MyButton 
                                text={'Добавить'} 
                                click={addOptionAnswer}
                                backgroundColor={'rgb(200, 200, 200)'} 
                                otherStyle={{padding: '1% 2%'}}/>
                        </div> : <div></div>}
                        <div className={classes.myModal__dialog__content__body__mandatory}>
                            <span className={classes.myModal__dialog__content__body__mandatory__title}>Обязательный вопрос</span>
                            <input className={classes.myModal__dialog__content__body__mandatory__choice} type="checkbox" checked={mandatory} onChange={() => setMandatory(!mandatory)}/>
                        </div>
                        <div className={classes.myModal__dialog__content__body__time}>
                            <span>Дедлайн выполнения</span>
                            <input type="datetime-local" value={datetime} onChange={event => setDatetime(event.target.value)}/>
                        </div>
                    </div>
                    <div class="modal-footer myModal__dialog__content__footer" className={classes.myModal__dialog__content__footer}>
                        <button type="button" class="btn btn-light" data-bs-dismiss="modal" onClick={cleanStates}>Отмена</button>
                        <button type="button" class="btn" style={{color: 'white', backgroundColor: 'rgb(150, 209, 158)'}} data-bs-dismiss="modal" onClick={stateModal ? updateAnswerByForm : saveStates}>Сохранить</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AnswerModal;