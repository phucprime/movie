package io.movie.project.repositories;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import io.movie.project.domain.Movie;
import io.movie.project.domain.Type;

import java.util.List;

/**
 * Created by  Fang on 2018/4/27.
 */
public interface TypeRepository extends JpaRepository<Type, Long> {
    Type findByName(String name);

    @Query(nativeQuery = true)
    List<Movie> findMovies(@Param("typeName") String type, Pageable pageable);

    long countByName(String name);
}
