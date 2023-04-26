package c202.buddiary.global.auth.service;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Key;

@Service
@RequiredArgsConstructor
@AllArgsConstructor
public class JwtTokenProvider {
    private final Key key;

}
