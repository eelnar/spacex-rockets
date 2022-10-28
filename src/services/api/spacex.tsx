
import { Rocket } from '../../models/types';

export async function getRockets(setNotification: (value: any) => void): Promise<Rocket[]> {
    const query = {
        query: `
            query rockets{
                rockets{
                    id
                    cost_per_launch
                    name
                    stages
                    type
                }
            }
        `
    }

    try {
        let response = await fetch('https://api.spacex.land/graphql/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(query)
        }).then((response) => response.json());

        return response?.data?.rockets;
    } catch (e) {
        console.error(e);
        setNotification({ type: 'error', message: 'Something went wrong while fetching SpaceX Rockets data.' });
    }

    return [];
}