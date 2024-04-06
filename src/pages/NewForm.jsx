import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useCookies } from "react-cookie";
import classes from "../assets/styles/newForm.module.scss";
import MyButton from "../components/MyButton.jsx";
import AnswerModal from "../components/AnswerModal.jsx";
import PreviewModal from "../components/PreviewModal.jsx"
import { FormsData, TypeAnswerData } from "../context";
import { saveFormApi, addFormBlockApi, listFormBlockApi, updateBlockApi } from "../hooks/api/formApi.js";
import { responseDataToListBlock } from "../hooks/sundry/parseListBlock.js";

const NewForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { formId } = useParams();
    const [dragElem, setDragElem] = useState(null);
    const [dropElem, setDropElem] = useState(null);

    const [cookies, _, __] = useCookies(["user"]);
    
    const {forms, setForms} = useContext(FormsData);
    const {listTypeAnswer, setListTypeAnswer} = useContext(TypeAnswerData);

    const nextID = (list) => {
        return list.length ? list.at(-1).id + 1 : 1
    };
    const [question, setQuestion] = useState("");
    const [comment, setComment] = useState("");
    const [mandatory, setMandatory] = useState(false);
    const [optionAnswer, setOptionAnswer] = useState([]);
    const [file, setFile] = useState([]);
    const [currentTypeAnswer, setCurrentTypeAnswer] = useState("");
    const [currentOptionAnswer, setCurrentOptionAnswer] = useState("");

    const [datetime, setDatetime] = useState("");

    const [listBlock, setListBlock] = useState([]);

    const [stateModal, setStateModal] = useState(false);

    function removeAnswerByForm(id) {
        setListBlock([...listBlock.filter(item => item.id !== id)]); 
    };

    function cleanStates() {
        setStateModal(false)
        setQuestion("");
        setComment("");
        setOptionAnswer([])
        setFile([]);
        setCurrentTypeAnswer("");
        setCurrentOptionAnswer("")
        setMandatory(false);
    };

    useEffect(() => {
        async function listFormBlock() {
            const response = await listFormBlockApi(cookies.token, formId);

            if (response.status === 200 && response.data) {
                setListBlock(responseDataToListBlock(response.data)); 
            }
            else {
                console.log(response);
            }
        };

        listFormBlock();
    }, []);

    function addOptionAnswer(text) {
        setOptionAnswer([...optionAnswer, {
            id: nextID(optionAnswer),
            text: currentOptionAnswer
        }]);
        setCurrentOptionAnswer("");
    };

    function editAnswerByForm(id) {       
        const obj = listBlock.find(item => item.id === id);
        setQuestion(obj.question);
        setComment(obj.comment);
        setFile(obj.file);
        setCurrentTypeAnswer(obj.typeAnswer);
        setOptionAnswer(obj.optionAnswer);
        setMandatory(obj.mandatory);
        setStateModal(obj.id);
    };

    async function updateBlock() {
        const data = {
            id: stateModal,
            question: question,
            comment: comment,
            file: file,
            mandatory: mandatory,
            optionAnswer: optionAnswer,
            typeAnswer: currentTypeAnswer,
        }

        // const response = await updateBlockApi(cookies.token, stateModal, data);

        // if (response.status === 200) {
        //     setListBlock(listBlock.map(item => {
        //         if (item.id === stateModal) {
        //             item = data
        //         }
        //         return item
        //     }))
        // }
        // else {
        //     console.log(response)
        // }

        setListBlock(listBlock.map(item => {
            if (item.id === stateModal) {
                item = data
            }
            return item
        }))
     
        cleanStates();
    };

    async function addFormBlock() {
        const newBlock = {
            question: question,
            typeAnswer: currentTypeAnswer,
            comment: comment,
            mandatory: mandatory,
            optionAnswer: optionAnswer,
            file: file
        }

        const response = await addFormBlockApi(cookies.token, formId, newBlock)

        if (response.status === 200) {
            setListBlock([...listBlock, newBlock]);
        }
        else {
            console.log(response)
        }
        cleanStates();
    };

    function updateFormByForms() {
        updateFormByFormsApi(location.state.id, "Новая форма", listBlock)
            .then((resolve, _) => {
                console.log(resolve);
                setForms(
                    forms.map(item => {
                        if (item.id === location.state.id) {
                            item.title = "Новая форма",
                            item.questions = listBlock                
                        }
                        return item
                    })
                );
                cleanStates();
                navigate("/forms");
            })
    };

    function saveForm() {
        saveFormApi("Новая форма", listBlock)
            .then((resolve, reject) => {
                console.log(resolve);
                setForms(
                    [...forms, {
                        id: nextID(forms),
                        title: "Новая форма",
                        questions: listBlock,
                        answers: []
                    }]
                );
                cleanStates();
                navigate("/forms");
            })
            .catch(error => console.log(error));
    }; 

    return (
        <div className={classes.main}>
            <div className={classes.wrapper}>
                <div className={classes.header}>
                    <div className={classes.header__date}>
                        <div className={classes.header__date__item}>
                            <span>Дедлайн выполнения</span>
                            <input type="datetime-local" value={datetime} onChange={event => setDatetime(event.target.value)}/>
                        </div>
                    </div>
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

                    <PreviewModal listBlock={listBlock} listTypeAnswer={listTypeAnswer}/>

                    <AnswerModal 
                        stateModal={stateModal}
                        currentTypeAnswer={currentTypeAnswer} 
                        question={question}
                        comment={comment}
                        mandatory={mandatory}
                        optionAnswer={optionAnswer}
                        setOptionAnswer={setOptionAnswer}
                        file={file}
                        currentOptionAnswer={currentOptionAnswer}
                        listTypeAnswer={listTypeAnswer}
                        setQuestion={setQuestion}
                        setComment={setComment}
                        setFile={setFile}
                        setCurrentOptionAnswer={setCurrentOptionAnswer}
                        setMandatory={setMandatory}
                        cleanStates={cleanStates}
                        addFormBlock={addFormBlock}
                        addOptionAnswer={addOptionAnswer}
                        updateBlock={updateBlock}
                        setCurrentTypeAnswer={setCurrentTypeAnswer}/>

                    <div className={classes.content__newForm}>
                        <div className={classes.content__newForm__title}>
                            <h3>Новая форма</h3>
                        </div>                        
                        <div className={classes.content__newForm__list}>
                            {listBlock.map((item, i) => 
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
                                        const currentElem = listBlock[dragElem]
                                        const tNewForm = [...listBlock]
                                        if (dragElem > dropElem) {
                                            tNewForm.splice(dropElem, 0, currentElem)
                                            tNewForm.splice(dragElem + 1, 1)
                                        }
                                        else {
                                            tNewForm.splice(dropElem + 1, 0, currentElem)
                                            tNewForm.splice(dragElem, 1)
                                        }   
                                        setListBlock(tNewForm)
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