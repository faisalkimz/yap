import AsyncStorage from '@react-native-async-storage/async-storage';

// Update this to your machine's local IP address
// You can find it by running 'ipconfig' (Windows) or 'ifconfig' (Mac/Linux)
const LOCAL_IP = '172.16.4.92';
const API_URL = `http://${LOCAL_IP}:5001/api`;
const AUTH_STORAGE_KEY = '@bantu_auth';

const getHeaders = async () => {
    const headers: any = {
        'Content-Type': 'application/json',
    };
    const token = await AsyncStorage.getItem(`${AUTH_STORAGE_KEY}_token`);
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
};

export const api = {
    post: async (endpoint: string, data: any) => {
        try {
            const response = await fetch(`${API_URL}${endpoint}`, {
                method: 'POST',
                headers: await getHeaders(),
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.message || 'API Post Error');
            return result;
        } catch (error) {
            console.error(`API Post Error (${endpoint}):`, error);
            throw error;
        }
    },

    get: async (endpoint: string) => {
        try {
            const response = await fetch(`${API_URL}${endpoint}`, {
                method: 'GET',
                headers: await getHeaders(),
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.message || 'API Get Error');
            return result;
        } catch (error) {
            console.error(`API Get Error (${endpoint}):`, error);
            throw error;
        }
    },

    put: async (endpoint: string, data: any) => {
        try {
            const response = await fetch(`${API_URL}${endpoint}`, {
                method: 'PUT',
                headers: await getHeaders(),
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.message || 'API Put Error');
            return result;
        } catch (error) {
            console.error(`API Put Error (${endpoint}):`, error);
            throw error;
        }
    },

    delete: async (endpoint: string) => {
        try {
            const response = await fetch(`${API_URL}${endpoint}`, {
                method: 'DELETE',
                headers: await getHeaders(),
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.message || 'API Delete Error');
            return result;
        } catch (error) {
            console.error(`API Delete Error (${endpoint}):`, error);
            throw error;
        }
    },
};
