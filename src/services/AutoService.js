import axios from "axios";

const URL_BASE = "http://localhost:8080/Auto";

class AutoService{
    findAll(){
        return axios.get(URL_BASE);
    }
    create (auto){
        return axios.post(URL_BASE, auto);
    }
    findById(id){
        return axios.get(URL_BASE + "/" + id);
    }
    update(id, auto){
        return axios.put(URL_BASE + "/" + id, auto);
    }
    delete(id){
        return axios.delete(URL_BASE + "/" + id);
    }
}
export default new AutoService();