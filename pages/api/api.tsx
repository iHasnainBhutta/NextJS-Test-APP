import axios from 'axios';

const baseURL = 'https://swapi.dev/api/';

export interface Person {
    name: string;
    skin_color: string;
    gender: string;
    url: string;
}

export interface PeopleResponse {
    results: Person[];
}

export const fetchPeople = async (page = 1): Promise<PeopleResponse> => {
    try {
        const response = await axios.get(`people/?page=${page}`, { baseURL });
        return response.data;
    } catch (error) {
        console.error('Error fetching people:', error);
        throw error;
    }
};

export const fetchPersonDetails = async (url: string): Promise<Person> => {
    try {
        const response = await axios.get<Person>(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching person details:', error);
        throw error;
    }
};
