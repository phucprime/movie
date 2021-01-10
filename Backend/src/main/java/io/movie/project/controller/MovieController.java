package io.movie.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import io.movie.project.domain.Movie;
import io.movie.project.domain.Result;
import io.movie.project.domain.Type;
import io.movie.project.enums.ResultEnum;
import io.movie.project.exception.MovieNotFoundException;
import io.movie.project.repositories.MovieRepository;
import io.movie.project.repositories.TypeRepository;
import io.movie.project.utils.ResultUtil;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;


@RestController
public class MovieController {

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private TypeRepository typeRepository;

    @GetMapping(value = "/movie-list/{page}")
    public Result<List<Movie>> getMovieInfoList(@PathVariable("page") int page) {
        Pageable pageable = PageRequest.of(page, 12);
        Page<Movie> movies = movieRepository.findAll(pageable);
        return ResultUtil.success(ResultEnum.GET_MOVIE_INFO_LIST, movies.getContent());
    }

    @GetMapping(value = "/movie-count")
    public Result<Long> getMovieCount() {
        return ResultUtil.success(ResultEnum.GET_MOVIE_COUNT, movieRepository.count());
    }

    @GetMapping(value = "/{title}")
    public Result<Movie> getMovieDetail(@PathVariable("title") String title) {
        Movie movie = movieRepository.findByTitle(title);
        if (null == movie) {
            throw new MovieNotFoundException(ResultEnum.MOVIE_NOT_FOUND);
        }
        return ResultUtil.success(ResultEnum.GET_MOVIE_DETAIL, movie);
    }

	@PostMapping(value = "/add-movie/{type}")
    public Result addMovieInfo(@PathVariable("type") String type,
                           @RequestBody Movie movie) {
        Movie find = movieRepository.findByTitle(movie.getTitle());
        if (find != null) {
            return ResultUtil.error(ResultEnum.MOVIE_DUPLICATE);
        }
        Set<Type> movieType = new HashSet<>();
        for (String t : type.split("&")) {
            movieType.add(typeRepository.findByName(t));
        }
        movie.setType(movieType);
        movieRepository.save(movie);
        return ResultUtil.success(ResultEnum.ADD_MOVIE);
    }

    @PostMapping(value = "/update-movie/{type}")
    public Result updateMovieInfo(@PathVariable("type") String type,
                               @RequestBody Movie movie) {
        Movie find = movieRepository.findByTitle(movie.getTitle());
        if (find == null) {
            return ResultUtil.error(ResultEnum.MOVIE_NOT_FOUND);
        }
        movieRepository.updateMovie(find.getId(),
                                    movie.getAlias(),
                                    movie.getCast(),
                                    movie.getDirector(),
                                    movie.getLength(),
                                    movie.getOverview(),
                                    movie.getPost(),
                                    movie.getReleaseDate(),
                                    movie.getScore(),
                                    movie.getScreenwriter(),
                                    movie.getTitle());
        return ResultUtil.success(ResultEnum.MOVIE_UPDATED);
    }

	@PostMapping(value = "/delete/{title}")
    public Result deleteMovieInfo(@PathVariable("title") String title) {
        Movie movie = movieRepository.findByTitle(title);
        if (movie == null) {
            return ResultUtil.error(ResultEnum.MOVIE_NOT_FOUND);
        }
        movieRepository.delete(movie);
        return ResultUtil.success(ResultEnum.DELETE_MOVIE);
    }

	@PostMapping(value = "/delete-more/{movies}")
    public Result deleteMovies(@PathVariable("movies") String selectedMovies) {
        for (String movie : selectedMovies.split("&")) {
            Result result = deleteMovieInfo(movie);
            if (!result.getStatus().equals(ResultEnum.DELETE_MOVIE.getStatus())) {
                return result;
            }
        }
        return ResultUtil.success(ResultEnum.DELETE_MORE_MOVIES);
    }
}
