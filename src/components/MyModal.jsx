import React from "react";
import classes from "../assets/styles/components/myModal.module.scss";

const MyModal = ({
    cleanStates, 
    currentTypeAnswer, 
    updateAnswerByForm,
    stateModal,
    saveStates, 
    answer, 
    file,
    listTypeAnswer,
    comment, 
    datetime,
    setAnswer,
    setComment,
    setDatetime,
    setCurrentTypeAnswer,
    setFile
    }) => {
    

    return (
        <div class="modal fade myModal" className={classes.myModal} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" data-bs-backdrop="static" aria-hidden="true">
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
                            <textarea className={classes.myModal__dialog__content__body__answer__text} value={answer} onChange={event => setAnswer(event.target.value)}></textarea>
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

export default MyModal;