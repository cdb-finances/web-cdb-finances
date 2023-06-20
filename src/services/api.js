import axios from 'axios';

export default axios.create({
    baseURL: 'https://clube-do-bug.onrender.com',
    headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    }
})
