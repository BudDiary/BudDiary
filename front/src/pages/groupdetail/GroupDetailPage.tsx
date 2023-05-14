import React, { useState, useEffect } from "react";
import {
  PageContainer,
  DetailSubNavContainer,
} from "../../components/common/Page.styles";
import {
  DetailPageContainer,
  DiariesContainer,
  GroupInfoContainer,
} from "./GroupDetailPage.styles";
import GroupInfo from "../../components/groupdetail/GroupInfo";
import GroupInfoModal from "../../components/groupdetail/GroupInfoModal";
import Diaries from "../../components/groupdetail/Diaries";
import { getClubDetailApi } from "../../apis/clubApi";
import { Club } from "../../types/group";
import { GroupButton } from "../../components/groupdetail/Diaries.styles";

const GroupDetailPage = () => {
  const [scrollY, setScrollY] = useState(100);
  const [clubData, setClubData] = useState<Club | null>(null);

  // 그룹정보 모달
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const clubId = "5db3c604-0c38-41e7-aa57-8174085f9b95";

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getClubDetailApi(clubId);
        setClubData(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  });

  useEffect(() => {
    const handleScroll = () => {
      const newY = Math.max(window.scrollY, 120);
      setScrollY(newY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const subNavStyle = {
    backgroundImage: `url(${clubData?.clubDetail.clubInfo.thumbnailUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "black",
    fontWeight: "bold",
  };

  return (
    <>
      {clubData?.clubDetail.clubInfo.clubName && (
        <DetailSubNavContainer style={subNavStyle}>
          {clubData?.clubDetail.clubInfo.clubName}
        </DetailSubNavContainer>
      )}
      <PageContainer>
        <DetailPageContainer>
          <DiariesContainer>
            <Diaries diaryList={clubData?.clubDetail.diaryList} />
          </DiariesContainer>
          {window.innerWidth > 640 ? (
            <GroupInfoContainer style={{ position: "relative" }}>
              <GroupInfo
                clubInfo={clubData?.clubDetail.clubInfo}
                memberList={clubData?.clubDetail.memberList}
                style={{ position: "absolute", top: `${scrollY - 100}px` }}
              />
            </GroupInfoContainer>
          ) : (
            <GroupButton onClick={() => setShowModal(true)}>Group</GroupButton>
          )}
        </DetailPageContainer>
      </PageContainer>
      {showModal && (
        <GroupInfoModal
          clubInfo={clubData?.clubDetail.clubInfo}
          memberList={clubData?.clubDetail.memberList}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
export default GroupDetailPage;
