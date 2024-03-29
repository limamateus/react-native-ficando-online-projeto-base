import axios from "axios";

const apiAlura =  axios.create({
    baseURL:'https://api.github.com/'
});

export default apiAlura;