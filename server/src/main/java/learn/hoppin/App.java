package learn.hoppin;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class App {
    public static void main(String[] args) {
        SpringApplication.run(App.class,args);
    }

    @Bean
    public PasswordEncoder getPasswordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
                // Configure CORS globally versus
        // controller-by-controller or method-by-method.
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {

                // +  addMapping("/**") -- opens all URLs.
                //    Was hoping to limit this to /api/**, but that doesn't
                //    include the necessary HTTP Headers for the login endpoints.
                //    The browser blocks requests without them.
                //    Since we're explicitly limiting origins, seems okay to be
                //    less granular.
                // +  allowMethods -- all CRUD methods
                // +  allowedOrigins -- limit to our known and trusted origin.
                //    Trusting a localhost origin is only safe for development.
                // +  allowCredentials(true) -- turns out this is important.
                //    It tells the client that this server is okay with sharing
                //    cross-origin cookies, an important part of
                //    sharing JWT cookies.
                // System.getenv("ALLOWED_ORIGINS")
                registry.addMapping("/**")
                        .allowedMethods("DELETE", "GET", "POST", "PUT", "OPTIONS")
                        .allowedOrigins("http://localhost:3000")
                        .allowCredentials(true);
            }
        };

}


}
