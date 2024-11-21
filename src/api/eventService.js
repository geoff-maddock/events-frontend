import axios from 'axios';

//const API_BASE_URL = 'https://arcane.city/api';
const API_BASE_URL = '/api';

const username = process.env.REACT_APP_API_USERNAME;
const password = process.env.REACT_APP_API_PASSWORD;

// Encode username and password in base64 for Basic Auth
const authHeader = `Basic ${btoa(`${username}:${password}`)}`;

export const fetchEvents = async (startDate, endDate) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/events`, {
            headers: {
                Authorization: authHeader,
            },
            params: {
                'filters[start_at][start]': startDate,
                'filters[start_at][end]': endDate,
            },
        });
        console.log('response', response);
        return response.data.data; // Assume API returns { events: [...] }
    } catch (error) {
        console.error('Error fetching events:', error.response?.data || error.message);
        throw error;
    }
};