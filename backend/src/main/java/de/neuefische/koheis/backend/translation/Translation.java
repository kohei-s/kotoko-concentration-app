package de.neuefische.koheis.backend.translation;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class Translation {

    @NotBlank
    @Size(min=1, max=50, message = "Original word/text must be between 1 and 50 characters!")
    private String original;

    @NotBlank
    private String japanese;

    public Translation(String original, String japanese) {
        this.original = original;
        this.japanese = japanese;
    }
}
