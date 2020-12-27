package io.movie.project.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import io.movie.project.domain.User;

/**
 * Created by  Fang on 2018/4/27.
 */
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
