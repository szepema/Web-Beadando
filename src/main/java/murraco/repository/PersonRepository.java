package murraco.repository;

import murraco.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface PersonRepository extends JpaRepository<Person, Long> {
    Optional<Person> findPersonById(Long id);

    @Transactional
    void deletePersonById(Long id);
}
