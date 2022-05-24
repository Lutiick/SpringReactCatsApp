package com.lutiick.springreactcatsapp.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.lutiick.springreactcatsapp.model.Role;
import com.lutiick.springreactcatsapp.model.User;
import com.lutiick.springreactcatsapp.service.UserServiceImpl;
import com.lutiick.springreactcatsapp.utils.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping
public class RegisterController {

    private final UserServiceImpl userService;
    private final AuthService authService;

    public RegisterController(UserServiceImpl userService, AuthService authService) {
        this.userService = userService;
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestParam String username,
                                           @RequestParam String password,
                                           @RequestParam(required = false) String name) {
        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        user.setName(name);
        userService.saveUser(user);
        return ResponseEntity.ok().body("success");
    }
    
    @PostMapping("/refresh")
    public ResponseEntity<Map<String, String>> refreshToken(HttpServletRequest request, @RequestParam("refresh_token") String refreshToken) {
        DecodedJWT decodedJWT = authService.decodedJWT(refreshToken);
        String username = decodedJWT.getSubject();

        User user = userService.getUser(username);

        String access_token = authService.createAccessToken(
                user.getUsername(),
                request.getRequestURL().toString(),
                user.getRoles().stream().map(Role::getName).collect(Collectors.toList())
        );

        Map<String, String> tokens = new HashMap<>();
        tokens.put("access_token", access_token);
        return ResponseEntity.ok().body(tokens);
    }

    @ExceptionHandler(TokenExpiredException.class)
    public ResponseEntity<Map<String, String>> tokenExpiredHandler() {
        Map<String, String> payload = new HashMap<>();
        payload.put("error", "refresh token expired");
        return ResponseEntity.status(403).body(payload);
    }
}
