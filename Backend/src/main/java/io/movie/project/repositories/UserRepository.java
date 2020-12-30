package io.movie.project.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import io.movie.project.domain.User;


public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
