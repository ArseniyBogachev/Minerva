import axios from "axios";

async function listFormBlockApi(token, formId) {
    try {
        const response = await axios.get(`http://localhost:8080/formBuilder/edit/${formId}/list`,
        {
            headers: {
                "Authorization": `Token ${token}`,
            }
        })
        return response
    }
    catch (e) {
        return e
    }
}

async function addFormBlockApi(token, formId, data) {
    try {
        const response = await axios.post(`http://localhost:8080/formBuilder/edit/${formId}/add`,
        {
            data: data
        },
        {
            headers: {
                "Authorization": `Token ${token}`,
            }
        })
        return response
    }
    catch (e) {
        return e
    }
};

// function removeFormApi(id) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             if (true) {
//                 resolve({
//                     id: id
//                 })
//             }
//             else {
//                 reject("Error")
//             } 
//         }, 200)
//     })
// };

async function updateBlockApi(token, blockId, data) {
    try {
        const response = await axios.post(`http://localhost:8080/formBuilder/edit/${blockId}/set`,
        {
            data: data
        },
        {
            headers: {
                "Authorization": `Token ${token}`,
            }
        })
        return response
    }
    catch (e) {
        return e
    }
};

async function updateOrderBlockApi(token, formId, data) {
    try {
        const response = await axios.post(`http://localhost:8080/formBuilder/edit/${formId}/moveTo`,
        {
            "new_order": data.new,
            "old_order": data.old
        },
        {
            headers: {
                "Authorization": `Token ${token}`,
            }
        })
        return response
    }
    catch (e) {
        return e
    }
}

async function saveFormApi(token) {
    try {
        const response = await axios.post("http://localhost:8080/formBuilder/new",
        {
            title: "Новая форма"
        },
        {
            headers: {
                "Authorization": `Token ${token}`
            }
        })
        return response
    }
    catch (e) {
        return e
    }
};

export { addFormBlockApi, listFormBlockApi, saveFormApi, updateBlockApi, updateOrderBlockApi }