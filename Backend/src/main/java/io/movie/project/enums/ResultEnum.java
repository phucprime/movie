package io.movie.project.enums;


public enum ResultEnum {
    SIGN_UP(1, "Add user successfully"),
    SIGN_IN(1, "Login successfully"),
    GET_MOVIE_INFO_LIST(1, "Get movie info list successfully"),
    GET_MOVIE_TYPE_LIST(1, "Get movie type list successfully"),
    GET_MOVIE_SRC_LIST(1, "Get movie source list successfully"),
    GET_MOVIE_DETAIL(1, "Get movie detail successfully"),
    GET_TYPES(1, "Get types successfully"),
    UPLOAD_MOVIE_FILE(1, "Load movie file successfully"),
    ADD_MOVIE(1, "Add movie successfully"),
    DELETE_MOVIE(1, "Delete movie successfully"),
    DELETE_MORE_MOVIES(1, "Delete more movies successfully"),
    GET_MOVIE_COUNT(1, "Get movie count successfully"),
    GET_TYPE_COUNT(1, "Get type count successfully"),
    USER_DUPLICATE(-1, "User already existed"),
    USER_MISSED(-1, "User missed"),
    WRONG_PASSWORD(-1, "Wrong password"),
    PERMISSION_DENIED(-1, "Permission denied"),
    UNKNOWN_ERROR(-1, "Unknown"),
    MOVIE_NOT_FOUND(-1, "Movie not found"),
    MOVIE_DUPLICATE(-1, "Movie already existed"),
    MOVIE_UPDATED(1, "Update movie successfully"),
    TYPE_UPDATED(1,"Update type successfully"),
    TYPE_NOT_FOUND(-1, "Type not found"),
    TYPE_DUPLICATED(-1, "Type already existed"),
    TYPE_ADDED(1, "Add type successfully"),
    TYPE_DELETED(1, "Delete type successfully")
    ;
    private Integer status;
    private String msg;

    ResultEnum(Integer code, String msg) {
        this.status = code;
        this.msg = msg;
    }

    public Integer getStatus() {
        return status;
    }

    public String getMsg() {
        return msg;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}
