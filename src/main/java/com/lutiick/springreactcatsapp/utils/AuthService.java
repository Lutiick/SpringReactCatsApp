package com.lutiick.springreactcatsapp.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;

@Component
public class AuthService {
    private String secret = "secret";
    Algorithm algorithm;
    int accessTokenTime = 600000;
    int refreshTokenTime = 1800000;


    AuthService() {
        algorithm = Algorithm.HMAC256(secret.getBytes());
    }

    public String createAccessToken(String username, String issuer, List<String> roles) {
        return JWT.create()
                .withSubject(username)
                .withExpiresAt(new Date(System.currentTimeMillis() + accessTokenTime))
                .withIssuer(issuer)
                .withClaim("roles", roles)
                .sign(algorithm);
    }

    public String createRefreshToken(String username, String issuer) {
        return JWT.create()
                .withSubject(username)
                .withExpiresAt(new Date(System.currentTimeMillis() + refreshTokenTime))
                .withIssuer(issuer)
                .sign(algorithm);
    }

    public DecodedJWT decodedJWT(String token) {
        JWTVerifier verifier = JWT.require(algorithm).build();
        return verifier.verify(token);
    }

}
