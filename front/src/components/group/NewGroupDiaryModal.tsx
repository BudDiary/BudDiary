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
import Paper from '@mui/material/Paper';

import { GiCancel } from "react-icons/gi"
import { CloseModalButton, ModalTitle, ModalTopNavContainer, SaveModalButton } from '../common/Modal.styles';
import AddGroupPicture from './AddGroupPicture';
import GroupPicture from './GroupPicture';


interface Props {
  closeModal: any;
}


export default function NewGroupDiaryModal({ closeModal }: Props) {
  const [originFiles, setOriginFiles] = useState<File[]>([]);

  const closeDiaryModal = () => {
    closeModal();
  };
  const [value, setValue] = useState('');

  const handleClear = () => {
    setValue('');
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
          <CloseModalButton onClick={closeDiaryModal}><BiArrowBack /></CloseModalButton>
          <ModalTitle>새 교환일기</ModalTitle>

          <ModalClose
            variant="outlined"
            sx={{
              top: 'calc(-1/4 * var(--IconButton-size))',
              right: 'calc(-1/4 * var(--IconButton-size))',
              boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
              borderRadius: '50%',
              bgcolor: 'background.body',
            }}
          />
          <SaveModalButton>완료</SaveModalButton>
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
          <Box marginLeft={3}>
            
          <TextField
      value={value}
      onChange={(e:any) => setValue(e.target.value)}
      InputProps={{
        endAdornment: value && (
          <IconButton onClick={handleClear}>
            <GiCancel color="lightcoral" size={20}/>
          </IconButton>
        ),
      }}
      label="그룹일기"
      variant="outlined"
      />
      </Box>
      <Box m={2}>
      <Paper elevation={3}>
        <AddGroupPicture
          originFiles={originFiles}
          setOriginFiles={setOriginFiles}/>
        <GroupPicture
          originFiles={originFiles}
          setOriginFiles={setOriginFiles}/>
      </Paper>

    </Box>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}