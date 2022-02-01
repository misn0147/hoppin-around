package learn.hoppin.security;

import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;


@EnableWebSecurity
@ConditionalOnWebApplication
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final JwtConverter converter;


    public SecurityConfig(JwtConverter converter) {
        this.converter = converter;

    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.csrf().disable();

        http.authorizeRequests()
                .antMatchers(HttpMethod.GET, "/health_check").permitAll()
                .antMatchers(HttpMethod.POST, "/authenticate", "/encode", "/user/create").permitAll()
                .antMatchers(HttpMethod.POST, "/refresh_token").authenticated()
                .antMatchers(HttpMethod.PUT, "/user/password").authenticated()
                .antMatchers(HttpMethod.GET, "/user/**").hasAuthority("ADMIN")
                .antMatchers(HttpMethod.PUT, "/user/update").hasAuthority("ADMIN")
                .and()
                .addFilter(new JwtRequestFilter(authenticationManager(), converter))
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }

    @Override
    @Bean
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

}
