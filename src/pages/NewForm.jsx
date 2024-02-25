import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import classes from "../assets/styles/newForm.module.scss";
import MyButton from "../components/MyButton.jsx";
import MyModal from "../components/MyModal.jsx";
import { FormsData } from "../context";

const NewForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [dragElem, setDragElem] = useState(null);
    const [dropElem, setDropElem] = useState(null);
    
    const {forms, setForms} = useContext(FormsData);

    const nextID = (list) => {
        return list.length ? list.at(-1).id + 1 : 1
    };
    const [answer, setAnswer] = useState("");
    const [comment, setComment] = useState("");
    const [datetime, setDatetime] = useState("");
    const [mandatory, setMandatory] = useState(false);
    const [file, setFile] = useState([]);
    const [currentTypeAnswer, setCurrentTypeAnswer] = useState("");

    const [newForm, setNewForm] = useState(location.state ? location.state.data : []);

    const [stateModal, setStateModal] = useState(false)

    const [listTypeAnswer, setListTypeAnswer] = useState([
        {id: 1, text: 'Краткий ответ'},
        {id: 2, text: 'Расширенный ответ'},
        {id: 3, text: 'Выбор из вариантов'},
        {id: 4, text: 'Множественный выбор'},
        {id: 5, text: 'Выпадающий список'},
        {id: 6, text: 'Да/Нет'},
        {id: 7, text: 'Файл'},
        {id: 8, text: 'Дата'}
    ]);

    function removeAnswerByForm(id) {
        setNewForm([...newForm.filter(item => item.id !== id)]); 
    }

    function cleanStates() {
        setStateModal(false)
        setAnswer("");
        setComment("");
        setDatetime("");
        setFile("");
        setCurrentTypeAnswer("");
        setMandatory(false);
    }

    function editAnswerByForm(id) {       
        const obj = newForm.find(item => item.id === id);
        setAnswer(obj.answer);
        setComment(obj.comment);
        setDatetime(obj.datetime);
        setFile(obj.file);
        setCurrentTypeAnswer(obj.typeAnswer);
        setMandatory(obj.mandatory)
        setStateModal(id);
    }

    function updateAnswerByForm() {
        setNewForm(newForm.map(item => {
            if (item.id === stateModal) {
                item.answer = answer;
                item.comment = comment;
                item.datetime = datetime;
                item.file = file;
                item.mandatory = mandatory;
                item.typeAnswer = currentTypeAnswer;
            }
            return item
        }))
        cleanStates()
    }

    function saveStates() {
        setNewForm([...newForm, {
            id: nextID(newForm),
            answer: answer,
            typeAnswer: currentTypeAnswer,
            comment: comment,
            datetime: datetime,
            mandatory: mandatory,
            file: file
        }]);
        cleanStates();
    }

    function updateFormByForms() {
        setForms(
            forms.map(item => {
                if (item.id === location.state.id) {
                    item.title = 'Новая форма',
                    item.answers = 'Без изменений',
                    item.update = '01/01/24',
                    item.listAnswer = newForm                
                }
                return item
            })
        )
        cleanStates();
        navigate("/forms");
    }

    function saveForm() {
        setForms(
            [...forms, {
                id: nextID(forms),
                title: 'Новая форма',
                answers: 'Без изменений',
                update: '01/01/24',
                listAnswer: newForm
            }]
        );
        cleanStates();
        navigate("/forms");
    } 

    return (
        <div className={classes.main}>
            <div className={classes.wrapper}>
                <div className={classes.header}> 
                    <div className={classes.header__listBtn}>
                        <MyButton text={'Опубликовать'} click={location.state ? updateFormByForms : saveForm}/>
                        <MyButton text={<i class="fa-solid fa-ellipsis-vertical"></i>} click={() => console.log(newForm)} backgroundColor={'rgb(225, 225, 225)'}/>
                    </div>                   
                </div>
                <div className={classes.content}>
                    <div className={classes.content__listQuestion}>
                        <div className={classes.content__listQuestion__list}>
                            {listTypeAnswer.map((item, i) =>
                                <div className={classes.content__listQuestion__list__item} data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setCurrentTypeAnswer(item.id)} key={i}>
                                    <span>{item.text}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <MyModal 
                        stateModal={stateModal}
                        currentTypeAnswer={currentTypeAnswer} 
                        answer={answer}
                        comment={comment}
                        mandatory={mandatory}
                        datetime={datetime}
                        file={file}
                        listTypeAnswer={listTypeAnswer}
                        setAnswer={setAnswer}
                        setComment={setComment}
                        setDatetime={setDatetime}
                        setFile={setFile}
                        setMandatory={setMandatory}
                        cleanStates={cleanStates}
                        saveStates={saveStates}
                        updateAnswerByForm={updateAnswerByForm}
                        setCurrentTypeAnswer={setCurrentTypeAnswer}/>

                    <div className={classes.content__newForm}>
                        <div className={classes.content__newForm__title}>
                            <h3>Новая форма</h3>
                        </div>                        
                        <div className={classes.content__newForm__list}>
                            {newForm.map((item, i) => 
                                <div 
                                    className={classes.content__newForm__list__item} 
                                    key={i} 
                                    id={i}
                                    draggable="true" 
                                    onDragOver={(event) => {event.preventDefault()}}
                                    onDragStart={(event) => {
                                        if (event.target.id) {
                                            setDragElem(Number(event.target.id))
                                        }
                                    }}
                                    onDragEnter={(event) => {
                                        if (event.target.id) {
                                            setDropElem(Number(event.target.id))
                                        }
                                    }}
                                    onDrop={(event) => {                                       
                                        const currentElem = newForm[dragElem]
                                        const tNewForm = [...newForm]
                                        if (dragElem > dropElem) {
                                            tNewForm.splice(dropElem, 0, currentElem)
                                            tNewForm.splice(dragElem + 1, 1)
                                        }
                                        else {
                                            tNewForm.splice(dropElem + 1, 0, currentElem)
                                            tNewForm.splice(dragElem, 1)
                                        }   
                                        setNewForm(tNewForm)
                                    }}
                                >
                                    <div className={classes.content__newForm__list__item__answer}>
                                        <span>{item.answer}</span>
                                        <span>{listTypeAnswer.map(typeItem => {
                                            if (typeItem.id === item.typeAnswer) {
                                                return typeItem.text
                                            }
                                        })}</span>
                                    </div>
                                    <div className={classes.content__newForm__list__item__btn}>
                                        <i class="fa-solid fa-pen" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => {editAnswerByForm(item.id)}}></i>
                                        <i class="fa-solid fa-trash" onClick={() => removeAnswerByForm(item.id)}></i>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>                  
            </div>
        </div>
    )
}

export default NewForm;