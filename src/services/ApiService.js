import axios from "axios";

export const BASE_URL = process.env.REACT_APP_BASE_URL;

const apiClient = axios.create({
    baseURL: BASE_URL,
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//user api services
export const loginAdmin = async (admin) => {
    
    try {
        const response = await apiClient.post('/auth/login', admin);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const registerAdmin = async (admin) => {
    try {
       const response = await apiClient.post('/auth/register', admin);
       return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getAllAdmins = async () => {
    try {
        const response = await apiClient.get('/auth/all');
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getAdminByUsername = async (username) => {
    try {
        const response = await apiClient.get(`/auth/user/${username}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateAdmin = async (admin, username) => {
    try {
        const response = await apiClient.put(`/auth/update/${username}`, admin);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const deleteAdmin = async (id) => {
    try {
        const response = await apiClient.delete(`/auth/delete/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

//people data api services

export const fetchData = async (pageNo, pageSize) => {
    try {
        const response = await apiClient.get(`/people/all?pageNo=${pageNo}&pageSize=${pageSize}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getAllData = async () => {
    try {
        const response = await apiClient.get("/people/alldata");
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getAllCount = async () => {
    try {
        const response = await apiClient.get('/people/count');
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getCountByZone = async (zone) => {
    try {
        const response = await apiClient.get(`/people/count/${zone}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getDataById = async (id) => {
    try {
        const response = await apiClient.get(`/people/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getCountBetweenDates = async (startDate, endDate) => {
    try {
        const response = await apiClient.get(`/people/count/date?startDate=${startDate}&endDate=${endDate}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const addPeopleData = async (person) => {
    try {
        const response = await apiClient.post(`/people/add`,person);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const updatePeopleData = async (person, id) => {
    try {
        const response = await apiClient.put(`/people/update/${id}`, person);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const deletePeopleData = async (id) => {
    try {
        const response = await apiClient.delete(`/people/delete/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


//notifications api services

export const allNotifications = async () => {
    try {
        const response = await apiClient.get('/notifications');
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


//download excel file

export const downloadExcel = async () => {
    try {
        const response = await apiClient.get("/download/excel", {
            responseType: "blob"
        })
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}