package de.neuefische.koheis.backend.converter;

import de.neuefische.koheis.backend.translation.Translation;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/converter")
public class ConvertController {

    private final ConvertService convertService;

    public ConvertController(ConvertService convertService) {
        this.convertService = convertService;
    }

    @PostMapping
    public Conversion convertTranslationToConversion(@RequestBody Translation translation) {
        return convertService.convertTranslationToConversion(translation);
    }

}
