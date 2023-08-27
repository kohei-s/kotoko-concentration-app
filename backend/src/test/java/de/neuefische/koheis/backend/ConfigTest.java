package de.neuefische.koheis.backend;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import java.io.IOException;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ConfigTest {

    @Mock
    private Resource location;

    @InjectMocks
    private Config.ReactRoutingPathResourceResolver resolver;

    @Test
    void testGetResourceNonExistingFile() throws IOException {
        // Mock the behavior of the location.createRelative() method
        Resource requestedResource = new ClassPathResource("static/non-existing-file.txt");
        when(location.createRelative(any())).thenReturn(requestedResource);

        // Call the method being tested
        Resource result = resolver.getResource("non-existing-file.txt", location);

        // Verify that the method returned the default starting page resource
        assertEquals(new ClassPathResource(Config.DEFAULT_STARTING_PAGE), result);
    }

    @Test
    void testGetResourceFrontendRouting() throws IOException {
        // Mock the behavior of the location.createRelative() method
        Resource requestedResource = new ClassPathResource("static/frontend-routing");
        when(location.createRelative(any())).thenReturn(requestedResource);

        // Call the method being tested
        Resource result = resolver.getResource("frontend-routing", location);

        // Verify that the method returned the default starting page resource
        assertEquals(new ClassPathResource(Config.DEFAULT_STARTING_PAGE), result);
    }

    @Test
    void testReactRoutingPathResourceResolverForNonExistingResource() throws IOException {
        String resourcePath = "/test.html";
        Resource location = mock(Resource.class);
        Resource requestedResource = mock(Resource.class);

        when(location.createRelative(resourcePath)).thenReturn(requestedResource);
        when(requestedResource.exists()).thenReturn(false);

        Config.ReactRoutingPathResourceResolver resolver = new Config.ReactRoutingPathResourceResolver();
        Resource resolvedResource = resolver.getResource(resourcePath, location);

        assertEquals(new ClassPathResource(Config.DEFAULT_STARTING_PAGE), resolvedResource);

        verify(location).createRelative(resourcePath);
        verify(requestedResource).exists();
        verifyNoMoreInteractions(location, requestedResource);
    }

    @Test
    void testReactRoutingPathResourceResolverForExistingResource() throws IOException {
        String resourcePath = "/test.html";
        Resource location = mock(Resource.class);
        Resource requestedResource = mock(Resource.class);

        when(location.createRelative(resourcePath)).thenReturn(requestedResource);
        when(requestedResource.exists()).thenReturn(true);
        when(requestedResource.isReadable()).thenReturn(true);

        Config.ReactRoutingPathResourceResolver resolver = new Config.ReactRoutingPathResourceResolver();
        Resource resolvedResource = resolver.getResource(resourcePath, location);

        assertEquals(requestedResource, resolvedResource);

        verify(location).createRelative(resourcePath);
        verify(requestedResource).exists();
        verify(requestedResource).isReadable();
        verifyNoMoreInteractions(location, requestedResource);
    }

}

