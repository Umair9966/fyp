import axios from 'axios';
import {API_BASE_URL} from "../Util/Constants";


export const ForgotPasswordApiCall = async (paramsData) => {
        try {
            const data = new FormData();
            data.append('email', paramsData.email);

            const response = await axios.post(`${API_BASE_URL}/forgot_password`, data,);
            return response.data
        } catch
            (error) {
            console.error('Error in forgot Password', error);
            return undefined
        }
    }
;
