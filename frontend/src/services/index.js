import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const BASE_URL = 'https://one-degree-v1.onrender.com/api';
const BASE_HEADERS = {
    "Content-Type": "application/json",
    "timeout": 1000,
};

const axiosInstance = axios.create({
    baseURL: 'https://one-degree-v1.onrender.com/api',
    headers: {
        "Content-Type": "application/json",
        "timeout": 1000,
    },
});

export const logOut = () => {
    cookies.remove("TOKEN", { path: "/" });
    document.location.replace('/sign-in');
};

export const buildQueryString = (query) =>
    Object.entries(query).reduce(
        (output, [key, value]) =>
        (!value ?
            output
            : `${output ?
                `${output}&`
                : output}${key}=${encodeURIComponent(value)}`),
        '',
    );

const authenticated = async (config) => {
    try {
        const res = await axios({
            headers: {
                ...BASE_HEADERS,
                Authorization: `Bearer ${cookies.get("TOKEN")}`
            },
            ...config,
        });
        return res.data;
    } catch (e) {
        if (e.response.status === 401) {
            logOut();
        }
    }
}

export const getCourses = async (params) => authenticated({
    url: `${BASE_URL}/courses?${buildQueryString(params)}`,
    method: "GET",
});

export const getFilterOptions = async () => authenticated({
    url: `${BASE_URL}/courses/filterOptions`,
    method: "GET",
});

export const getUserProfile = async () => authenticated({
    url: `${BASE_URL}/user/profile`,
    method: "GET",
});

export const updateUserProfile = async (payload) => authenticated({
    url: `${BASE_URL}/user/profile`,
    method: "PUT",
    data: payload,
});

export const selectCourse = async (payload) => authenticated({
    url: `${BASE_URL}/user/selectCourse`,
    method: "PUT",
    data: payload,
});

export const register = async (payload) => {
    const res = await axiosInstance({
        url: `/user/register`,
        method: "POST",
        data: payload,
    });
    return res.data;
}

export const login = async (payload) => {
    const res = await axiosInstance({
        url: `/user/login`,
        method: "POST",
        data: payload,
    });
    return res.data;
}
