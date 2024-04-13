import axios from "axios";


async function listFormsApi(token) {
    try {
        const response = await axios.get("https://api.minerva.krbl.ru/formBuilder/list", {
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

async function createFormApi(token) {
    try {
        const response = await axios.post("https://api.minerva.krbl.ru/formBuilder/new",
        {
            title: "Новая форма"
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

async function removeFormApi(token, formId) {
    try {
        const response = await axios.post(`https://api.minerva.krbl.ru/formBuilder/edit/${formId}/delete`, {}, {
            headers: {
                "Authorization": `Token ${token}`,
            },
        })
        return response
    }
    catch (e) {
        return e
    }
};

async function updateTitleFormApi(token, formId, title) {
    try {
        const response = await axios.post(`https://api.minerva.krbl.ru/formBuilder/edit/${formId}/setTitle`, 
        {
            title: title
        },
        {
            headers: {
                "Authorization": `Token ${token}`,
            },
        })
        return response
    }
    catch (e) {
        return e
    }
};

async function newFormTokenApi(token, formId) {
    try {
        const response = await axios.post(`https://api.minerva.krbl.ru/formBuilder/edit/${formId}/access/new`, {},
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

async function listFormsByTokenApi(token, formId) {
    try {
        const response = await axios.get(`https://api.minerva.krbl.ru/formBuilder/edit/${formId}/access/list`,
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

export { listFormsApi, createFormApi, removeFormApi, updateTitleFormApi, newFormTokenApi, listFormsByTokenApi };