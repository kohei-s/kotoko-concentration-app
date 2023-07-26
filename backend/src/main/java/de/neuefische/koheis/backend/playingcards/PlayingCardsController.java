package de.neuefische.koheis.backend.playingcards;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/playing_cards")
public class PlayingCardsController {

    private final PlayingCardsService playingCardsService;

    PlayingCardsController(PlayingCardsService playingCardsService){
        this.playingCardsService = playingCardsService;
    }

    @GetMapping("/{size}")
    List<String> getPlayingCards(@PathVariable("size") String size){
        return playingCardsService.getPlayingCards(size);
    }

    @PostMapping()
    Boolean checkMatchOfSelectedPlayingCards(@RequestBody ArrayList<String> twoCards){
        return playingCardsService.checkMatchOfSelectedPlayingCards(twoCards);
    }

}
