package io.movie.project.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.io.File;


@Component
@ConfigurationProperties(value = "storage")
public class StorageProperties {

    private String source;

    private String location;

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public File getSourceFile(String fileName) {
        return new File(String.format(source, fileName));
    }
}
