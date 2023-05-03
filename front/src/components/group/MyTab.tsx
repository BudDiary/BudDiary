import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import MyGroup from './MyGroup';

import 'swiper/swiper-bundle.css';
import { width } from '@mui/system';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}


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


function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Typography component="div" >{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function MyTab() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"  sx={{
    '& .MuiTabs-indicator': {
      backgroundColor: '',
    },
    '& .MuiTab-root': {
      backgroundColor: 'white',
      color: 'black',
    },
  }}>
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        2:2
      </TabPanel>
      <TabPanel value={value} index={1}>
        1:1
      </TabPanel>
    </Box>
  );
}