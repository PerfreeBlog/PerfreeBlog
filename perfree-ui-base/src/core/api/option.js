export function getOptionByKeysAndIdentificationApi(keys, identification) {
    return axios.get('/api/option/getOptionByKeysAndIdentification?keys=' + keys + '&identification=' + identification);
}
