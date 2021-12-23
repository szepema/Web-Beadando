package murraco.service;

import murraco.exception.PersonNotFoundException;
import murraco.model.Person;
import murraco.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonService {
    private final PersonRepository personRepository;

    @Autowired
    public PersonService(PersonRepository personRepository) { this.personRepository = personRepository; }

    public Person addPerson(Person person) { return personRepository.save(person); }

    public List<Person> findAllPersons() { return personRepository.findAll(); }

    public Person updatePerson(Person person) { return personRepository.save(person); }

    public Person findPersonById(Long id) {
        return personRepository.findPersonById(id).orElseThrow(() -> new PersonNotFoundException("Person by id " + id + "was not found."));
    }

    public void deletePerson(Long id) { personRepository.deletePersonById(id); }
}
