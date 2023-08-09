package de.neuefische.koheis.backend.gamegcards;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameCardsRepository extends MongoRepository<GameCard, String> {

}
