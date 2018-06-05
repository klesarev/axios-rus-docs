const api = {
    OMDB_KEY: '2c741d7',
    get OMDB_PATH() {
        return `http://www.omdbapi.com/?apikey=${this.OMDB_KEY}`
    }
}

export default api