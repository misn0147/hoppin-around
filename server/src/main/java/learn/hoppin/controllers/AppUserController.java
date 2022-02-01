package learn.hoppin.controllers;

import learn.hoppin.domain.AppUserService;
import learn.hoppin.models.AppUser;
import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@ConditionalOnWebApplication
public class AppUserController {

    private final AppUserService service;


    public AppUserController(AppUserService service) {
        this.service = service;
    }

    @GetMapping("/user")
    public List<AppUser> findAll(){
        return service.findAll();
    }

    @GetMapping("/user/role")
    public List<String> findAllRoles(){
        return service.findAllRoles();
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<Object> findByAppUserId(@PathVariable int id){
        var user = service.findByAppUserId(id);
        user.setPassword("");
        if (user == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/user/create")
    public ResponseEntity<Object> create(@RequestBody AppUser user){

        var result = service.add(user);
        if (!result.isSuccess()){
            return new ResponseEntity<>(result.getMessages(), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/user/update")
    public ResponseEntity<Object> update(
            @RequestBody AppUser user,
            @AuthenticationPrincipal AppUser principal) {

        if (!principal.hasAuthority("ADMIN")) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        var existing = service.findByAppUserId(user.getId());
        if (existing == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        if (existing.isEnabled() && existing.hasAuthority("ADMIN")
                && existing.getId() != principal.getId()) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        var result = service.update(user);
        if (!result.isSuccess()){
            return new ResponseEntity<>(result.getMessages(), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("user/password")
    public ResponseEntity<Object> changePassword(
            @RequestBody HashMap<String, String> values,
            @AuthenticationPrincipal AppUser principal){

        principal.setPassword(values.get("password"));

        var result = service.changePassword(principal);
        if (!result.isSuccess()){
            return new ResponseEntity<>(result.getMessages(), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
