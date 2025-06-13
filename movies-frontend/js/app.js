import { getAllMovies, getCurrentUserInfo, login } from './services.js';

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
    const movieList = document.querySelector('.movie-list');
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

async function checkLoginStatus() {
    const token = localStorage.getItem('token');
    const profileContainer = document.querySelector('.profile-container');
    if (!token) {
        profileContainer.innerHTML = profileContainer.innerHTML = `
            <form id="login-form">
                <input id="login-username" type="text" placeholder="Username" required>
                <input id="login-password" type="password" placeholder="******" required>
                <button id="login-submit-btn" type="submit">Log In</button>
            </form>`;
        document.getElementById('login-form').addEventListener('submit', login);
        return;
    }

    try {
        const { username } = await getCurrentUserInfo(token);
        profileContainer.innerHTML = `<span>Hello, ${username}</span>`;
    } catch {
        profileContainer.innerHTML = profileContainer.innerHTML = `
            <form id="login-form">
                <input id="login-username" type="text" placeholder="Username" required>
                <input id="login-password" type="password" placeholder="******" required>
                <button id="login-submit-btn" type="submit">Log In</button>
            </form>`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderMovies();
    checkLoginStatus();
});
