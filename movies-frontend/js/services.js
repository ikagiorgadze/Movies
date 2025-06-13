const API_BASE_URL = CONFIG.API_BASE_URL;

export async function getAllMovies() {
    try {
        const response = await fetch(`${API_BASE_URL}/movies`);

        if (!response.ok) {
            throw new Error(`HTTP error with status code: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch movies:', error);

        throw error;
    }
};


// async function getMovieById(id) {
//     try {
//         const response = await fetch(`${API_BASE_URL}/api/movies/${id}`);

//         if (!response.ok) {
//             throw new Error(`HTTP error with status code: ${response.status}`);
//         }

//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error('Failed to fetch movie', error);

//         throw error;
//     }
// };
