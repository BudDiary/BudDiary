import React, { useState, useEffect } from "react";
import {
  PageContainer,
  SubNavContainer,
} from "../../components/common/Page.styles";
import {
  DetailPageContainer,
  DiariesContainer,
  GroupInfoContainer,
} from "./GroupDetailPage.styles";
import GroupInfo from "../../components/groupdetail/GroupInfo";
import Diaries from "../../components/groupdetail/Diaries";
import groupData from "../../components/groupdetail/groupInfo.json";

const GroupDetailPage = () => {
  const [scrollY, setScrollY] = useState(0);

  const subNavStyle = {
    background: `url(${groupData?.thumbnailUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "black",
    fontWeight: "bold",
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      {groupData && (
        <SubNavContainer style={subNavStyle}>
          {groupData.clubName}
        </SubNavContainer>
      )}
      <PageContainer>
        <DetailPageContainer>
          <DiariesContainer>
            <Diaries />
          </DiariesContainer>
          <GroupInfoContainer style={{ position: "relative" }}>
           < div></div>
            <GroupInfo
              style={{ position: "absolute", top: `${scrollY - 20}px` }}
            />
          </GroupInfoContainer>
        </DetailPageContainer>
      </PageContainer>
    </>
  );
};

export default GroupDetailPage;
