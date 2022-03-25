import axios from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';

const BASE = 'https://ipfs.infura.io'
const PORT = '5001'

var header = {
    Host: `ipfs.infura.io:${PORT}`,
    Connection: "keep-alive",
    accept: "application/json",
    "Content-Type": "multipart/form-data; boundary=----IPFSMini46757.59657640632.75158.26973190412",
    "sec-ch-ua-mobile": "?0",
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36",
    "sec-ch-ua-platform": '"Linux"',
    "Origin": "https://remix.ethereum.org",
    "Sec-Fetch-Site": "cross-site",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Dest": "empty",
    Referer: "https://remix.ethereum.org/",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7"
}

const jar = new CookieJar();
const api = wrapper(axios.create({
    baseURL: `${BASE}:${PORT}`,
    headers: header,
    withCredentials: true,
    jar: jar
}));

export default api;
