import axios from 'axios';
import {API_BASE_URL} from "../Util/Constants";


export const loginUser = async (paramsData) => {
        try {
            const data = new FormData();
            data.append('email', paramsData.email);
            data.append('password', paramsData.password);

            const response = await axios.post(`${API_BASE_URL}/users`, data,);
            return response.data.user
        } catch
            (error) {
            console.error('Error in loginUser:', error);
            return undefined
        }
    }
;
