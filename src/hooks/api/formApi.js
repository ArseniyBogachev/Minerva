import axios from "axios";

async function listFormBlockApi(token, formId) {
    try {
        const response = await axios.get(`https://api.minerva.krbl.ru/formBuilder/edit/${formId}/list`,
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
        const response = await axios.post(`https://api.minerva.krbl.ru/formBuilder/edit/${formId}/add`,
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

async function updateBlockApi(token, blockId, data) {
    try {
        const response = await axios.post(`https://api.minerva.krbl.ru/formBuilder/edit/${blockId}/set`,
        {
            "data": data
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
        const response = await axios.post(`https://api.minerva.krbl.ru/formBuilder/edit/${formId}/moveTo`,
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
        const response = await axios.post("https://api.minerva.krbl.ru/formBuilder/new",
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

async function listFormBlockByTokenApi(token, formToken) {
    try {
        const response = await axios.get(`https://api.minerva.krbl.ru/form/${formToken}/get`,
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

async function saveAnswersApi(token, formToken, data) {
    try {
        const response = await axios.post(`https://api.minerva.krbl.ru/form/${formToken}/submit`, {"data": data},
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

async function getAnswersApi(token, formToken) {
    try {
        const response = await axios.get(`https://api.minerva.krbl.ru/formBuilder/edit/${formToken}/answers`,
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

export { addFormBlockApi, listFormBlockApi, saveFormApi, updateBlockApi, updateOrderBlockApi, listFormBlockByTokenApi, saveAnswersApi, getAnswersApi }