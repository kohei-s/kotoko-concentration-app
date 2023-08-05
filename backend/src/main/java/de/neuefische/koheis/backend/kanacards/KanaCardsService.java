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

    public KanaCardsGrid getNineByNineKanaCardsGrid(String kanaType){
        KanaCard[][] kanaCardGridWithoutId = kanaCardsRepository.getNineByNineKanaCardsGrid(kanaType);
        boolean[][] isMatched = {
            {false, false, false},
            {false, false, false},
            {false, false, false}
        };
        return new KanaCardsGrid(idService.createRandomId(), kanaCardGridWithoutId, isMatched);
    }

}
