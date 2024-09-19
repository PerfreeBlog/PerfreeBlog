export function createJournalApi(data){
    return axios.post('/api/auth/journal/createJournal', data);
}
