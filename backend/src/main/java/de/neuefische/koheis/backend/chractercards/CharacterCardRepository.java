package de.neuefische.koheis.backend.chractercards;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CharacterCardRepository extends MongoRepository<CharacterCard, String> {

}
