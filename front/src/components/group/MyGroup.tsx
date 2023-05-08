import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { MdLibraryAdd } from 'react-icons/md'
import NewGroupDiaryModal from './NewGroupDiaryModal'
import Modal from '../common/Modal';
const data = [
  {
    title: 'Paper 1',
    description: 'This is the description for Paper 1.',
    image: '/path/to/image1.jpg'
  },
  {
    title: 'Paper 2',
    description: 'This is the description for Paper 2.',
    image: '/path/to/image2.jpg'
  },
  {
    title: 'Paper 3',
    description: 'This is the description for Paper 3.',
    image: '/path/to/image3.jpg'
  },
  {
    title: 'Paper 4',
    description: 'This is the description for Paper 3.',
    image: '/path/to/image3.jpg'
  },
  {
    title: 'Paper 5',
    description: 'This is the description for Paper 3.',
    image: '/path/to/image3.jpg'
  }
];


export default function MyGroup() {
  const [modalOpen, setModalOpen] = useState(false);
  const createNewDiary = () => {
    setModalOpen(true)
  }
  return (<>
  
    {modalOpen && <Modal page={1} setModalOpen={setModalOpen}/>}
  
    {/* {NewDiaryModal === false ? null : <NewGroupDiaryModal setNewDiaryModal={setNewDiaryModal}/>} */}
    <span className="flex h-80">
    <Paper elevation={3} sx={{ p: 3, width: '30%', height: '80%', mr: '10%'}}>
    <Typography variant="h5" component="div" sx={{ mb: 3 }}>
              새 일기 추가하기
            </Typography>
            <button onClick={createNewDiary}>
            <MdLibraryAdd color="blue" size={32}/>
            </button>
            {/* <img
              src=''
              alt= '대체'
              style={{ width: '100%', marginBottom: '10%' }}
            /> */}
    </Paper>
    <Swiper spaceBetween={50} slidesPerView={3}>
      {data.map((item, index) => (
        <SwiperSlide key={index}>
          <Paper elevation={3} sx={{ p: 2}}>
            <Typography variant="h5" component="div" sx={{ mb: 1 }}>
              {item.title}
            </Typography>
            <img
              src={item.image}
              alt={item.title}
              style={{ width: '100%', marginBottom: '50%' }}
              />
            <Typography component="div">{item.description}</Typography>
          </Paper>
        </SwiperSlide>
      ))}
    </Swiper>
    </span>
      </>
  )
}
