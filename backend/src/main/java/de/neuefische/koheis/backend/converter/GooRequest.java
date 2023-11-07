package de.neuefische.koheis.backend.converter;

public record GooRequest(
        String app_id,
        String sentence,
        String output_type
) {
}
