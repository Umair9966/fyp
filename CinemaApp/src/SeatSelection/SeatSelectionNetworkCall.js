import axios from 'axios';
import {API_BASE_URL} from "../Util/Constants";
import {getUserInfo} from "../SessionStorage/SessionStorage";


export const confirmBooking = async (paramsData) => {
    try {

        const userDetails=getUserInfo()
        const data = new FormData();
        data.append('customer_id', userDetails.id);
        data.append('show_id', paramsData.movieId);
        data.append('number_of_tickets', paramsData.numberOfTickets);
        data.append('seats_booked', paramsData.seatsBooked);
        data.append('booking_date', paramsData.bookingDate);
        data.append('total_amount', paramsData.totalAmount);
        data.append('theater_id', paramsData.theaterId);
        data.append('used_rewards_points', paramsData.used_rewards_points);
        data.append('reward_redeemed', paramsData.reward_redeemed);

        const response = await axios.post(`${API_BASE_URL}/add-booking`, data);
        return response.data;
    } catch (error) {
        console.error('Error posting data:', error);
        return undefined
    }
};
