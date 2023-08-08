package de.neuefische.koheis.backend.playingcards;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/playing_cards")
public class PlayingCardsController {

    private final PlayingCardsService playingCardsService;

    PlayingCardsController(PlayingCardsService playingCardsService){
        this.playingCardsService = playingCardsService;
    }

    @GetMapping("/{size}")
    PlayingCardsGrid getPlayingCards(@PathVariable("size") String size){
        return playingCardsService.getPlayingCardsGrid(size);
    }

}
