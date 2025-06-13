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
}

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

export async function login(event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    try {
        const loginResponse = await fetch(`${API_BASE_URL}/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        console.log(loginResponse);

        if (!loginResponse.ok) {
            alert('Login failed');
            return;
        }

        const responesData = await loginResponse.json();
        localStorage.setItem('token', responesData.token);
    } catch {
        alert('Login failed');
    }
}

export async function getCurrentUserInfo(token) {
    const userInfoResponse = await fetch(`${API_BASE_URL}/users/me`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!userInfoResponse.ok) {
        throw new Error('Not logged in');
    }

    return await userInfoResponse.json();
}
