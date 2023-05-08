import { Cookies } from "react-cookie";

const cookies = new Cookies()

export const setCookie = (name: string, value: string, option?:any) => {
    return cookies.set(name, value, {...option})
}

export const getCookie = (name: string) => {
    const cookieValue = cookies.get(name);
    console.log(`getCookie: ${name}=${cookieValue}`);
    return cookieValue;
}
