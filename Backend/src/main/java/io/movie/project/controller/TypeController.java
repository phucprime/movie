package io.movie.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import io.movie.project.domain.Movie;
import io.movie.project.domain.Result;
import io.movie.project.domain.Type;
import io.movie.project.enums.ResultEnum;
import io.movie.project.repositories.TypeRepository;
import io.movie.project.utils.ResultUtil;

import java.nio.file.Path;
import java.util.List;


@RestController
public class TypeController {

    @Autowired
    private TypeRepository typeRepository;

    @GetMapping(value = "/{type}/{page}")
    public Result<List<Movie>> getMovieListByType(@PathVariable("type") String type,
                                                @PathVariable("page") int page) {
        List<Movie> movies = typeRepository.findMovies(type, PageRequest.of(page, 12));
        return ResultUtil.success(ResultEnum.GET_MOVIE_TYPE_LIST, movies);
    }

    @GetMapping(value = "/count/{type}")
    public Result<Long> getTypeCount(@PathVariable("type") String type) {
        return ResultUtil.success(ResultEnum.GET_MOVIE_COUNT, typeRepository.countByName(type));
    }

    @GetMapping(value = "/types")
    public Result<List<Type>> getAllTypes() {
        return ResultUtil.success(ResultEnum.GET_TYPES, typeRepository.findAll());
    }

    @PostMapping(value = "/add-type/{type}")
    public Result addType(@PathVariable("type") String type,@RequestBody Type t){
        Type find = typeRepository.findByName(type);
        if(find != null){
            return ResultUtil.error(ResultEnum.TYPE_DUPLICATED);
        }
        typeRepository.save(t);
        return ResultUtil.success(ResultEnum.TYPE_ADDED);
    }

    @PostMapping(value = "/update-type/{oldType}")
    public Result updateType(@PathVariable("oldType") String oldType, @RequestBody Type t){
        Type find = typeRepository.findByName(oldType);
        if (find == null){
            return ResultUtil.error(ResultEnum.TYPE_NOT_FOUND);
        }
        Type findDuplicate = typeRepository.findByName(t.getName());
        if(findDuplicate != null){
            return ResultUtil.error(ResultEnum.TYPE_DUPLICATED);
        }
        typeRepository.updateType(find.getName(), t.getName());
        return ResultUtil.success(ResultEnum.TYPE_UPDATED);
    }

    @PostMapping(value = "/delete-type/{type}")
    public Result deleteType(@PathVariable("type") String type){
        Type find = typeRepository.findByName(type);
        if(find==null){
            return ResultUtil.error(ResultEnum.TYPE_NOT_FOUND);
        }
        typeRepository.delete(find);
        return ResultUtil.success(ResultEnum.TYPE_DELETED);
    }
}
