function saveAnswersApi(id, answers) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (true) {
                resolve({
                    id: id,
                    answers: answers
                })
            }
            else {
                reject("Error")
            } 
        }, 1000)
    })
}

function removeFormApi(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (true) {
                resolve({
                    id: id
                })
            }
            else {
                reject("Error")
            } 
        }, 200)
    })
}

function updateFormByFormsApi(id, name, questions) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (true) {
                resolve({
                    id: id,
                    name: name,
                    questions: questions
                })
            }
            else {
                reject("Error")
            } 
        }, 1000)
    })
}

function saveFormApi(name, questions) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (true) {
                resolve({
                    name: name,
                    questions: questions
                })
            }
            else {
                reject("Error")
            } 
        }, 1000)
    })
}

export { saveAnswersApi, saveFormApi, updateFormByFormsApi, removeFormApi }