export function createJournalApi(data){
    return axios.post('/api/auth/journal/createJournal', data);
}

export function updateJournalApi(data){
    return axios.put('/api/auth/journal/updateJournal', data);
}

export function getJournalApi(id){
    return axios.get('/api/auth/journal/get?id=' + id);
}
