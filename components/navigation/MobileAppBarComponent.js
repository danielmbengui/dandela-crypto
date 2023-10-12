import React, { useRef } from 'react';
import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import Chatbot from 'react-chatbot-kit';
//import config from '../utility/chatbot/config';
import ActionProvider from '@/utility/chatbot/ActionProvider';
import MessageParser from '@/utility/chatbot/MessageParser';
import LinksBar from '@/components/layouts/LinksBar';
import SectionsBar from '@/components/layouts/SectionsBar';
import useWindowSize from '@/hooks/useWindowSize';
import { Box } from '@mui/system';
import MobileHeader from '@/components/layouts/MobileHeader';
import { ARRAY_NAMESPACES, ARRAY_LANGAGES, LANGAGE_FRENCH, LANGAGE_ENGLISH, _MY_PROFILE_, _PAGE_LINK_RESUME_, GENERAL_FONT_FAMILY, _WEBSITE_ADDRESS_, _NEXTJS_LINK_ } from '@/_mocks_/_settings_items_';

import { createChatBotMessage } from 'react-chatbot-kit';
import Options from '@/components/molecules/Options';
import ExperienceCards from '@/components/organisms/ExperienceCards';
import ProjectCards from '@/components/organisms/ProjectCards';
import SkillCards from '@/components/organisms/SkillCards';
import BlogCards from '@/components/organisms/BlogCards';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { useLangMode } from '@/contexts/LangModeProvider';
import FrenchChatbot from '@/components/chatbot/FrenchChatbot';
import EnglishChatbot from '@/components/chatbot/EnglishChatbot';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, ButtonBase, Container, Drawer, Paper, Popover, Stack, useTheme } from '@mui/material';
import StyledBadge from '@/components/atoms/StyledBadge';
import { grey } from '@mui/material/colors';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

import SelectLangageComponent from "@/components/contexts/SelectLangageComponent"
import SwitchThemeComponent from '@/components/contexts/SwitchThemeComponent';
import { CssBaseline } from '@mui/material';
import DesktopContent from '@/components/layouts/DesktopContent';
import MobileLinksBar from '@/components/layouts/MobileLinksBar';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import MobileSectionsBar from '@/components/layouts/MobileSectionsBar';

import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { Fade } from 'react-awesome-reveal';
import SkillsComponent from '@/components/skills/SkillsComponent';

import stylesCarousel from "@/styles/Carousel.module.css"
import CardSocial from '@/components/CardSocial';
import { NextJsIcon } from '@/components/icons/IconifiyIcons';
import AppBarComponent from '@/components/navigation/AppBarComponent';



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


export default function MobileAppBarComponent({title}) {
  const theme = useTheme();
  const avatarRef = useRef(null);
  const [popoverOpen, setPopoverOpen] = useState(false);
const {t} = useTranslation();
  const [linksBarOpen, setLinksBarOpen] = useState(false);
  const [sectionBarOpen, setSectionBarOpen] = useState(false);

  const handlePopoverClose = () => {
    setPopoverOpen(false);
  };

  return (
 <Box sx={{}}>
     <AppBar position="static">
    <Toolbar sx={{background:theme.palette.background.paper}}>
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
        //onClick={() => setPopoverOpen(!popoverOpen)}
        onClick={() => setLinksBarOpen(!linksBarOpen)}
    ref={avatarRef}
      >
                <StyledBadge
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      variant="dot"
    >
      <Avatar src="/me-no-back.png" sx={{ width: 40, height: 40, background:'var(--primary)' }} />
    </StyledBadge>
    <Drawer
        anchor="left"
        open={linksBarOpen}
        onClose={() => setLinksBarOpen(false)}
        PaperProps={{ sx: { padding: '20px', width: 'fit-content' } }}
      >
        <MobileLinksBar />
      </Drawer>
      </IconButton>
      </BootstrapTooltip>

      </div>
      <div>

      </div>
      <div>
      <Box
        component={IconButton}
        onClick={() => setSectionBarOpen(!sectionBarOpen)}
      >
        <MenuRoundedIcon />
      </Box>
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
      </div>
     </Stack>
    </Toolbar>
  </AppBar>
 </Box>
  );
}