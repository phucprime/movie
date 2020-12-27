package io.movie.project.exception;

/**
 * Created by  Fang on 2018/4/28.
 */
public class StorageException extends BaseException {

    public StorageException(Integer status, String message) {
        super(status, message);
    }

    public StorageException(Integer status, String message, Throwable cause) {
        super(status, message, cause);
    }
}
