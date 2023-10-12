import React, { useState, useRef } from 'react';
import { Box } from '@mui/system';
import { _MY_PROFILE_, _PAGE_LINK_RESUME_, GENERAL_FONT_FAMILY, } from '@/_mocks_/_settings_items_';
import { useTranslation } from 'next-i18next';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Avatar, Popover, Stack, useTheme } from '@mui/material';
import StyledBadge from '@/components/atoms/StyledBadge';
import { grey } from '@mui/material/colors';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import SelectLangageComponent from "@/components/contexts/SelectLangageComponent"
import SwitchThemeComponent from '@/components/contexts/SwitchThemeComponent';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { Fade } from 'react-awesome-reveal';


const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.primary.main,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.secondary,
  },
}));

export default function AppBarComponent({title}) {
    const {t} = useTranslation();
  const theme = useTheme();
  const avatarRef = useRef(null);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handlePopoverClose = () => {
    setPopoverOpen(false);
  };

  return (
 <Box sx={{}}>
     <AppBar position="static">
    <Toolbar sx={{background:theme.palette.background.menu}}>
     <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} sx={{
      width:'100%', 
     //background:'pink'
     }}>
      <div>
      <BootstrapTooltip theme={theme} describeChild open={true} 
      title={<Fade cascade damping={0.2} style={{fontFamily:GENERAL_FONT_FAMILY, fontWeight:'bold', fontSize:14, color:'var(--text-secondary)'}}>{title}</Fade>} 
      placement="right"
      sx={{
        position:'relative',
        zIndex:1
      }}
      >
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        //sx={{ mr: 2 }}
        onClick={() => setPopoverOpen(!popoverOpen)}
    ref={avatarRef}
      >
                <StyledBadge
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      variant="dot"
    >
      <Avatar src="/me-no-back.png" sx={{ width: 40, height: 40, background:'var(--primary)' }} />
    </StyledBadge>
      </IconButton>
      </BootstrapTooltip>

      <Popover
    open={popoverOpen}
    onClose={handlePopoverClose}
    anchorEl={avatarRef.current}
    sx={{
        //position:'relative',
        zIndex:1000
    }}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    PaperProps={{
      sx: {
        border: 1,
        borderColor: grey[200],
        padding: 2,
        marginLeft: 2,
        borderRadius: '5%',
        zIndex:1000
      },
    }}
    elevation={0}
  >
    <Box flex flexDirection="column">
      <Typography variant="h6">{_MY_PROFILE_.name}</Typography>
      <Box
        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
        <EmailIcon />
        <Typography
          variant="span"
          sx={{ marginLeft: '8px', marginTop: '5px' }}
        >
          {_MY_PROFILE_.mail}
        </Typography>
      </Box>
      <Box
        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
        <PhoneIcon />
        <Typography
          variant="span"
          sx={{ marginLeft: '8px', marginTop: '5px' }}
        >
          {_MY_PROFILE_.phone}
        </Typography>
      </Box>
      <a
        href={_PAGE_LINK_RESUME_}
        target="_blank"
        rel="noreferrer"
        style={{display:'none'}}
      >
        <Button>{`See my resume`}</Button>
      </a>
      <a
        href=""
        //target="_blank"
        rel="noreferrer"
        style={{display:'none'}}
      >
        <Button variant='contained'>{`Chat with me`}</Button>
      </a>
    </Box>
  </Popover>
      </div>
      <div>
      <Stack direction={'row'} spacing={1} justifyContent={'center'} alignItems={'center'} sx={{
    //background: 'red',
    //mx:'auto',
    //width: '100%'
  }}>
    <SelectLangageComponent/>
    <SwitchThemeComponent />
  </Stack>
      </div>
     </Stack>
    </Toolbar>
  </AppBar>
 </Box>
  );
}