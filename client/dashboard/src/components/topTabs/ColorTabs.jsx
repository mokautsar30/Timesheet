import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Activity from '../topSection/Activity'
import UserSetting from '../topSection/UserSetting';

const ColorTabs = () => {
  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab value="one" label="Daftar Kegiatan" />
        <Tab value="two" label="Pengaturan" />
      </Tabs>
      {value === 'one' && <Activity />}
      {value === 'two' && <UserSetting />}
    </Box>
  );
}


export default ColorTabs