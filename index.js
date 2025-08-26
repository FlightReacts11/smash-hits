document.addEventListener('DOMContentLoaded', () => {
    // --- GSAP Setup ---
    if (typeof gsap === 'undefined') {
        console.error("GSAP could not be found. Please check the script tag.");
        return;
    }


    //GSAP timeline
    const tl = gsap.timeline();
    tl.from(".header-logo", { y: -50, opacity: 0, duration: 1.2, ease: "power2.out" });
    tl.fromTo(".header-logo", { height: 110, width: "auto", rotation: 0 }, { height: 110, rotation: 360, duration: 1 });
    tl.from(".heading", { y: 20, opacity: 0, duration: 1, ease: "power2.out" }, "-=0.5");
    tl.from(".gsap-enhancement", { fontSize: 40, duration: 0.75, ease: "power2.out" }, "-=0.2");
    tl.fromTo(".overview-div", {height: 0, width: 0, ease:"power2.out"}, {height: "auto", width: "auto", duration: 1});

    

    const carouselItems = document.querySelectorAll(".carousel-item");
    let currentIndex = 0;

    function showSlide(index) {
        carouselItems.forEach(item => {
            item.classList.remove('visible');
        });
        carouselItems[index].classList.add('visible');
    }

    function showNextSlide() {
        currentIndex++;
        if (currentIndex >= carouselItems.length) {
            currentIndex = 0;
        }
        showSlide(currentIndex);
    }

    function startAutoplay() {
        setInterval(showNextSlide, 4500);
    }

    if (carouselItems.length > 0) {
        showSlide(currentIndex);
        startAutoplay();
    }
    



    // **IMPORTANT**: Replace with your actual TMDB API key
    const API_KEY = '5ea1519e857a156eae106a27a497ab16';



    // Get references to our HTML elements
    const searchButton = document.querySelector('.search-button');
    const searchBox = document.querySelector('.search-box');
    const resultsSection = document.getElementById('results-section');
    const carouselSection = document.getElementById('carousel-section');



    // Add a click event listener to the search button
    searchButton.addEventListener('click', async () => {
        const query = searchBox.value;
        if (query) {
            const data = await searchMovies(query);
            if (data && data.results) {
                displayResults(data.results);
            }
        }
    });



    // Function to fetch movie data from TMDB
    async function searchMovies(query) {
        const url = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Could not fetch from TMDB:", error);
            return null;
        }
    }



    // Function to display the results on the page
    function displayResults(items) {
        if (carouselSection) {
            carouselSection.style.display = 'none';
        }
        resultsSection.innerHTML = '';
        items.forEach(item => {
            if ((item.media_type === 'movie' || item.media_type === 'tv') && item.poster_path) {
                const movieCard = document.createElement('div');
                movieCard.classList.add('movie-card');

                const title = item.title || item.name;
                const releaseDate = item.release_date || item.first_air_date || 'N/A';
                const overview = item.overview;
                const userScore = item.vote_average;
                const numberOfVotes = item.vote_count;

                movieCard.innerHTML = `
                    <img src="https://image.tmdb.org/t/p/w500${item.poster_path}" alt="${title}">
                    <h3>${title}</h3>
                    <p class="p-user">Rating</p>
                    <h3 class="user-score">${userScore}/10</h3>
                    <p class="p-user">Number Of Votes</p>
                    <h3 class="user-score">${numberOfVotes}</h3>
                    <p>Released: ${releaseDate}</p>
                    <div class="description-div"
                    <p class="description">Click For Description</p>
                    </div>
                    <div class="overview-div"
                    <p class="overview">${overview}</p> 
                    </div>


                `;
                movieCard.addEventListener('click', () => {
                    const overviewElement = movieCard.querySelector('.overview-div');
                    overviewElement.classList.toggle('visible');
                })
                resultsSection.appendChild(movieCard);
            }
        });
    }
});

