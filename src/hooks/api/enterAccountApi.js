import { totalRegisterValidate } from "../validation/enterAccountValidate.js";

async function logIn(email, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (true) {
                resolve({
                    email: "senya.bogachev@mail.ru",
                    phone: "89110128244",
                    name: "Арсений",
                    surname: "Богачев",
                    patronymic: "Валерьевич"
                })
            }
            else {
                reject("Error")
            }            
        }, 1000)
    }).catch((error) => {
        console.log(error)
    })
};

async function completeRegistration(data) {
    const validate = totalRegisterValidate(data)

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (validate.status) {
                console.log("Отправляем данные на бэк ->", data)
                resolve({
                    status: 201,
                    data: data
                })
            }
            else {
                reject(validate.message)
            }            
        }, 1000)
    })
};

export { logIn, completeRegistration };