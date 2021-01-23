const root = 'http://localhost:8080/';

const Api = {

    'movieList': (page) => `${root}/movie-list/${page}`,

    'typeList': (page) => `${root}/type-list/${page}`,

    'movieCount': () => `${root}/movie-count`,

    'typeQuantities': () => `${root}/type-count`,

    'deleteMovies': (movies) => `${root}/delete-more/${movies.join("&")}`,

    'deleteMovie': (title) => `${root}/delete/${title}`,

    'addMovieInfo': (type) => `${root}/add-movie/${type.join("&")}`,

    'updateMovieInfo': (type) => `${root}/update-movie/${type.join("&")}`,

    'movieDetail': (title) => `${root}/${title}`,

    'types': () => `${root}/types`,

    'addType': (type) => `${root}/add-type/${type}`,

    'deleteType': (type) => `${root}/delete-type/${type}`,

    'updateType': (oldType) => `${root}/update-type/${oldType}`,

    'typeCount': (type) => `${root}/count/${type}`,

    'categoryList': (type, page) => `${root}/${type}/${page}`,

    'playMovie': (movie) => `${root}/play/${movie}`,

    'uploadMovie': () => `${root}/upload`,

    'userSignUp': (username, password, permission) => 
    `${root}/user/sign-up?username=${username}&password=${password}&permission=${permission}`,

    'userSignIn': (username, password, permission) => 
    `${root}/user/sign-in?username=${username}&password=${password}&permission=${permission}`,
};

export default Api;