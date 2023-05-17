package twozerotwo.buddiary.domain.notification.api;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.domain.club.service.ClubService;
import twozerotwo.buddiary.domain.notification.dto.NewDiaryRequest;
import twozerotwo.buddiary.domain.notification.service.SseService;
import twozerotwo.buddiary.global.util.AuthenticationUtil;
import twozerotwo.buddiary.persistence.entity.Member;

@RestController
@RequiredArgsConstructor
@Slf4j
public class SseController {
	public static Map<Long, SseEmitter> sseEmitters = new ConcurrentHashMap<>();
	public final ClubService clubService;
	private final AuthenticationUtil authenticationUtil;
	private final SseService sseService;


	// 구독 요청
	@GetMapping(value = "/event/sub", consumes = MediaType.ALL_VALUE)
	public SseEmitter subscribe(HttpServletRequest request) {
		Member member = authenticationUtil.getMemberEntityFromRequest(request);
		// Member member = clubService.returnMemberByUsername("yeokyung502@naver.com");
		// 현재 클라이언트를 위한 SseEmitter 생성
		SseEmitter sseEmitter = new SseEmitter(Long.MAX_VALUE);
		try {
			// 연결!!
			sseEmitter.send(SseEmitter.event().name("connect").data("연결 완료"));

		} catch (IOException e) {
			e.printStackTrace();
		}

		sseEmitters.put(member.getId(), sseEmitter);

		sseEmitter.onCompletion(() -> sseEmitters.remove(member.getId()));
		sseEmitter.onTimeout(() -> sseEmitters.remove(member.getId()));
		sseEmitter.onError((e) -> sseEmitters.remove(member.getId()));

		return sseEmitter;
	}

	@PostMapping("/event/double/clubs/{target}")
	public ResponseEntity notifyDoubleInviteEvent(@PathVariable String target, HttpServletRequest request) {
		Member inviter = authenticationUtil.getMemberEntityFromRequest(request);
		// Member inviter = clubService.returnMemberByUsername("yeokyung502@naver.com");
		sseService.notifyDoubleInviteEvent(inviter, target);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@PostMapping("/event/clubs/new-diary")
	public ResponseEntity notifyNewDiaryInClub(@RequestBody NewDiaryRequest request, HttpServletRequest servlet) {
		Member member = authenticationUtil.getMemberEntityFromRequest(servlet);
		for (String clubUuid : request.getClubList()) {
			sseService.notifyNewDiaryInClub(member, clubUuid);
		}
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
