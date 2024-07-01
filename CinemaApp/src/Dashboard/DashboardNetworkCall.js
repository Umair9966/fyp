import axios from 'axios';
import {API_BASE_URL} from "../Util/Constants";
import {getUserInfo} from "../SessionStorage/SessionStorage";


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

export const GetUserRewardsPointsApi = async () => {
        try {

            const response = await axios.get(`${API_BASE_URL}/rewards/${getUserInfo().id}`);
            return response.data
        } catch
            (error) {
            console.error('Error in getting rewards', error);
            return undefined
        }
    }
;

