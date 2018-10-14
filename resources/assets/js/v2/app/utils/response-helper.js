const extractResponseCode = response => response.status

const extractResponseData = response => {
    if (typeof response.data.data == 'undefined') {
        return null
    }
    return response.data.data
}

const extractResponseMeta = response => response.data.meta

export {
    extractResponseCode,
    extractResponseData,
    extractResponseMeta
}
