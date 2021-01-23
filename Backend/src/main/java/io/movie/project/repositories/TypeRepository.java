package io.movie.project.repositories;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import io.movie.project.domain.Movie;
import io.movie.project.domain.Type;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


public interface TypeRepository extends JpaRepository<Type, Long> {
    Type findByName(String name);

    @Query(nativeQuery = true)
    List<Movie> findMovies(@Param("typeName") String type, Pageable pageable);

    long countByName(String name);

    @Transactional
    @Modifying
    @Query("update Type t set t.name = :type WHERE t.name = :oldType")
    void updateType(@Param("oldType") String oldType, @Param("type") String type);
}
