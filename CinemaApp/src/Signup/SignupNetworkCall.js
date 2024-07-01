import axios from 'axios';
import {API_BASE_URL} from "../Util/Constants";


export const signupUser = async (paramsData) => {
    try {
        const data = new FormData();
        data.append('email', paramsData.email);
        data.append('password', paramsData.password);
        data.append('username', paramsData.username);

        const response = await axios.post(`${API_BASE_URL}/user-register`, data);
        return response.data.user;
    } catch (error) {
        console.error('Error posting data:', error);
        return undefined
    }
};
