import axios from 'axios';
import {API_BASE_URL} from "../Util/Constants";


export const GetDashboardApiData = async () => {
        try {

            const response = await axios.get(`${API_BASE_URL}/dashboard`);
            return response.data
        } catch
            (error) {
            console.error('Error in getting dashboard data', error);
            return undefined
        }
    }
;
