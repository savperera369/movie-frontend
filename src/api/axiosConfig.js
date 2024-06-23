import axios from 'axios';

// baseUrl has base address of api endpoints
// that our client react application will be calling
// when we use axios to call an endpoint we wont need to repeat the base url

export default axios.create({
    baseURL: "http://localhost:8080",
    //headers: {"ngrok-skip-browser-warning": "true"}
});