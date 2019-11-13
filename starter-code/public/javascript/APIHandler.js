class APIHandler {
  constructor(baseUrl) {
    this.service = axios.create({ //creation of a connextion between client and server with axios
      baseURL: baseUrl // based on a URL as parameter (line 1...and use in the index.js file line 1)
    });
  }

  getFullList() {
    return this.service.get("/characters");
  }

  getOneRegister(id) {
    return this.service.get(`/characters/${id}`);
  }

  createOneRegister(infos) {
    return this.service.post(`/characters`, infos)
  }

  updateOneRegister() {

  }

  deleteOneRegister() {

  }
}