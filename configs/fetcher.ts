import axios from 'axios';

const fetcher = axios.create({
    baseURL:process.env.NEXT_PUBLIC_NEXTAPI_URL,

})


export default fetcher