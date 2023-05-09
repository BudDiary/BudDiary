import React, { useState, useEffect } from 'react'
import Button from '@mui/joy/Button';
import {BiArrowBack} from 'react-icons/bi'
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import { Box } from '@mui/material';
import { StyledBox } from '../group/NewGroupDiaryModal.styles'
import Paper from '@mui/material/Paper';

import { GiCancel } from "react-icons/gi"
import { CloseModalButton, ModalTitle, ModalTopNavContainer, SaveModalButton } from '../common/ModalWindow.styles';
import AddGroupPicture from './AddGroupPicture';
import GroupPicture from './GroupPicture';
import ModalWindow from '../common/ModalWindow';
import { postPluralClubApi } from '../../apis/clubApi';
import useMember from '../../hooks/memberHook';


interface Props {
  closeModal: any;
}


export default function NewGroupDiaryModal({ closeModal }: Props) {
  const {memberData, isLoggedIn} = useMember();
  const username = memberData.username
  const [image, setImage] = useState<string | null>(null);
  
  const closeDiaryModal = () => {
    closeModal();
  };
  const [clubName, setClubName] = useState('');

  const handleClear = () => {
    setClubName('');
  }

  const submitMakeClub = async (event: any) => {
    

    /** 서버통신 */
    const formData = new FormData();

    if (image && clubName && username) {
      formData.append("thumbnail", image);
      formData.append('captainUsername', username);
      formData.append('clubName', clubName);
      // 폼 객체 key 와 value 값을 순회.
      let entries = formData.entries();
      for (const pair of entries) {
          console.log(pair[0]+ ', ' + pair[1]); 
      }
      // const response  = await makeClubApi(formData)
      // if (response === true) {
      //   console.log('여기에서 설문 띄워주시면 됩니다~~~')
      // } else {
      //   console.log('실패여')
      // }
    }
  };


  function ChildModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    const handleClose2 = () => {
      handleClose();
      closeDiaryModal(); // close parent modal
    };


    return (
      <React.Fragment>
        <Button onClick={(event) => {
          event.preventDefault();
          handleOpen()
          submitMakeClub(event)
          }}> 다음 </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
                  <Sheet
          variant="outlined"
          sx={{
            minHeight: 300,
            minWidth: 500,
            maxWidth: 500,
            borderRadius: 'md',
            // p: 5,
            boxShadow: 'lg',
          }}

          >
          <ModalTopNavContainer>
          <CloseModalButton onClick={handleClose}>
            <BiArrowBack />
            </CloseModalButton>
          <ModalTitle>초대 신청</ModalTitle>
            <Button onClick={handleClose2}>완료</Button>
          </ModalTopNavContainer>
          <Box>
            <h2 id="child-modal-title">초대</h2>
            <p id="child-modal-description">초대링크 들어갈 부분</p>
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
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant="outlined"
          sx={{
            minHeight: 300,
            minWidth: 500,
            maxWidth: 500,
            borderRadius: 'md',
            // p: 5,
            boxShadow: 'lg',
          }}
          >
          <ModalTopNavContainer>
          <CloseModalButton onClick={closeDiaryModal}>
            <BiArrowBack />
            </CloseModalButton>
          <ModalTitle>새 교환일기</ModalTitle>

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
          <ChildModal/>
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
          <StyledBox marginLeft={3}>
          
          <TextField
      value={clubName}
      onChange={(e:any) => setClubName(e.target.value)}
      InputProps={{
        endAdornment: clubName && (
          <IconButton onClick={handleClear}>
            <GiCancel color="lightcoral" size={20}/>
          </IconButton>
        ),
      }}
      label="그룹일기"
      variant="outlined"
      />
      </StyledBox>
      <Box m={2}>
      <Paper elevation={6}>
      <AddGroupPicture setImage={setImage} />
    <br />
      <GroupPicture image={image} />
      </Paper>

    </Box>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}