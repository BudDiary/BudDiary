-- MariaDB dump 10.19  Distrib 10.11.3-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: mj
-- ------------------------------------------------------
-- Server version	10.11.3-MariaDB-1:10.11.3+maria~ubu2204

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `club`
--

DROP TABLE IF EXISTS `club`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `club` (
  `club_id` varchar(255) NOT NULL,
  `captain_username` varchar(255) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `maximum_member` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `thumbnail_path` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`club_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `club`
--

LOCK TABLES `club` WRITE;
/*!40000 ALTER TABLE `club` DISABLE KEYS */;
INSERT INTO `club` VALUES
('1a29632a-38e4-4440-b1c1-f04bbd128ba4','meanwo0603@naver.com','2023-05-18 17:12:54',30,'오후5시 12분','https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Club/ff076939-edd1-4532-a985-41b6892b5a51-%ED%8F%AC%EC%BC%93%EB%AA%AC.png','PLURAL'),
('1e4bb70f-2f13-4e47-8f30-b2ec266b7d7d',NULL,'2023-05-19 02:20:04',2,'지오님과 Jake님의 교환일기',NULL,'DOUBLE'),
('2e001c05-03ba-4291-a60f-412d3d7331b7','yeokyung502@naver.com','2023-05-19 02:57:11',30,'박태환 바보','https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Club/6960f8f2-52c0-4f58-b0a9-e9b463667fd9-dontlivelikethat.png','PLURAL'),
('478ac0b5-9b0b-438f-a329-ad6a8ddb6154',NULL,'2023-05-18 22:23:26',2,'정민우님과 지오님의 교환일기',NULL,'DOUBLE'),
('a5ff2db1-3974-45ea-973e-c6ecdad7869f','sodauschlrdh@naver.com','2023-05-18 16:18:45',30,'와... 나도 껴줘','https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Club/b6a35da3-ca60-45e0-8abc-d4abb9b474fb-hedgehog.jfif','PLURAL'),
('ba65927c-607a-4058-a5b1-4a8ccdbadae3','raichu311@naver.com','2023-05-19 02:27:00',30,'봉사활동 일지','https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Club/d07908d6-28c4-4f36-ac8a-e48bcb29dc12-happy.png','PLURAL'),
('c0d0ab65-54cf-4ef4-916b-27671441a6fc','meanwo0603@naver.com','2023-05-18 19:40:57',30,'7시40분 방 생성','https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Club/0d44c5e0-8392-46de-8e42-131fc5029a91-arrow.png','PLURAL'),
('cc224033-e622-432e-b8c5-b9e682042d5d','raichu311@naver.com','2023-05-18 23:05:20',30,'강아지 산책 일기장','https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Club/a3e43d88-2ac5-4c4c-b59f-3d514e4b43e3-2019042216101565666.jpg','PLURAL'),
('ce124868-ab88-4144-b1bb-27f9a55bfa54','raichu311@naver.com','2023-05-19 09:47:26',30,'개발꿈나무 일기','https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Club/f8fdebac-8a9b-4370-ba74-f61e628d0b8e-%EC%8B%B8%ED%94%BC.png','PLURAL'),
('d86ba282-8e67-4ee3-b49f-0162b47b3cac','meanwo0603@naver.com','2023-05-18 17:16:52',30,'새로운 교환일기','https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Club/7eba9642-2ad3-40c3-8b37-5a591f9fa138-imoji_like.png','PLURAL'),
('dca02118-f5e0-4269-8593-1ed3b9589d7a','krocd@kakao.com','2023-05-18 17:36:10',30,'민우와 함께하는 일기','https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Club/d5ca572d-2ffd-45fb-936d-84e592996816-%EB%A7%8C%EB%91%90.jpg','PLURAL'),
('e1b48fe2-1bf6-4a7a-a3fa-2d4af73ce355','krocd@kakao.com','2023-05-18 17:42:51',30,'민우와 3번째 일기','https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Club/4e2c319e-a149-4021-8f47-a64ac05d60b0-Bud_Diary.png','PLURAL'),
('eb6d79c6-8fec-48e6-b12f-c5e9b5126a79','yeokyung502@naver.com','2023-05-19 10:43:42',30,'횐님들','https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Club/477411cc-d42f-4a1e-a79f-fc6ea22bb0d1-%EA%B0%9C%EB%B0%9C.jpg','PLURAL'),
('f7d93b36-5229-4268-9109-e2c3fd22c93c','krocd@kakao.com','2023-05-18 17:41:03',30,'민우와 함께하는 두번째일기','https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Club/366904b7-c8a2-4ad2-aa52-30d42543da3c-%EB%A7%8C%EB%91%90.jpg','PLURAL');
/*!40000 ALTER TABLE `club` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comment` (
  `comment_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `text` varchar(200) NOT NULL,
  `write_date` datetime DEFAULT NULL,
  `diary_id` bigint(20) DEFAULT NULL,
  `member_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `FKb9952x4sqc7huiboiw7ce3ti9` (`diary_id`),
  KEY `FKmrrrpi513ssu63i2783jyiv9m` (`member_id`),
  CONSTRAINT `FKb9952x4sqc7huiboiw7ce3ti9` FOREIGN KEY (`diary_id`) REFERENCES `diary` (`diary_id`),
  CONSTRAINT `FKmrrrpi513ssu63i2783jyiv9m` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES
(8,'정말로 재미졌다.','2023-05-19 02:31:18',42,5),
(9,'댓글 적다','2023-05-19 02:37:03',42,5),
(13,'최고야','2023-05-19 11:54:23',8,6);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diary`
--

DROP TABLE IF EXISTS `diary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `diary` (
  `diary_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `negative_rate` float DEFAULT NULL,
  `positive_rate` float DEFAULT NULL,
  `text` varchar(1000) NOT NULL,
  `write_date` datetime DEFAULT NULL,
  `club_id` varchar(255) DEFAULT NULL,
  `member_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`diary_id`),
  KEY `FKgt7wdtolfsxs3ibg94pui0v25` (`club_id`),
  KEY `FKbyluyva0mxnf5jitf297oxlxd` (`member_id`),
  CONSTRAINT `FKbyluyva0mxnf5jitf297oxlxd` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`),
  CONSTRAINT `FKgt7wdtolfsxs3ibg94pui0v25` FOREIGN KEY (`club_id`) REFERENCES `club` (`club_id`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diary`
--

LOCK TABLES `diary` WRITE;
/*!40000 ALTER TABLE `diary` DISABLE KEYS */;
INSERT INTO `diary` VALUES
(1,31.29,68.53,'난 오늘 너무 행복하다..너무 행복하다 즐겁다..웃자, ㅋㅋㅋㅋㅋㅋ...나는 행복합니다. 한화 좋아\r\n그만','2023-05-18 16:44:08',NULL,3),
(2,25.01,50.01,'진심으로 나를 이해하고 지지해주는 사람과 함께하는 연애는 행복의 근원이다. 행복 행복 행복 연애 연애 연애','2023-05-18 16:46:12',NULL,3),
(3,25.01,50.01,'진심으로 나를 이해하고 지지해주는 사람과 함께하는 연애는 행복의 근원이다. 행복 행복 행복 연애 연애 연애','2023-05-18 17:11:50',NULL,4),
(5,0,75.01,'오늘은 어제와는 다른 종류의 데이트를 했어. 지오가 나에게 특별한 Überraschung(서프라이즈)를 준비해줬거든! 아침에 일어나서 문 앞에 작은 선물 상자가 놓여있었어. 궁금한 마음에 설레면서 선물을 열어보니, 예쁜 꽃다발과 함께 작은 메모가 있었어. 메모에는 \"오늘은 우리가 함께 소소한 피크닉을 즐길 거야. 준비되어있는 것을 담은 가방을 가져와!\"라고 써있었어.\r\n\r\n기분 좋게 피크닉을 위한 준비물을 챙겨서 지오와 미리 정해진 공원으로 향했어. 거기에는 이미 준비된 이국적인 분위기의 피크닉 장소가 있었어. 컬러풀한 담요 위에는 다양한 음식과 간식들이 차례로 준비되어 있었어. 지오는 정말로 섬세하게 신경써서 모든 것을 준비한 모습이 인상적이었어.\r\n\r\n우리는 그곳에서 편안하게 앉아서 맛있는 음식을 먹으며 이야기를 나눴어. 바람이 부는 날씨였는데, 우리는 서로를 따뜻하게 감싸는 이야기와 웃음으로 가득했어. 피크닉 장소의 야외 음악도 우리의 분위기를 더욱 로맨틱하게 만들어주었어.','2023-05-18 22:28:21',NULL,6),
(7,0.02,89.97,'오늘은 지오와 데이트를 했어! 정말 특별하고 즐거운 하루였어. 아침에 우리는 함께 아침 식사를 하기로 했는데, 그 전에 운동을 하기로 약속했어. 지오는 운동을 좋아해서 항상 활기차게 움직이는 게 보기 좋아. 함께 운동을 하면서 많이 놀았고, 힘들었지만 즐거웠어.','2023-05-18 22:29:46',NULL,6),
(8,0.02,79.98,'오늘은 지오와 데이트를 했어! 정말 특별하고 즐거운 하루였어. 아침에 우리는 함께 아침 식사를 하기로 했는데, 그 전에 운동을 하기로 약속했어. 지오는 운동을 좋아해서 항상 활기차게 움직이는 게 보기 좋아. 함께 운동을 하면서 많이 놀았어','2023-05-18 22:31:06','478ac0b5-9b0b-438f-a329-ad6a8ddb6154',6),
(9,0.02,79.98,'오늘은 지오와 데이트를 했어! 정말 특별하고 즐거운 하루였어. 아침에 우리는 함께 아침 식사를 하기로 했는데, 그 전에 운동을 하기로 약속했어. 지오는 운동을 좋아해서 항상 활기차게 움직이는 게 보기 좋아. 함께 운동을 하면서 많이 놀았어','2023-05-18 22:31:06',NULL,6),
(12,0.01,85.68,'오늘은 민우와 함께 특별한 데이트를 즐겼다. 날씨가 좋아서 공원으로 갔는데, 산책하면서 서로 이야기를 나눴다. 그리고 민우가 꽃 한 송이를 줬어. 저녁에는 맛있는 식당에서 저녁을 먹고 즐거운 대화를 나눴다.','2023-05-18 23:03:28',NULL,3),
(13,0,85.71,'오늘은 우리 치와와 강쥐와 산책을 했어요. 아주 즐거운 시간이었답니다','2023-05-18 23:10:57','cc224033-e622-432e-b8c5-b9e682042d5d',5),
(19,2.4,84,'가나다','2023-05-14 23:17:29',NULL,6),
(21,0,0,'라마','2023-05-11 23:19:26',NULL,6),
(22,72.2,0,'오늘은 행복했다 ','2023-05-16 23:19:39',NULL,6),
(23,0.01,0.02,'ㅁㄴㅇㅁㄴㅇㅁㄴㅇ','2023-05-18 23:55:57',NULL,3),
(25,0.01,92.29,'2023년 5월 18일. 오랜만에 만난 그녀, 여전히 이브이를 사랑하는 모습에 가슴이 뛴다. \r\n이 만남이 내게 주는 행복이 너무 소중하다.','2023-05-19 00:26:46',NULL,3),
(27,0.01,92.29,'2023년 5월 18일. 오랜만에 만난 그녀, 여전히 이브이를 사랑하는 모습에 가슴이 뛴다. \r\n이 만남이 내게 주는 행복이 너무 소중하다.','2023-05-19 00:38:09',NULL,3),
(29,0.01,92.29,'2023년 5월 18일. 오랜만에 만난 그녀, 여전히 이브이를 사랑하는 모습에 가슴이 뛴다. \r\n이 만남이 내게 주는 행복이 너무 소중하다.','2023-05-19 01:09:58',NULL,3),
(31,0.01,92.29,'2023년 5월 18일. 오랜만에 만난 그녀, 여전히 이브이를 사랑하는 모습에 가슴이 뛴다. \r\n이 만남이 내게 주는 행복이 너무 소중하다.','2023-05-19 01:25:01',NULL,3),
(33,0.01,92.29,'2023년 5월 18일. 오랜만에 만난 그녀, 여전히 이브이를 사랑하는 모습에 가슴이 뛴다. \r\n이 만남이 내게 주는 행복이 너무 소중하다.','2023-05-19 01:25:02',NULL,3),
(35,0.01,92.29,'2023년 5월 18일. 오랜만에 만난 그녀, 여전히 이브이를 사랑하는 모습에 가슴이 뛴다. \r\n이 만남이 내게 주는 행복이 너무 소중하다.','2023-05-19 01:51:39',NULL,3),
(37,0.01,92.29,'2023년 5월 18일. 오랜만에 만난 그녀, 여전히 이브이를 사랑하는 모습에 가슴이 뛴다. \r\n이 만남이 내게 주는 행복이 너무 소중하다.','2023-05-19 01:56:00',NULL,3),
(39,0.01,92.29,'2023년 5월 18일. 오랜만에 만난 그녀, 여전히 이브이를 사랑하는 모습에 가슴이 뛴다. \r\n이 만남이 내게 주는 행복이 너무 소중하다.','2023-05-19 02:01:36',NULL,3),
(41,0.01,93.72,'오늘은 민우와 함께 특별한 데이트를 즐겼다. 날씨가 좋아서 공원으로 갔는데, 산책하면서 서로 이야기를 나눴다. 그리고 민우가 꽃 한 송이를 줬어. 저녁에는 맛있는 식당에서 저녁을 먹고 즐거운 대화를 나눴다. 민우는 웃음이 많아서 항상 행복하게 지낼 수 있었어. 데이트를 마치고 돌아오는 길에는 손을 잡고 걸었는데, 민우와 함께 한 시간이 너무 행복했다. 민우랑 더 많은 추억을 만들고 싶어.','2023-05-19 02:12:47',NULL,3),
(42,0,99.99,'오늘 처음으로 배고픈 사람들에게 음식을 가져다 주는 아름다운 식탁행사에 다녀왔다. \r\n푸드 리퍼브라고 버려질 수도 있는 음식을 배고픈 이웃에게 나눠주는 행사라고 하는 데 꽤 재미있었다.','2023-05-19 02:31:02','ba65927c-607a-4058-a5b1-4a8ccdbadae3',5),
(43,0,99.99,'오늘 처음으로 배고픈 사람들에게 음식을 가져다 주는 아름다운 식탁행사에 다녀왔다. \r\n푸드 리퍼브라고 버려질 수도 있는 음식을 배고픈 이웃에게 나눠주는 행사라고 하는 데 꽤 재미있었다.','2023-05-19 02:31:03',NULL,5),
(45,0.01,85.68,'오늘은 민우와 함께 특별한 데이트를 즐겼다. 날씨가 좋아서 공원으로 갔는데, 산책하면서 서로 이야기를 나눴다. 그리고 민우가 꽃 한 송이를 줬어. 저녁에는 맛있는 식당에서 저녁을 먹고 즐거운 대화를 나눴다.','2023-05-19 02:36:17',NULL,3),
(47,0.01,92.29,'2023년 5월 18일. 오랜만에 만난 그녀, 여전히 이브이를 사랑하는 모습에 가슴이 뛴다. \r\n이 만남이 내게 주는 행복이 너무 소중하다.','2023-05-19 02:41:47',NULL,3),
(49,0.01,85.68,'오늘은 민우와 함께 특별한 데이트를 즐겼다. 날씨가 좋아서 공원으로 갔는데, 산책하면서 서로 이야기를 나눴다. 그리고 민우가 꽃 한 송이를 줬어. 저녁에는 맛있는 식당에서 저녁을 먹고 즐거운 대화를 나눴다.','2023-05-19 03:02:54',NULL,3),
(51,0,85.68,'오늘은 민우와 함께 특별한 데이트를 즐겼다. 날씨가 좋아서 공원으로 갔는데, 산책하면서 서로 이야기를 나눴다. 그리고 민우가 꽃 한 송이를 줬어. 저녁에는 맛있는 식당에서 저녁을 먹고 즐거운 대화를 나눴다','2023-05-19 08:58:07',NULL,3),
(53,0,85.68,'오늘은 민우와 함께 특별한 데이트를 즐겼다. 날씨가 좋아서 공원으로 갔는데, 산책하면서 서로 이야기를 나눴다. 그리고 민우가 꽃 한 송이를 줬어. 저녁에는 맛있는 식당에서 저녁을 먹고 즐거운 대화를 나눴다','2023-05-19 09:12:10',NULL,3),
(55,0,85.68,'오늘은 민우와 함께 특별한 데이트를 즐겼다. 날씨가 좋아서 공원으로 갔는데, 산책하면서 서로 이야기를 나눴다. 그리고 민우가 꽃 한 송이를 줬어. 저녁에는 맛있는 식당에서 저녁을 먹고 즐거운 대화를 나눴다','2023-05-19 09:35:15',NULL,3),
(57,0.02,80.07,'2023년 5월 18일, 오랜만에 만난 그녀는 여전히 그대로였다. 그녀의 눈부신 미소와 이브이를 향한 애정은 변하지 않았다. 그녀와의 만남은 나에게 오랜만에 느껴본 행복을 선사했다. 이 날을 영원히 기억하고 싶다. 오늘은 참으로 특별한 날이었다.','2023-05-19 09:39:07',NULL,3),
(59,0,85.68,'오늘은 민우와 함께 특별한 데이트를 즐겼다. 날씨가 좋아서 공원으로 갔는데, 산책하면서 서로 이야기를 나눴다. 그리고 민우가 꽃 한 송이를 줬다. 저녁에는 맛있는 식당에서 저녁을 먹고 즐거운 대화를 나눴다','2023-05-19 09:40:25',NULL,3),
(60,0.02,95.27,'하루하루 발전하는 개발자의 꿈을 향한 일기. 코드와 함께 성장하는 내 모습을 담아냅니다. 오늘도 새로운 기술을 배우고, 문제를 해결하며 성취감을 느낍니다. 작은 성공과 실패 속에서도 꾸준히 도전하며 성장하는 개발자가 되기 위해 노력합니다. 내일의 나는 더 나은 코드를 짤 수 있도록 노력하며, 개발자로서의 꿈을 향해 한 걸음씩 나아갑니다','2023-05-19 09:48:57','ce124868-ab88-4144-b1bb-27f9a55bfa54',5),
(61,0.02,95.27,'하루하루 발전하는 개발자의 꿈을 향한 일기. 코드와 함께 성장하는 내 모습을 담아냅니다. 오늘도 새로운 기술을 배우고, 문제를 해결하며 성취감을 느낍니다. 작은 성공과 실패 속에서도 꾸준히 도전하며 성장하는 개발자가 되기 위해 노력합니다. 내일의 나는 더 나은 코드를 짤 수 있도록 노력하며, 개발자로서의 꿈을 향해 한 걸음씩 나아갑니다','2023-05-19 09:48:57',NULL,5),
(63,0.05,99.95,'행복하다','2023-05-19 09:52:32',NULL,3),
(64,60.36,0.04,'오늘도 5커밋을 했다... 프로젝트 마지막 날인데 오늘 한 게 제일 많은 거 같다.. 안되는 부분은 왜 안되는지 모르겠고.. 되는 부분은 왜 이게..? 가능한..? 아무튼 미스테리한 하루이다.','2023-05-19 10:26:50','ce124868-ab88-4144-b1bb-27f9a55bfa54',7),
(65,60.36,0.04,'오늘도 5커밋을 했다... 프로젝트 마지막 날인데 오늘 한 게 제일 많은 거 같다.. 안되는 부분은 왜 안되는지 모르겠고.. 되는 부분은 왜 이게..? 가능한..? 아무튼 미스테리한 하루이다.','2023-05-19 10:26:51',NULL,7),
(67,0,85.68,'오늘은 민우와 함께 특별한 데이트를 즐겼다. 날씨가 좋아서 공원으로 갔는데, 산책하면서 서로 이야기를 나눴다. 그리고 민우가 꽃 한 송이를 줬어. 저녁에는 맛있는 식당에서 저녁을 먹고 즐거운 대화를 나눴다','2023-05-19 10:33:28',NULL,3),
(69,0,85.68,'오늘은 민우와 함께 특별한 데이트를 즐겼다. 날씨가 좋아서 공원으로 갔는데, 산책하면서 서로 이야기를 나눴다. 그리고 민우가 꽃 한 송이를 줬어. 저녁에는 맛있는 식당에서 저녁을 먹고 즐거운 대화를 나눴다','2023-05-19 10:35:20',NULL,3),
(70,0.01,0.01,'abdfsdf','2023-05-19 10:38:56',NULL,4),
(73,0.16,0.02,'ㅅ','2023-05-19 10:41:26',NULL,9),
(75,0.02,80.07,'2023년 5월 18일, 오랜만에 만난 그녀는 여전히 그대로였다. 그녀의 눈부신 미소와 이브이를 향한 애정은 변하지 않았다. 그녀와의 만남은 나에게 오랜만에 느껴본 행복을 선사했다. 이 날을 영원히 기억하고 싶다. 오늘은 참으로 특별한 날이었다.','2023-05-19 10:51:48',NULL,3),
(76,0.04,99.96,'정말 행복한 하루야','2023-05-19 11:56:15','ce124868-ab88-4144-b1bb-27f9a55bfa54',6),
(77,0.04,99.96,'정말 행복한 하루야','2023-05-19 11:56:15',NULL,6);
/*!40000 ALTER TABLE `diary` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diary_image`
--

DROP TABLE IF EXISTS `diary_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `diary_image` (
  `diary_image_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `img_url` text DEFAULT NULL,
  `diary_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`diary_image_id`),
  KEY `FKlqq77k7ifchoc8dcak4jyb06y` (`diary_id`),
  CONSTRAINT `FKlqq77k7ifchoc8dcak4jyb06y` FOREIGN KEY (`diary_id`) REFERENCES `diary` (`diary_id`)
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diary_image`
--

LOCK TABLES `diary_image` WRITE;
/*!40000 ALTER TABLE `diary_image` DISABLE KEYS */;
INSERT INTO `diary_image` VALUES
(2,'https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Diary/a9fec4dc-f3b8-47e7-a85d-6c2db863b289-5e9a1e8a-674d-40f6-acb5-1bf064c29d32.png',7),
(3,'https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Diary/6a54b591-c466-4575-951a-86e15e8bb36c-e2247f5f-d10f-4438-93d8-b3f7f827978b.png',8),
(4,'https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Diary/f6c3416b-0b08-494e-9bc8-9c7bbec4a967-e2247f5f-d10f-4438-93d8-b3f7f827978b.png',9),
(7,'https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Diary/c8369d47-8416-4d12-8817-18c3658056d2-29b5ecf1-aac6-42a8-b809-452d6ee6e35e.png',12),
(8,'https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Diary/6938f2d7-0652-4e7d-83b7-b3309da871f9-37ce4e41-1069-4458-bf5a-8505b65bf17c.png',13),
(9,'https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Diary/68351915-093b-4574-9725-043f8bca9ce0-e56ee935-f10d-4148-b58e-5c3a7b8999cf.png',13),
(15,'https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Diary/7e341ab7-407a-4722-bb5b-06b8089e3151-flower.jpeg',19),
(17,'https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Diary/c85747c6-766f-43e3-991f-a39e6609142a-flower.jpeg',21),
(18,'https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Diary/f28f640e-98dd-43bc-9d5d-90aea0fa55e9-flower.jpeg',22),
(20,'https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Diary/7bdd4cb0-f91f-4af2-8484-529cbd072f22-e10b5375-7af3-4427-90e8-c4f33f675704.png',25),
(22,'https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Diary/b310e196-5f3c-4e9e-85f6-3b177d4e1ec8-fdaee1dc-cc83-4549-b7b3-df9034511e66.png',27),
(24,'https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Diary/2388ee61-d687-4895-866a-24158570fca7-da35a328-2df0-459f-bb3b-c1f41899e0e0.png',29),
(26,'https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Diary/7b888fcd-b2c9-47c9-837c-5379408637db-83f33f7b-5e5f-49ff-98a8-d8b657af255a.png',31),
(28,'https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Diary/6df73163-083c-4f52-95b1-d1df52c376a0-83f33f7b-5e5f-49ff-98a8-d8b657af255a.png',33),
(30,'https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Diary/2cc443d7-4d9d-44a3-8c70-d19078a99d9f-22a52ece-bf0b-4e02-a05c-49418f6ee353.png',35),
(32,'https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Diary/172f2d90-6b0c-4a28-b7c2-81c6aaafbaaa-b12a4ff2-ecff-428d-a634-74420c9bd4ba.png',37),
(34,'https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Diary/08b5c22c-c977-4491-a6bf-22bd608d5438-02900c64-a778-4087-97b9-a2f010ff2b03.png',39),
(36,'https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Diary/7da23e3d-cf6b-4370-abc8-985ca7099939-8ea148de-5216-4186-bb67-3d40cfcc31cf.png',41),
(37,'https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Diary/238f5760-3ffe-4b2f-b24b-f1fa801332a1-c1c1b9f8-3011-4039-be1b-5981d947f3f6.png',42),
(38,'https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Diary/fc552fc6-cb4f-4436-885a-f662127e4713-6be057fd-f5fd-47bb-afae-da181aab7ced.png',42),
(39,'https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Diary/d9f01e23-e500-4afd-9b62-671453551493-87b15f61-52b9-460d-97fd-5bda634e677a.png',42),
(40,'https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Diary/d3e53c61-1a1a-43ca-9890-b390a9ed0435-c1c1b9f8-3011-4039-be1b-5981d947f3f6.png',43),
(41,'https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Diary/1c6c68a4-7a1a-4e9d-9bef-bbf683bd31fc-6be057fd-f5fd-47bb-afae-da181aab7ced.png',43),
(42,'https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Diary/b753a039-1de5-4386-8b9e-9ae7a661865f-87b15f61-52b9-460d-97fd-5bda634e677a.png',43),
(44,'https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Diary/819be1a8-5c11-4b5e-8042-9c7a7ef6bfef-b7f39277-9311-47a5-93b0-aae57d9cb8e0.png',45),
(46,'https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Diary/6740d9b8-fa9f-4525-b976-034267ebf46d-ed542fec-9e82-4af2-b454-aac45b16b654.png',47),
(48,'https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Diary/113b464e-b962-4af2-94f8-d676fefb7136-f2476a2e-faf0-45bc-8fdf-47113146445b.png',49),
(50,'https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Diary/42302130-0aab-4695-87d3-84c0353310be-7393e606-cc22-4649-a832-0242b7fb19dd.png',51),
(52,'https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Diary/d19be408-47a5-43db-b142-dc1efd055459-bb9bce30-01fe-44e7-a5a0-937e225c4d91.png',53),
(54,'https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Diary/a55ea660-e3f1-413d-aadd-137eae322758-64b8f898-e811-46fa-a19d-05bebb6ebcea.png',57),
(56,'https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Diary/a7f66b36-8503-4f7a-a4a8-9921dde52892-8e3d89f8-8a14-4643-bf3d-919e8123e7bc.png',59),
(57,'https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Diary/85963ff9-ff51-4a45-9daa-7263f7ec1c70-0b80e1fc-576f-4e6a-8fd8-b29df4ef7174.png',60),
(58,'https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Diary/9d442ed7-6c2f-4e24-a952-9252e9627d52-0b80e1fc-576f-4e6a-8fd8-b29df4ef7174.png',61),
(60,'https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Diary/f055360b-977a-485f-a2fa-bd8f9b66b278-ff2ff489-e4ae-4da6-9b92-7982a2295a05.png',63),
(61,'https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Diary/17b8fac4-2c2b-42ed-bccd-f17a49571f46-c0e81710-4632-4d0f-9b39-17df5018d924.png',64),
(62,'https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Diary/314f875d-0ebc-4e38-82d4-5dca81f96d8e-c0e81710-4632-4d0f-9b39-17df5018d924.png',65),
(64,'https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Diary/0bd22195-003b-4622-af0e-cc687c61e5ef-eb426229-d746-4f05-b442-08156d5a5e3f.png',67),
(66,'https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Diary/e0cb1d49-c1a0-4c63-8b47-3bd45c1967f4-80d3603d-d3e6-4812-a163-a6c6f240af56.png',69),
(67,'https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Diary/1e9ce9b7-9745-4a45-ac7e-6849d7cb5f33-eaede177-aab0-4f83-a7d5-d069b4f8b45f.png',70),
(71,'https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Diary/9f7bfca6-72b8-43bd-9a74-2c6e268c48bd-17538e94-b4eb-4fa6-9994-0e29754fe143.png',75),
(72,'https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Diary/69fe0b3a-2e75-4ce8-94cf-2489a244c8e9-191f9c24-9bad-45c0-b06b-316bd12868d2.png',76),
(73,'https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Diary/a54e430c-f1a5-4a6c-913a-8e92d1f94abf-191f9c24-9bad-45c0-b06b-316bd12868d2.png',77);
/*!40000 ALTER TABLE `diary_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `member` (
  `member_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `account_non_locked` bit(1) NOT NULL,
  `account_not_expired` bit(1) NOT NULL,
  `age_range` varchar(255) DEFAULT NULL,
  `check_preference` bit(1) NOT NULL,
  `enabled` bit(1) NOT NULL,
  `enroll_date` datetime DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `intro` varchar(255) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone_number` varchar(2000) DEFAULT NULL,
  `point` bigint(20) NOT NULL,
  `profile_path` varchar(2000) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `social_id` varchar(255) DEFAULT NULL,
  `social_type` varchar(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  PRIMARY KEY (`member_id`),
  UNIQUE KEY `UK_ghllwqgkdbwwp28ijrqih43nt` (`social_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES
(2,'','','20~29','\0','','2023-05-18 16:17:46','male',NULL,'coach',NULL,NULL,20,'https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Profile/63b80b39-8610-4812-b188-5b1303cee1b2-hedgehog.jfif','USER','2793617765','KAKAO','sodauschlrdh@naver.com'),
(3,'','','20~29','\0','','2023-05-18 16:30:24','female','나야나','지오',NULL,NULL,95,'https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Profile/a8639cc8-493a-4174-ac0b-8eac6329e258-gio.jpeg','USER','2780506826','KAKAO','krocd@kakao.com'),
(4,'','','20~29','\0','','2023-05-18 17:07:50','male',NULL,'우기명',NULL,NULL,75,'https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Profile/045e38d7-1793-443a-b86d-c7095620f026-Screenshot_20230512_220609_NAVER.jpg','USER','2782987564','KAKAO','meanwo0603@naver.com'),
(5,'','','30~39','\0','','2023-05-18 17:32:33','male',NULL,'Jake',NULL,NULL,310,'https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Profile/27e9bca0-0c12-4cb8-acc0-b2461a187b44-%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C.jpg','USER','2794185464','KAKAO','raichu311@naver.com'),
(6,'','','20~29','\0','','2023-05-18 21:26:46','male','오직 지오만...','정민우',NULL,NULL,25,'https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Profile/22928d82-e95b-45cc-b731-f8389b0b4610-KakaoTalk_20230518_222002204.jpg','USER','2781593771','KAKAO','ats16@daum.net'),
(7,'','','20~29','\0','','2023-05-19 02:51:48','female',NULL,'살자리버스',NULL,NULL,100,'https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Profile/51ba2f6c-08dc-4203-9ae3-808ca9226296-dontlivelikethat.png','USER','2781622496','KAKAO','yeokyung502@naver.com'),
(9,'','','20~29','\0','','2023-05-19 10:15:13','female',NULL,'도치',NULL,NULL,55,'https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Profile/21d711a5-19e4-434c-91a3-fd1ba5717bb4-v4q0b0ff4hcpew1g6t39.jpg','USER','2781573034','KAKAO','runningbluebubbles@hotmail.com');
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member_club`
--

DROP TABLE IF EXISTS `member_club`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `member_club` (
  `member_club_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `club_id` varchar(255) DEFAULT NULL,
  `member_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`member_club_id`),
  KEY `FK73tthgfalulir41hmwmuwieyc` (`club_id`),
  KEY `FKbwpq58hyksntm0wcrunw2hcqe` (`member_id`),
  CONSTRAINT `FK73tthgfalulir41hmwmuwieyc` FOREIGN KEY (`club_id`) REFERENCES `club` (`club_id`),
  CONSTRAINT `FKbwpq58hyksntm0wcrunw2hcqe` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member_club`
--

LOCK TABLES `member_club` WRITE;
/*!40000 ALTER TABLE `member_club` DISABLE KEYS */;
INSERT INTO `member_club` VALUES
(1,'a5ff2db1-3974-45ea-973e-c6ecdad7869f',2),
(2,'1a29632a-38e4-4440-b1c1-f04bbd128ba4',4),
(3,'d86ba282-8e67-4ee3-b49f-0162b47b3cac',4),
(4,'dca02118-f5e0-4269-8593-1ed3b9589d7a',3),
(5,'f7d93b36-5229-4268-9109-e2c3fd22c93c',3),
(6,'e1b48fe2-1bf6-4a7a-a3fa-2d4af73ce355',3),
(7,'e1b48fe2-1bf6-4a7a-a3fa-2d4af73ce355',4),
(8,'c0d0ab65-54cf-4ef4-916b-27671441a6fc',4),
(19,'478ac0b5-9b0b-438f-a329-ad6a8ddb6154',6),
(20,'478ac0b5-9b0b-438f-a329-ad6a8ddb6154',3),
(21,'cc224033-e622-432e-b8c5-b9e682042d5d',5),
(24,'1e4bb70f-2f13-4e47-8f30-b2ec266b7d7d',3),
(25,'1e4bb70f-2f13-4e47-8f30-b2ec266b7d7d',5),
(26,'ba65927c-607a-4058-a5b1-4a8ccdbadae3',5),
(27,'2e001c05-03ba-4291-a60f-412d3d7331b7',7),
(29,'ce124868-ab88-4144-b1bb-27f9a55bfa54',5),
(30,'ce124868-ab88-4144-b1bb-27f9a55bfa54',3),
(31,'ce124868-ab88-4144-b1bb-27f9a55bfa54',7),
(32,'ce124868-ab88-4144-b1bb-27f9a55bfa54',9),
(33,'eb6d79c6-8fec-48e6-b12f-c5e9b5126a79',7),
(34,'ce124868-ab88-4144-b1bb-27f9a55bfa54',6);
/*!40000 ALTER TABLE `member_club` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notification` (
  `notification_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `club_name` varchar(255) DEFAULT NULL,
  `club_uuid` varchar(255) DEFAULT NULL,
  `is_checked` bit(1) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `member_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`notification_id`),
  KEY `FK1xep8o2ge7if6diclyyx53v4q` (`member_id`),
  CONSTRAINT `FK1xep8o2ge7if6diclyyx53v4q` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification` VALUES
(14,NULL,NULL,'','mandu','DOUBLE_INVITE','krocd@kakao.com',4),
(15,NULL,NULL,'','우기명','DOUBLE_INVITE','meanwo0603@naver.com',3),
(16,NULL,NULL,'','우기명','DOUBLE_INVITE','meanwo0603@naver.com',3),
(17,NULL,NULL,'','정민우','DOUBLE_INVITE','ats16@daum.net',3),
(18,NULL,NULL,'','정민우','DOUBLE_INVITE','ats16@daum.net',3),
(19,'정민우님과 지오님의 교환일기','478ac0b5-9b0b-438f-a329-ad6a8ddb6154','','정민우','CLUB_WRITE','ats16@daum.net',6),
(20,'정민우님과 지오님의 교환일기','478ac0b5-9b0b-438f-a329-ad6a8ddb6154','','정민우','CLUB_WRITE','ats16@daum.net',3),
(21,'정민우님과 지오님의 교환일기','478ac0b5-9b0b-438f-a329-ad6a8ddb6154','','정민우','CLUB_WRITE','ats16@daum.net',6),
(22,'정민우님과 지오님의 교환일기','478ac0b5-9b0b-438f-a329-ad6a8ddb6154','','정민우','CLUB_WRITE','ats16@daum.net',3),
(23,'정민우님과 지오님의 교환일기','478ac0b5-9b0b-438f-a329-ad6a8ddb6154','','정민우','CLUB_WRITE','ats16@daum.net',3),
(24,'정민우님과 지오님의 교환일기','478ac0b5-9b0b-438f-a329-ad6a8ddb6154','','정민우','CLUB_WRITE','ats16@daum.net',6),
(25,'정민우님과 지오님의 교환일기','478ac0b5-9b0b-438f-a329-ad6a8ddb6154','','정민우','CLUB_WRITE','ats16@daum.net',3),
(26,'정민우님과 지오님의 교환일기','478ac0b5-9b0b-438f-a329-ad6a8ddb6154','','정민우','CLUB_WRITE','ats16@daum.net',6),
(27,NULL,NULL,'\0','정민우','DOUBLE_INVITE','ats16@daum.net',4),
(28,NULL,NULL,'\0','정민우','DOUBLE_INVITE','ats16@daum.net',4),
(29,NULL,NULL,'\0','정민우','DOUBLE_INVITE','ats16@daum.net',4),
(30,'정민우님과 지오님의 교환일기','478ac0b5-9b0b-438f-a329-ad6a8ddb6154','','지오','CLUB_WRITE','krocd@kakao.com',3),
(31,'정민우님과 지오님의 교환일기','478ac0b5-9b0b-438f-a329-ad6a8ddb6154','','지오','CLUB_WRITE','krocd@kakao.com',6),
(32,'정민우님과 지오님의 교환일기','478ac0b5-9b0b-438f-a329-ad6a8ddb6154','','지오','CLUB_WRITE','krocd@kakao.com',6),
(33,'정민우님과 지오님의 교환일기','478ac0b5-9b0b-438f-a329-ad6a8ddb6154','','지오','CLUB_WRITE','krocd@kakao.com',3),
(34,'정민우님과 지오님의 교환일기','478ac0b5-9b0b-438f-a329-ad6a8ddb6154','','지오','CLUB_WRITE','krocd@kakao.com',6),
(35,'정민우님과 지오님의 교환일기','478ac0b5-9b0b-438f-a329-ad6a8ddb6154','','지오','CLUB_WRITE','krocd@kakao.com',3),
(36,'정민우님과 지오님의 교환일기','478ac0b5-9b0b-438f-a329-ad6a8ddb6154','','지오','CLUB_WRITE','krocd@kakao.com',3),
(37,'정민우님과 지오님의 교환일기','478ac0b5-9b0b-438f-a329-ad6a8ddb6154','','지오','CLUB_WRITE','krocd@kakao.com',6),
(38,'강아지 산책 일기장','cc224033-e622-432e-b8c5-b9e682042d5d','','Jake','CLUB_WRITE','raichu311@naver.com',5),
(39,'정민우님과 지오님의 교환일기','478ac0b5-9b0b-438f-a329-ad6a8ddb6154','','지오','CLUB_WRITE','krocd@kakao.com',6),
(40,'정민우님과 지오님의 교환일기','478ac0b5-9b0b-438f-a329-ad6a8ddb6154','','지오','CLUB_WRITE','krocd@kakao.com',3),
(41,'민우와 3번째 일기','e1b48fe2-1bf6-4a7a-a3fa-2d4af73ce355','\0','지오','CLUB_WRITE','krocd@kakao.com',4),
(42,'민우와 3번째 일기','e1b48fe2-1bf6-4a7a-a3fa-2d4af73ce355','','지오','CLUB_WRITE','krocd@kakao.com',3),
(43,NULL,NULL,'','지오','DOUBLE_INVITE','krocd@kakao.com',5),
(44,'민우와 함께하는 일기','dca02118-f5e0-4269-8593-1ed3b9589d7a','','지오','CLUB_WRITE','krocd@kakao.com',3),
(45,'민우와 3번째 일기','e1b48fe2-1bf6-4a7a-a3fa-2d4af73ce355','\0','지오','CLUB_WRITE','krocd@kakao.com',4),
(46,'민우와 3번째 일기','e1b48fe2-1bf6-4a7a-a3fa-2d4af73ce355','','지오','CLUB_WRITE','krocd@kakao.com',3),
(47,'민우와 함께하는 일기','dca02118-f5e0-4269-8593-1ed3b9589d7a','','지오','CLUB_WRITE','krocd@kakao.com',3),
(48,'민우와 함께하는 일기','dca02118-f5e0-4269-8593-1ed3b9589d7a','','지오','CLUB_WRITE','krocd@kakao.com',3),
(49,NULL,NULL,'','지오','DOUBLE_INVITE','krocd@kakao.com',6),
(50,'민우와 함께하는 일기','dca02118-f5e0-4269-8593-1ed3b9589d7a','','지오','CLUB_WRITE','krocd@kakao.com',3),
(51,'민우와 함께하는 일기','dca02118-f5e0-4269-8593-1ed3b9589d7a','','지오','CLUB_WRITE','krocd@kakao.com',3),
(52,'민우와 함께하는 일기','dca02118-f5e0-4269-8593-1ed3b9589d7a','','지오','CLUB_WRITE','krocd@kakao.com',3),
(53,'민우와 함께하는 일기','dca02118-f5e0-4269-8593-1ed3b9589d7a','','지오','CLUB_WRITE','krocd@kakao.com',3),
(54,'민우와 함께하는 일기','dca02118-f5e0-4269-8593-1ed3b9589d7a','','지오','CLUB_WRITE','krocd@kakao.com',3),
(55,'민우와 함께하는 일기','dca02118-f5e0-4269-8593-1ed3b9589d7a','','지오','CLUB_WRITE','krocd@kakao.com',3),
(56,'정민우님과 지오님의 교환일기','478ac0b5-9b0b-438f-a329-ad6a8ddb6154','','지오','CLUB_WRITE','krocd@kakao.com',6),
(57,'정민우님과 지오님의 교환일기','478ac0b5-9b0b-438f-a329-ad6a8ddb6154','','지오','CLUB_WRITE','krocd@kakao.com',3),
(58,'정민우님과 지오님의 교환일기','478ac0b5-9b0b-438f-a329-ad6a8ddb6154','','지오','CLUB_WRITE','krocd@kakao.com',3),
(59,'정민우님과 지오님의 교환일기','478ac0b5-9b0b-438f-a329-ad6a8ddb6154','','지오','CLUB_WRITE','krocd@kakao.com',6),
(60,'정민우님과 지오님의 교환일기','478ac0b5-9b0b-438f-a329-ad6a8ddb6154','','지오','CLUB_WRITE','krocd@kakao.com',3),
(61,'정민우님과 지오님의 교환일기','478ac0b5-9b0b-438f-a329-ad6a8ddb6154','','지오','CLUB_WRITE','krocd@kakao.com',6),
(62,NULL,NULL,'\0','Jake','DOUBLE_INVITE','raichu311@naver.com',2),
(63,'봉사활동 일지','ba65927c-607a-4058-a5b1-4a8ccdbadae3','','Jake','CLUB_WRITE','raichu311@naver.com',5),
(64,'정민우님과 지오님의 교환일기','478ac0b5-9b0b-438f-a329-ad6a8ddb6154','','지오','CLUB_WRITE','krocd@kakao.com',6),
(65,'정민우님과 지오님의 교환일기','478ac0b5-9b0b-438f-a329-ad6a8ddb6154','','지오','CLUB_WRITE','krocd@kakao.com',3),
(66,'민우와 함께하는 일기','dca02118-f5e0-4269-8593-1ed3b9589d7a','','지오','CLUB_WRITE','krocd@kakao.com',3),
(67,'정민우님과 지오님의 교환일기','478ac0b5-9b0b-438f-a329-ad6a8ddb6154','','지오','CLUB_WRITE','krocd@kakao.com',3),
(68,'정민우님과 지오님의 교환일기','478ac0b5-9b0b-438f-a329-ad6a8ddb6154','','지오','CLUB_WRITE','krocd@kakao.com',6),
(69,'정민우님과 지오님의 교환일기','478ac0b5-9b0b-438f-a329-ad6a8ddb6154','','지오','CLUB_WRITE','krocd@kakao.com',6),
(70,'정민우님과 지오님의 교환일기','478ac0b5-9b0b-438f-a329-ad6a8ddb6154','','지오','CLUB_WRITE','krocd@kakao.com',3),
(71,'정민우님과 지오님의 교환일기','478ac0b5-9b0b-438f-a329-ad6a8ddb6154','','지오','CLUB_WRITE','krocd@kakao.com',3),
(72,'정민우님과 지오님의 교환일기','478ac0b5-9b0b-438f-a329-ad6a8ddb6154','','지오','CLUB_WRITE','krocd@kakao.com',6),
(73,'정민우님과 지오님의 교환일기','478ac0b5-9b0b-438f-a329-ad6a8ddb6154','','지오','CLUB_WRITE','krocd@kakao.com',6),
(74,'정민우님과 지오님의 교환일기','478ac0b5-9b0b-438f-a329-ad6a8ddb6154','','지오','CLUB_WRITE','krocd@kakao.com',3),
(75,'정민우님과 지오님의 교환일기','478ac0b5-9b0b-438f-a329-ad6a8ddb6154','','지오','CLUB_WRITE','krocd@kakao.com',3),
(76,'정민우님과 지오님의 교환일기','478ac0b5-9b0b-438f-a329-ad6a8ddb6154','','지오','CLUB_WRITE','krocd@kakao.com',6),
(77,'정민우님과 지오님의 교환일기','478ac0b5-9b0b-438f-a329-ad6a8ddb6154','','지오','CLUB_WRITE','krocd@kakao.com',3),
(78,'정민우님과 지오님의 교환일기','478ac0b5-9b0b-438f-a329-ad6a8ddb6154','','지오','CLUB_WRITE','krocd@kakao.com',6),
(79,'개발꿈나무 일기','ce124868-ab88-4144-b1bb-27f9a55bfa54','','Jake','CLUB_WRITE','raichu311@naver.com',5),
(80,'개발꿈나무 일기','ce124868-ab88-4144-b1bb-27f9a55bfa54','','지오','CLUB_WRITE','krocd@kakao.com',5),
(81,'개발꿈나무 일기','ce124868-ab88-4144-b1bb-27f9a55bfa54','','지오','CLUB_WRITE','krocd@kakao.com',3),
(82,'개발꿈나무 일기','ce124868-ab88-4144-b1bb-27f9a55bfa54','','살자리버스','CLUB_WRITE','yeokyung502@naver.com',5),
(83,'개발꿈나무 일기','ce124868-ab88-4144-b1bb-27f9a55bfa54','','살자리버스','CLUB_WRITE','yeokyung502@naver.com',7),
(84,'개발꿈나무 일기','ce124868-ab88-4144-b1bb-27f9a55bfa54','\0','살자리버스','CLUB_WRITE','yeokyung502@naver.com',9),
(85,'개발꿈나무 일기','ce124868-ab88-4144-b1bb-27f9a55bfa54','','살자리버스','CLUB_WRITE','yeokyung502@naver.com',3),
(86,'개발꿈나무 일기','ce124868-ab88-4144-b1bb-27f9a55bfa54','\0','지오','CLUB_WRITE','krocd@kakao.com',9),
(87,'개발꿈나무 일기','ce124868-ab88-4144-b1bb-27f9a55bfa54','','지오','CLUB_WRITE','krocd@kakao.com',5),
(88,'개발꿈나무 일기','ce124868-ab88-4144-b1bb-27f9a55bfa54','\0','지오','CLUB_WRITE','krocd@kakao.com',7),
(89,'개발꿈나무 일기','ce124868-ab88-4144-b1bb-27f9a55bfa54','','지오','CLUB_WRITE','krocd@kakao.com',3),
(90,'개발꿈나무 일기','ce124868-ab88-4144-b1bb-27f9a55bfa54','\0','지오','CLUB_WRITE','krocd@kakao.com',9),
(91,'개발꿈나무 일기','ce124868-ab88-4144-b1bb-27f9a55bfa54','','지오','CLUB_WRITE','krocd@kakao.com',5),
(92,'개발꿈나무 일기','ce124868-ab88-4144-b1bb-27f9a55bfa54','','지오','CLUB_WRITE','krocd@kakao.com',3),
(93,'개발꿈나무 일기','ce124868-ab88-4144-b1bb-27f9a55bfa54','\0','지오','CLUB_WRITE','krocd@kakao.com',7),
(94,'정민우님과 지오님의 교환일기','478ac0b5-9b0b-438f-a329-ad6a8ddb6154','\0','지오','CLUB_WRITE','krocd@kakao.com',3),
(95,'정민우님과 지오님의 교환일기','478ac0b5-9b0b-438f-a329-ad6a8ddb6154','','지오','CLUB_WRITE','krocd@kakao.com',6),
(96,'개발꿈나무 일기','ce124868-ab88-4144-b1bb-27f9a55bfa54','','정민우','CLUB_WRITE','ats16@daum.net',5),
(97,'개발꿈나무 일기','ce124868-ab88-4144-b1bb-27f9a55bfa54','\0','정민우','CLUB_WRITE','ats16@daum.net',7),
(98,'개발꿈나무 일기','ce124868-ab88-4144-b1bb-27f9a55bfa54','\0','정민우','CLUB_WRITE','ats16@daum.net',3),
(99,'개발꿈나무 일기','ce124868-ab88-4144-b1bb-27f9a55bfa54','\0','정민우','CLUB_WRITE','ats16@daum.net',9),
(100,'개발꿈나무 일기','ce124868-ab88-4144-b1bb-27f9a55bfa54','\0','정민우','CLUB_WRITE','ats16@daum.net',6);
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reaction`
--

DROP TABLE IF EXISTS `reaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reaction` (
  `reaction_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL,
  `diary_id` bigint(20) DEFAULT NULL,
  `member_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`reaction_id`),
  KEY `FKsjadwf1rhb9r2lkbqaruuvnnj` (`diary_id`),
  KEY `FKf0kgc48u5e6wakvieex07kk5w` (`member_id`),
  CONSTRAINT `FKf0kgc48u5e6wakvieex07kk5w` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`),
  CONSTRAINT `FKsjadwf1rhb9r2lkbqaruuvnnj` FOREIGN KEY (`diary_id`) REFERENCES `diary` (`diary_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reaction`
--

LOCK TABLES `reaction` WRITE;
/*!40000 ALTER TABLE `reaction` DISABLE KEYS */;
INSERT INTO `reaction` VALUES
(1,'LIKED',8,3),
(12,'SURPRISED',42,5),
(14,'SAD',13,5),
(15,'LIKED',13,5),
(17,'LIKED',60,5),
(18,'ANGRY',60,5),
(21,'BEST',64,7),
(22,'BEST',8,6),
(24,'SURPRISED',76,5),
(25,'BEST',76,5),
(26,'ANGRY',64,5);
/*!40000 ALTER TABLE `reaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reply`
--

DROP TABLE IF EXISTS `reply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reply` (
  `reply_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `text` varchar(200) NOT NULL,
  `write_date` datetime DEFAULT NULL,
  `comment_id` bigint(20) DEFAULT NULL,
  `member_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`reply_id`),
  KEY `FK6w0ns67lrq1jdiwi5xvtj1vxx` (`comment_id`),
  KEY `FKen6vrmi5oth4bg6ybfc202fmu` (`member_id`),
  CONSTRAINT `FK6w0ns67lrq1jdiwi5xvtj1vxx` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`comment_id`),
  CONSTRAINT `FKen6vrmi5oth4bg6ybfc202fmu` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reply`
--

LOCK TABLES `reply` WRITE;
/*!40000 ALTER TABLE `reply` DISABLE KEYS */;
INSERT INTO `reply` VALUES
(3,'까르륵 스마트폰으으로도 작성이 되잖아','2023-05-19 02:36:56',8,5);
/*!40000 ALTER TABLE `reply` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sticker`
--

DROP TABLE IF EXISTS `sticker`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sticker` (
  `sticker_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `image_url` text DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  `price` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`sticker_id`),
  UNIQUE KEY `UK_85tgbfifff4xea39c5j8xe6yt` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sticker`
--

LOCK TABLES `sticker` WRITE;
/*!40000 ALTER TABLE `sticker` DISABLE KEYS */;
INSERT INTO `sticker` VALUES
(1,'https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Sticker/517d615e-3142-488b-845a-b0851c410f2e-awesome.png','정말 멋져',5),
(2,'https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Sticker/0455f92f-35b4-4171-86bb-34c765adf258-love.png','정말 사랑해 정말 최고야',5),
(3,'https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Sticker/fa786d9c-23bd-4e9c-87d6-510ad084d382-sosleepy.png','자두 자두 졸려',5),
(4,'https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Sticker/8f00664f-dc23-4b81-a3ab-d79427b89604-tiredprincess.png','공쥬 피곤해',5),
(5,'https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Sticker/c0f436df-d00c-4394-9eb5-4a7591f09356-whyamicrying.png','와 엠아 쿠라잉',5),
(6,'https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Sticker/edac6120-7393-4225-ac33-fda9a21d76a9-comeatme.png','다 덤벼',10),
(7,'https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Sticker/a3bfbebb-c3b5-4b50-9f93-c189077d099b-crazyform.png','폼 미쳤다',10),
(8,'https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Sticker/773166ba-85ab-48fd-a70b-a4921b8144d1-dontlivelikethat.png','그렇게 살지 마세요',10),
(9,'https://buddiary-bucket.s3.ap-northeast-2.amazonaws.com/Sticker/905a8e74-b3d9-4790-b260-d02d4567a8eb-wtf.png','엥 뭐래',10);
/*!40000 ALTER TABLE `sticker` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unused_sticker`
--

DROP TABLE IF EXISTS `unused_sticker`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `unused_sticker` (
  `unused_sticker_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `count` bigint(20) DEFAULT NULL,
  `member_id` bigint(20) DEFAULT NULL,
  `sticker_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`unused_sticker_id`),
  KEY `FKgrdo6agdgup07cmdqpobxn3se` (`member_id`),
  KEY `FK6tpv15qwkqccmxia27pxrr11b` (`sticker_id`),
  CONSTRAINT `FK6tpv15qwkqccmxia27pxrr11b` FOREIGN KEY (`sticker_id`) REFERENCES `sticker` (`sticker_id`),
  CONSTRAINT `FKgrdo6agdgup07cmdqpobxn3se` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unused_sticker`
--

LOCK TABLES `unused_sticker` WRITE;
/*!40000 ALTER TABLE `unused_sticker` DISABLE KEYS */;
INSERT INTO `unused_sticker` VALUES
(24,10,5,2),
(25,4,5,1),
(27,6,9,2),
(29,7,3,2),
(30,3,4,1),
(31,2,4,2),
(32,2,5,6),
(34,1,7,4),
(35,2,7,3),
(36,11,6,2),
(37,2,7,5),
(38,2,7,8),
(39,8,6,7),
(40,2,7,7),
(41,1,7,9),
(42,7,9,7),
(43,5,9,5);
/*!40000 ALTER TABLE `unused_sticker` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `used_sticker`
--

DROP TABLE IF EXISTS `used_sticker`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `used_sticker` (
  `used_sticker_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `x_coordinate` double DEFAULT NULL,
  `y_coordinate` double DEFAULT NULL,
  `diary_id` bigint(20) DEFAULT NULL,
  `sticker_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`used_sticker_id`),
  KEY `FKrmfemhcn8259xl2nbyqwk7jib` (`diary_id`),
  KEY `FK9fs3sys0pi3yy2m13cb0pma1v` (`sticker_id`),
  CONSTRAINT `FK9fs3sys0pi3yy2m13cb0pma1v` FOREIGN KEY (`sticker_id`) REFERENCES `sticker` (`sticker_id`),
  CONSTRAINT `FKrmfemhcn8259xl2nbyqwk7jib` FOREIGN KEY (`diary_id`) REFERENCES `diary` (`diary_id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `used_sticker`
--

LOCK TABLES `used_sticker` WRITE;
/*!40000 ALTER TABLE `used_sticker` DISABLE KEYS */;
INSERT INTO `used_sticker` VALUES
(15,537,619,60,9),
(16,388,592,60,4),
(17,881,512,64,7),
(21,580,494,67,7),
(22,387,489,73,2),
(23,504,534,70,1),
(24,608,728,64,4),
(25,631,602,64,1),
(26,683,668,60,1),
(27,315,389,60,1),
(28,1053,641,60,6),
(29,498,225,60,6),
(30,335,792,60,2),
(31,353,668,70,2),
(32,883,717,8,3),
(33,642,648,8,7),
(35,555,648,13,6),
(36,585,692,42,6),
(37,1040,768,60,1),
(38,972,640,64,9),
(39,534,705,8,2),
(40,649,674,76,7),
(41,649,674,77,7),
(42,460,677,76,2),
(44,934,672,76,3),
(45,917,819,76,7);
/*!40000 ALTER TABLE `used_sticker` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-19  3:16:17
