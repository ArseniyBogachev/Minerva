import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import classes from "../assets/styles/newForm.module.scss";
import MyButton from "../components/MyButton.jsx";
import AnswerModal from "../components/AnswerModal.jsx";
import PreviewModal from "../components/PreviewModal.jsx"
import { FormsData, TypeAnswerData } from "../context";

const NewForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [dragElem, setDragElem] = useState(null);
    const [dropElem, setDropElem] = useState(null);
    
    const {forms, setForms} = useContext(FormsData);
    const {listTypeAnswer, setListTypeAnswer} = useContext(TypeAnswerData);

    const nextID = (list) => {
        return list.length ? list.at(-1).id + 1 : 1
    };
    const [question, setQuestion] = useState("");
    const [comment, setComment] = useState("");
    const [datetime, setDatetime] = useState("");
    const [mandatory, setMandatory] = useState(false);
    const [optionAnswer, setOptionAnswer] = useState([]);
    const [file, setFile] = useState([]);
    const [currentTypeAnswer, setCurrentTypeAnswer] = useState("");
    const [currentOptionAnswer, setCurrentOptionAnswer] = useState("");

    const [newForm, setNewForm] = useState(location.state ? location.state.data : []);

    const [stateModal, setStateModal] = useState(false)

    function removeAnswerByForm(id) {
        setNewForm([...newForm.filter(item => item.id !== id)]); 
    }

    function cleanStates() {
        setStateModal(false)
        setQuestion("");
        setComment("");
        setDatetime("");
        setOptionAnswer([])
        setFile([]);
        setCurrentTypeAnswer("");
        setCurrentOptionAnswer("")
        setMandatory(false);
    }

    function addOptionAnswer(text) {
        setOptionAnswer([...optionAnswer, {
            id: nextID(optionAnswer),
            text: currentOptionAnswer
        }]);
        setCurrentOptionAnswer("");
    }

    function editAnswerByForm(id) {       
        const obj = newForm.find(item => item.id === id);
        setQuestion(obj.question);
        setComment(obj.comment);
        setDatetime(obj.datetime);
        setFile(obj.file);
        setCurrentTypeAnswer(obj.typeAnswer);
        setOptionAnswer(obj.optionAnswer);
        setMandatory(obj.mandatory);
        setStateModal(id);
    }

    function updateAnswerByForm() {
        setNewForm(newForm.map(item => {
            if (item.id === stateModal) {
                item.question = question;
                item.comment = comment;
                item.datetime = datetime;
                item.file = file;
                item.mandatory = mandatory;
                item.optionAnswer = optionAnswer;
                item.typeAnswer = currentTypeAnswer;
            }
            return item
        }))
        cleanStates()
    }

    function saveStates() {
        setNewForm([...newForm, {
            id: nextID(newForm),
            question: question,
            typeAnswer: currentTypeAnswer,
            comment: comment,
            datetime: datetime,
            mandatory: mandatory,
            optionAnswer: optionAnswer,
            file: file
        }]);
        cleanStates();
    }

    function updateFormByForms() {
        setForms(
            forms.map(item => {
                if (item.id === location.state.id) {
                    item.title = 'Новая форма',
                    item.datetime = 'Без изменений',
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
                datetime: 'Без изменений',
                update: '01/01/24',
                listAnswer: newForm,
                answers: []
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
                        <MyButton text={'Предпросмотр'} backgroundColor={'rgb(225, 225, 225)'} toggle={"modal"} target={"#previewModal"}/>
                        <MyButton text={'Опубликовать'} click={location.state ? updateFormByForms : saveForm}/>
                    </div>                   
                </div>
                <div className={classes.content}>
                    <div className={classes.content__listQuestion}>
                        <div className={classes.content__listQuestion__list}>
                            {listTypeAnswer.map((item, i) =>
                                <div className={classes.content__listQuestion__list__item} data-bs-toggle="modal" data-bs-target="#answerModal" onClick={() => setCurrentTypeAnswer(item.id)} key={i}>
                                    <span>{item.text}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <PreviewModal newForm={newForm} listTypeAnswer={listTypeAnswer}/>

                    <AnswerModal 
                        stateModal={stateModal}
                        currentTypeAnswer={currentTypeAnswer} 
                        question={question}
                        comment={comment}
                        mandatory={mandatory}
                        optionAnswer={optionAnswer}
                        setOptionAnswer={setOptionAnswer}
                        datetime={datetime}
                        file={file}
                        currentOptionAnswer={currentOptionAnswer}
                        listTypeAnswer={listTypeAnswer}
                        setQuestion={setQuestion}
                        setComment={setComment}
                        setDatetime={setDatetime}
                        setFile={setFile}
                        setCurrentOptionAnswer={setCurrentOptionAnswer}
                        setMandatory={setMandatory}
                        cleanStates={cleanStates}
                        saveStates={saveStates}
                        addOptionAnswer={addOptionAnswer}
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
                                    onDrop={() => {                                       
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
                                        <span>{item.question}</span>
                                        <span>{listTypeAnswer.map(typeItem => {
                                            if (typeItem.id === item.typeAnswer) {
                                                return typeItem.text
                                            }
                                        })}</span>
                                    </div>
                                    <div className={classes.content__newForm__list__item__btn}>
                                        <i class="fa-solid fa-pen" data-bs-toggle="modal" data-bs-target="#answerModal" onClick={() => {editAnswerByForm(item.id)}}></i>
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