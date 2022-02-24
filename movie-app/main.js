$(function () {
    $("#searchForm").on('submit', (e) => {
        let searchText = $('#searchText').val()
        getMovies(searchText);
        e.preventDefault()
    })
});

 function getMovies(searchText) {

    axios.get(`http://www.omdbapi.com/?s=${searchText}&apikey=e9f73939`)
        .then((response) => {
            console.log(response.data);
            let movies = response.data.Search;
            let output = '';
            $.each(movies, (index, movie) => {
                output += `
                    <div class="col-md-4">
                        <div class="well text-center">
                        <img src="${movie.Poster}"/>
                            <h5>${movie.Title}</h5>
                            <h5>${movie.Year}</h5>
                            <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary">Movie Detail</a>
                        </div>
                    </div>
                `
            })
            $('#movies').html(output);
        })
        .catch((err) => {
            console.log(err);
        })
}

function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

function getMovie() {
    let movieId = sessionStorage.getItem('movieId');

    axios.get(`http://www.omdbapi.com/?i=${movieId}&apikey=e9f73939`)
        .then((response) => {
            console.log(response.data);
            let movie = response.data;
            let output = '';

            output += `
                    <div class="col-md-4">
                        <div class="well text-center">
                        <img src="${movie.Poster}"/>
                            <h5>${movie.Title}</h5>
                            <h5>${movie.Year}</h5>
                        </div>
                    </div>
                `

            $('#movie').html(output);
        })
        .catch((err) => {
            console.log(err);
        })
}