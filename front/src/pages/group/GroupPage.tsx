import React, { useEffect, useState } from "react";
import { PageContainer, SubNavContainer } from "../../components/common/Page.styles";
import Recommended from "../../components/group/Recommended";
import MyTab from "../../components/group/MyTab";
import { getMyClubListApi } from "../../apis/clubApi";
import useMember from "../../hooks/memberHook";

export default function GroupPage() {
  const {memberData} = useMember();
  const username = memberData.username
  const [pluralList, setPluralList] = useState<string[]>([]);
  const [doubleList, setDoubleList] = useState<string[]>([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getMyClubListApi(username)
        setPluralList(data.pluralList)
        setDoubleList(data.doubleList)
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [username]);

  return (
    <>
    <SubNavContainer>나의 그룹</SubNavContainer>
    <PageContainer>
      <Recommended doubleList={doubleList}/>
      <br />
      <MyTab/>
    </PageContainer>
    </>
  );
}
	
