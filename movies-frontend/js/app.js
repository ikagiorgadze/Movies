import { getAllMovies } from './services.js';

const movieList = document.querySelector('.movie-list');

function createMovieItem(movie) {
    const item = document.createElement('div');
    item.className = 'movie-list-item';

    const img = document.createElement('img');
    img.className = 'movie-list-item-img';

    console.log(movie);
    img.src = movie.posterUrl || 'assets/placeholder.png';
    img.alt = movie.title;

    item.appendChild(img);
    return item;
}

async function renderMovies() {
    const containerWidth = movieList.offsetWidth;
    const containerHeight = movieList.offsetHeight;
    const tempItem = createMovieItem({
        poster: 'assets/placeholder.png',
        title: '',
    });
    tempItem.style.visibility = 'hidden';
    movieList.appendChild(tempItem);
    const itemWidth = tempItem.offsetWidth;
    const itemHeight = tempItem.offsetHeight;
    movieList.removeChild(tempItem);

    const moviesPerRow = Math.floor(containerWidth / itemWidth);
    const rows = Math.floor(containerHeight / itemHeight);
    const visibleMoviesCount = moviesPerRow * rows;

    const movies = await getAllMovies();
    movieList.innerHTML = '';
    movies.slice(0, visibleMoviesCount).forEach((movie) => {
        const movieItem = createMovieItem(movie);
        movieList.appendChild(movieItem);
    });
}

// async function checkLoginStatus() {
//     const token = localStorage.getItem('token');
//     const profileContainer = document.querySelector('.profile-container');
//     if (!token) {
//         profileContainer.innerHTML =
//             profileContainer.innerHTML = `<a href="login" class="login-btn">Log In</button>"`;
//         return;
//     }

//     try {
//         const userInfoResponse = await fetch(
//             `${CONFIG.API_BASE_URL}/users/me`,
//             {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             }
//         );
//         if (!userInfoResponse.ok) {
//             throw new Error('Not logged in');
//         }

//         const userData = await userInfoResponse.json();
//         profileContainer.innerHTML = `<span>Hello, ${userData.username}</span>`;
//     } catch {
//         profileContainer.innerHTML = `<button class="login-btn">Log In</>"`;
//     }

//     profileContainer.innerHTML = `<span>Hello, ${token.username}`;
// }

document.addEventListener('DOMContentLoaded', () => {
    renderMovies();
    // checkLoginStatus();
});
