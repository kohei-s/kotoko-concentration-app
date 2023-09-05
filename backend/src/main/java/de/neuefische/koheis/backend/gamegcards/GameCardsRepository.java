package de.neuefische.koheis.backend.gamegcards;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GameCardsRepository extends MongoRepository<GameCard, String> {
    List<GameCard> findAllByAuthorId(String authorId);
}
