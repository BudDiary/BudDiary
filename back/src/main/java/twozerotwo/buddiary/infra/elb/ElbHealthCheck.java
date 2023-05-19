package twozerotwo.buddiary.infra.elb;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ElbHealthCheck {
	@GetMapping("/actuator/health")
	public ResponseEntity<?> healthcheck() {
		return ResponseEntity.ok().body("");
	}

	@GetMapping("/actuator/info")
	public ResponseEntity<?> infocheck() {
		return ResponseEntity.ok().body("");
	}

}
