package twozerotwo.buddiary;

import java.util.TimeZone;

import javax.annotation.PostConstruct;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BuddiaryApplication {
	public static void main(String[] args) {
		SpringApplication.run(BuddiaryApplication.class, args);
	}

	@PostConstruct
	public void started() {
		// timezone UTC 셋팅
		TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
	}

}
