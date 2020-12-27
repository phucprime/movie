const root = 'http://localhost:8080/';

const Api = {

    'movieList': (page) => `${root}/movie-list/${page}`,

    'movieCount': () => `${root}/movie-count`,

    // xóa nhiều phim
    'deleteMovies': (movies) => `${root}/delete-more/${movies.join("&")}`,

    // xóa một phim
    'deleteMovie': (title) => `${root}/delete/${title}`,

    'addMovieInfo': (type) => `${root}/add-movie/${type.join("&")}`,

    'updateMovieInfo': (type) => `${root}/update-movie/${type}`,

    'movieDetail': (title) => `${root}/${title}`,

    // danh sách thể loại phim
    'types': () => `${root}/types`,

    // số lượng tất cả các thể loại phim
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