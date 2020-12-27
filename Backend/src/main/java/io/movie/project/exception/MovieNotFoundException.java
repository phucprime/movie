package io.movie.project.exception;

import io.movie.project.enums.ResultEnum;

/**
 * Created by  Fang on 2018/4/28.
 */
public class MovieNotFoundException extends BaseException {
    public MovieNotFoundException(ResultEnum resultEnum) {
        super(resultEnum);
    }
}
