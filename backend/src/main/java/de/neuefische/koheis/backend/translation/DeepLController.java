package de.neuefische.koheis.backend.translation;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/translation")
public class DeepLController {

    private final DeepLService deepLService;

    public DeepLController(DeepLService deepLService) {
        this.deepLService = deepLService;
    }

    @GetMapping
    public Translation getTranslation(@RequestParam String original, @RequestParam String language) throws Exception{

        return deepLService.getJapaneseTranslation(original, language);
    }

}
