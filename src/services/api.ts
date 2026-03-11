const API_URL = 'http://localhost:5001/api';

export const api = {
    post: async (endpoint: string, data: any) => {
        try {
            const response = await fetch(`${API_URL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || 'Something went wrong');
            }
            return result;
        } catch (error) {
            console.error(`API Post Error (${endpoint}):`, error);
            throw error;
        }
    },

    get: async (endpoint: string, token?: string) => {
        try {
            const headers: any = {
                'Content-Type': 'application/json',
            };
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await fetch(`${API_URL}${endpoint}`, {
                method: 'GET',
                headers,
            });
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || 'Something went wrong');
            }
            return result;
        } catch (error) {
            console.error(`API Get Error (${endpoint}):`, error);
            throw error;
        }
    },
};
