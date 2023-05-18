import React, { useState, useEffect } from "react";
import Button from "@mui/joy/Button";
import { BiArrowBack } from "react-icons/bi";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { Box } from "@mui/material";
import { StyledBox } from "../group/NewGroupDiaryModal.styles";
import Paper from "@mui/material/Paper";

import { GiCancel } from "react-icons/gi";
import {
  CloseModalButton,
  ModalTitle,
  ModalTopNavContainer,
  SaveModalButton,
} from "../common/ModalWindow.styles";
import AddGroupPicture from "./AddGroupPicture";
import GroupPicture from "./GroupPicture";
import ModalWindow from "../common/ModalWindow";
import { postPluralClubApi, getClubDetailApi } from "../../apis/clubApi";
import useMember from "../../hooks/memberHook";
import { KakaoInvitation } from "../kakaoinvitation/kakaoInvitation";
import { Club } from "../../types/group";
import { useNavigate } from "react-router-dom";
interface Props {
  closeModal: any;
}

interface FormData {
  clubname: string;
  thumbnail: File | null;
  captainUsername: string;
}

export default function NewGroupDiaryModal({ closeModal }: Props) {
  
  const navigate = useNavigate();


  const handleGroupClick = (clubUuid: string) => {
    navigate(`/group/${clubUuid}`);
  };

  const { memberData } = useMember();
  const [open, setOpen] = React.useState(false);
  const [initial, setInitial] = useState(true);
  const username = memberData.username;
  const [image, setImage] = useState<File | null>(null);

  const [formData, setFormData] = useState<FormData>({
    clubname: "",
    thumbnail: null,
    captainUsername: "",
  });
  const [newGroupData, setNewGroupData] = useState<{ uuid: string } | null>(
    null
  );
  const [clubData, setClubData] = useState<Club | null>(null);
  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];
    setFormData({
      ...formData,
      thumbnail: file,
    });
  };

  const closeDiaryModal = () => {
    closeModal();
  };
  const [clubName, setClubName] = useState("");

  const handleClear = () => {
    setClubName("");
  };

  const submitMakeClub = async (event: any) => {
    /** 서버통신 */
    const formData = new FormData();

    if (initial && image && clubName && username) {
      formData.append("thumbnail", image);
      formData.append("captainUsername", username);
      formData.append("clubName", clubName);
      // postPluralClubApi({ clubName: clubName, captainUsername: username, image: image })
      postPluralClubApi(formData)
        .then((result) => {
          if (!result.error) {
            // newgroupdata가 빈 값이 아닐 때 가져다가 쓰도록, 필요하면 useeffect도 활용해서 쓰시면 될 거 같아요.
            setInitial(false);
            setNewGroupData(result);
            setOpen(true);

            console.log(result, "this is group info");
          } else {
            console.error(result.error); // Optionally, log the error
          }
        })
        .catch((error) => {
          console.error(error); // Log any unhandled promise rejections
        });
      // 폼 객체 key 와 value 값을 순회.
      // let entries = formData.entries();
      // for (const pair of entries) {
      //   console.log(pair[0] + ", " + pair[1]);
      // }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (newGroupData) {
          const data = await getClubDetailApi(newGroupData.uuid);
          setClubData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [newGroupData]);

  function ChildModal() {
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    const handleClose2 = () => {
      // handleClose();
      // closeDiaryModal(); // close parent modal
      if (newGroupData) {
       console.log(newGroupData, 'this is newgroupdata')
       handleGroupClick(newGroupData.uuid)
      }

    };

    return (
      <React.Fragment>
        <Button
          onClick={(event) => {
            event.preventDefault();
            submitMakeClub(event);
            handleOpen();
          }}
        >
          다음
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Sheet
            variant="outlined"
            sx={{
              minHeight: "60%",
              minWidth: 500,
              maxWidth: 500,
              borderRadius: "md",
              // p: 5,
              boxShadow: "lg",
            }}
          >
            <ModalTopNavContainer>
              <CloseModalButton onClick={handleClose}>
                <BiArrowBack />
              </CloseModalButton>
              <ModalTitle>초대 신청</ModalTitle>
              <Button onClick={handleClose2}>완료</Button>
            </ModalTopNavContainer>
            <Box
              sx={{
                padding: "5px",
                paddingTop: "10px",
              }}
            >
              <KakaoInvitation clubInfo={clubData?.clubDetail.clubInfo} />
            </Box>
          </Sheet>
        </Modal>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={true}
        onClose={() => closeDiaryModal()}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            minHeight: 300,
            minWidth: 360,
            maxWidth: 500,
            borderRadius: "md",
            // p: 5,
            boxShadow: "lg",
          }}
        >
          <ModalTopNavContainer>
            <CloseModalButton onClick={closeDiaryModal}>
              <BiArrowBack />
            </CloseModalButton>
            <ModalTitle>새로운 교환일기 만들기</ModalTitle>

            {/* <ModalClose
            variant="outlined"
            sx={{
              top: 'calc(-1/4 * var(--IconButton-size))',
              right: 'calc(-1/4 * var(--IconButton-size))',
              boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
              borderRadius: '50%',
              bgcolor: 'background.body',
            }}
          /> */}
            <ChildModal />
            {/* <SaveModalButton onClick={createInvite} >다음</SaveModalButton> */}
          </ModalTopNavContainer>
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mt={2}
            ml={3}
            mb={2}
          >
            방 이름
          </Typography>
          <StyledBox>
            <TextField
              className="w-full"
              value={clubName}
              onChange={(e: any) => setClubName(e.target.value)}
              InputProps={{
                endAdornment: clubName && (
                  <IconButton onClick={handleClear}>
                    <GiCancel color="lightcoral" size={20} />
                  </IconButton>
                ),
              }}
              label="그룹일기"
              variant="outlined"
            />
          </StyledBox>
          <Box m={2}>
            <Paper elevation={6}>
              <GroupPicture image={image} />
              <AddGroupPicture setImage={setImage} />
            </Paper>
          </Box>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}
