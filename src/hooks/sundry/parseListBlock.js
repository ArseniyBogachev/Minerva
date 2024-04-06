function responseDataToListBlock(data) {
    const result = []

    for (let block of data) {
        const newParam = {
            id: block.id,
            formId: block.form_id,
            order: block.order
        }

        for (let param of block.data) {

            if (Array.isArray(param.Value) && param.Value.length) {
                newParam[param.Key] = param.Value.map(item => ({
                    id: item[0].Value,
                    text: item[1].Value
                }))
            }
            else {
                newParam[param.Key] = param.Value
            }
        }

        result.push(newParam)
    }

    return result
}

export { responseDataToListBlock }