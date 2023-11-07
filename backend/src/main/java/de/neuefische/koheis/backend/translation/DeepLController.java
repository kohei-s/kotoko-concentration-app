package de.neuefische.koheis.backend.translation;

import de.neuefische.koheis.backend.exception.ErrorMessage;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

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

    @ExceptionHandler({IllegalArgumentException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorMessage handleIllegalArgumentException(IllegalArgumentException exception) {
        return new ErrorMessage(exception.getMessage());
    }

}
