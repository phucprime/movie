package io.movie.project.exception;

import io.movie.project.enums.ResultEnum;


public class MovieNotFoundException extends BaseException {
    public MovieNotFoundException(ResultEnum resultEnum) {
        super(resultEnum);
    }
}
