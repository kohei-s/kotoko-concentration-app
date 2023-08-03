package de.neuefische.koheis.backend.kanacards;

import de.neuefische.koheis.backend.idservice.IdService;
import org.springframework.stereotype.Service;

@Service
public class KanaCardsService {
    private final KanaCardsRepository kanaCardsRepository;
    private final IdService idService;

    public KanaCardsService(KanaCardsRepository kanaCardsRepository, IdService idService) {
        this.kanaCardsRepository = kanaCardsRepository;
        this.idService = idService;
    }

    public KanaCardsGrid getNineByNineKanaCardsGrid(){
        KanaCard[][] kanaCardGridWithoutId = kanaCardsRepository.getNineByNineKanaCardsGrid();
        boolean[][] isMatched = {
            {false, false, false},
            {false, false, false},
            {false, false, false}
        };
        return new KanaCardsGrid(idService.createRandomId(), kanaCardGridWithoutId, isMatched);
    }

}
