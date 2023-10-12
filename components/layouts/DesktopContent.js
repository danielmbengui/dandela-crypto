import React, { useState } from 'react';
import { Box } from '@mui/system';
import StyledBadge from '../atoms/StyledBadge';
import { Avatar, ButtonBase, Drawer, IconButton, Stack } from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import MobileLinksBar from './MobileLinksBar';
import MobileSectionsBar from './MobileSectionsBar';
import styles from '../../styles/Home.module.css';
import LinksBar from './LinksBar';

export default function DesktopContent() {
  const [linksBarOpen, setLinksBarOpen] = useState(false);
  const [sectionBarOpen, setSectionBarOpen] = useState(false);

  return (
    <Box
      sx={{
        display: 'flex',
        paddingLeft: '12px',
        paddingRight: '20px',
        paddingY: '5px',
        justifyContent: 'space-between',
      }}
    >
        <Stack direction={'row'} justifyContent={'space-between'}>
    <div className={styles.links}>
        <LinksBar />
      </div>
      </Stack>
      <Box
        component={ButtonBase}
        onClick={() => setLinksBarOpen(!linksBarOpen)}
      >






        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
        >
          <Avatar src="/me.jpg" sx={{ width: '50px', height: '50px' }} />
        </StyledBadge>
      </Box>

      <Box
        component={IconButton}
        onClick={() => setSectionBarOpen(!sectionBarOpen)}
      >
        <MenuRoundedIcon />
      </Box>

      <Drawer
        anchor="left"
        open={linksBarOpen}
        onClose={() => setLinksBarOpen(false)}
        PaperProps={{ sx: { padding: '20px', width: 'fit-content' } }}
      >
        <MobileLinksBar />
      </Drawer>

      <Drawer
        anchor="right"
        open={sectionBarOpen}
        onClose={() => setSectionBarOpen(false)}
        PaperProps={{
          sx: {
            paddingLeft: '5px',
            paddingRight: '20px',
            paddingY: '10px',
            width: 'fit-content',
          },
        }}
      >
        <MobileSectionsBar />
      </Drawer>
    </Box>
  );
}