import React, { useRef } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Chatbot from 'react-chatbot-kit';
//import config from '../utility/chatbot/config';
import ActionProvider from '../utility/chatbot/ActionProvider';
import MessageParser from '../utility/chatbot/MessageParser';
import LinksBar from '../components/layouts/LinksBar';
import SectionsBar from '../components/layouts/SectionsBar';
import useWindowSize from '../hooks/useWindowSize';
import { Box } from '@mui/system';
import MobileHeader from '../components/layouts/MobileHeader';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ARRAY_NAMESPACES, ARRAY_LANGAGES, LANGAGE_FRENCH, LANGAGE_ENGLISH, _MY_PROFILE_, _PAGE_LINK_CHAT_BOT_, _PAGE_LINK_RESUME_, _WEBSITE_NAME_, _WEBSITE_ADDRESS_, _NAMESPACE_LANGAGE_HOME_ } from '@/_mocks_/_settings_items_';

import { createChatBotMessage } from 'react-chatbot-kit';
import Options from '../components/molecules/Options';
import ExperienceCards from '../components/organisms/ExperienceCards';
import ProjectCards from '../components/organisms/ProjectCards';
import SkillCards from '../components/organisms/SkillCards';
import BlogCards from '../components/organisms/BlogCards';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { useLangMode } from '../contexts/LangModeProvider';
import FrenchChatbot from '../components/chatbot/FrenchChatbot';
import EnglishChatbot from '../components/chatbot/EnglishChatbot';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, ButtonBase, Container, Drawer, Paper, Popover, Stack, Tooltip, useTheme, Grid } from '@mui/material';
import StyledBadge from '../components/atoms/StyledBadge';
import { grey } from '@mui/material/colors';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

import SelectLangageComponent from "../components/contexts/SelectLangageComponent"
import SwitchThemeComponent from '../components/contexts/SwitchThemeComponent';
import { CssBaseline } from '@mui/material';
import DesktopContent from '../components/layouts/DesktopContent';
import MobileLinksBar from '../components/layouts/MobileLinksBar';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import MobileSectionsBar from '../components/layouts/MobileSectionsBar';
import Link from 'next/link';
import { AndroidIcon, AndroidStudioIcon, CssIcon, HtmlIcon, JavascriptIcon, MaterialUiIcon, MomentJsIcon, NextJsIcon, NodeJsIcon, PhotoshopIcon, PwaIcon, ReactIcon, ResumeIcon, SpyderIcon, SwrIcon, VisualStudioIcon } from '@/components/icons/IconifiyIcons';
import { motion, AnimatePresence } from "framer-motion"
import { Fade, Bounce } from "react-awesome-reveal";
import { useDeviceMode } from '@/contexts/DeviceModeProvider';

export function WebAppBar() {
  const theme = useTheme();
  const avatarRef = useRef(null);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handlePopoverClose = () => {
    setPopoverOpen(false);
  };

  return (
    <Box sx={{}}>
      <AppBar position="static" elevation={0}>
        <Toolbar sx={{ background: 'var(--background)' }}>
          <Stack direction={'row'} justifyContent={'center'} spacing={1} alignItems={'center'} sx={{
            width: '100%',
            //background:'pink'
          }}>
            <SelectLangageComponent
            />
            <SwitchThemeComponent />
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export function MobileAppBar() {
  const theme = useTheme();
  const avatarRef = useRef(null);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const [linksBarOpen, setLinksBarOpen] = useState(false);
  const [sectionBarOpen, setSectionBarOpen] = useState(false);

  const handlePopoverClose = () => {
    setPopoverOpen(false);
  };

  return (
    <Box sx={{}}>
      <AppBar position="static">
        <Toolbar sx={{ background: theme.palette.background.paper }}>
          <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} sx={{
            width: '100%',
            //background:'pink'
          }}>
            <div>
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
                  <Avatar src="/me-no-back.png" sx={{ width: 40, height: 40, background: 'var(--primary)' }} />
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
            </div>
            <div>
              <Stack direction={'row'} spacing={1} justifyContent={'center'} alignItems={'center'} sx={{
                //background: 'red',
                //mx:'auto',
                //width: '100%'
              }}>
                <SelectLangageComponent
                />
                <SwitchThemeComponent />
              </Stack>
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

export default function TestPage() {
  const { width } = useWindowSize();
  const { t } = useTranslation();
  const theme = useTheme();
  const [lang] = useLangMode();

  const [currentImageProg, setCurrentImageProg] = useState(0);
  const [currentImageFramework, setCurrentImageFramework] = useState(0);
  const [currentImageSoftware, setCurrentImageSoftware] = useState(0);
const imgProg = [
  <JavascriptIcon size={60} />,
  <HtmlIcon size={60} />,
  <NodeJsIcon size={70} />,  
]

const imgFramework = [ 
  <ReactIcon size={60} />,
  <MaterialUiIcon size={60} />,
  <PwaIcon size={70} />,  
]

const imgSoftware = [
  <NextJsIcon size={60} />,
  <CssIcon size={60} />,
  <VisualStudioIcon size={60} />,
]


useEffect(() => {
    
  const interval = setInterval(() => {
    setCurrentImageProg((prevImage) => (prevImage + 1) % imgProg.length);
    setCurrentImageFramework((prevImage) => (prevImage + 1) % imgFramework.length);
    setCurrentImageSoftware((prevImage) => (prevImage + 1) % imgSoftware.length);
}, 3000);
return () => clearInterval(interval);

}, [])

  return (
    <div style={{ color: 'var(--text)' }}>

      <div className="appHeader" style={{ background: 'var(--background-menu)' }}>

        <SwitchThemeComponent />
        <div className="right"></div>
      </div>

      <div id="appCapsule" className="full-height">
      <div className="section inset mt-2">
            <div className="section-title">Inset</div>

            <div className="accordion" id="accordionExample2">
                <div className="accordion-item" style={{background:'red'}}>
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#accordion01">
                            About
                        </button>
                    </h2>
                    <div id="accordion01" className="accordion-collapse collapse" data-bs-parent="#accordionExample2">
                        <div className="accordion-body">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent at augue eleifend,
                            lacinia ex quis, condimentum erat. Nullam a ipsum lorem.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#accordion02">
                            Details
                        </button>
                    </h2>
                    <div id="accordion02" className="accordion-collapse collapse" data-bs-parent="#accordionExample2">
                        <div className="accordion-body">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent at augue eleifend,
                            lacinia ex quis, condimentum erat. Nullam a ipsum lorem.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#accordion03">
                            Comments
                        </button>
                    </h2>
                    <div id="accordion03" className="accordion-collapse collapse" data-bs-parent="#accordionExample2">
                        <div className="accordion-body">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent at augue eleifend,
                            lacinia ex quis, condimentum erat. Nullam a ipsum lorem.
                        </div>
                    </div>
                </div>
            </div>

        </div>








      <div className="section full mt-2">




     <Stack alignItems={'center'}>
     <Stack p={1} mt={3}direction={'row'} spacing={1} alignItems={'center'} justifyContent={'center'} sx={{
//background:'green',
//background:'cyan',
//width:'100%',
borderRadius: 10
}}>
<Stack justifyContent={'center'} alignItems={'center'} style={{
      position: 'relative',
      //background:'cyan',
      //top: 0,
      //left: 0,
      width: 80,
      height: 80,
      objectFit: 'cover',
      
    }}>
<AnimatePresence style={{
      position: 'relative',
      //background:'red',
      margin:'auto',
      objectFit: 'cover',
    }}>
<Grid container justifyContent={'center'} alignItems={'center'}>
{imgProg.map((image, index) => (
           <motion.div
           key={index}
    initial={{ opacity: 0 }}
    animate={{ opacity: index === currentImageProg ? 1 : 0 }}
    exit={{ opacity: 0 }}
    //transition={{ duration: 0.5 }}
    whileTap={{
      scale:index === currentImageProg ? 2 : 1,
    }}
    transition={{ duration: 1 }}
    style={{
      position: 'absolute',
      //background:'yellow',
      top:0,
      bottom:0,
      left:0,
      right:0,
      //textAlign:'center'
    }}
  >
    <Stack justifyContent={'center'} alignItems={'center'} sx={{
      width:'100%',
      height:'100%'
    }}>
    {image}
    </Stack>
  </motion.div>
         ))}
</Grid>
       </AnimatePresence>
</Stack>

<Stack justifyContent={'center'} alignItems={'center'} style={{
      position: 'relative',
      //background:'cyan',
      //top: 0,
      //left: 0,
      width: 80,
      height: 80,
      objectFit: 'cover',
    }}>
<AnimatePresence style={{
      position: 'relative',
      //background:'red',
      margin:'auto',
      objectFit: 'cover',
    }}>
<Grid container justifyContent={'center'} alignItems={'center'}>
{imgFramework.map((image, index) => (
           <motion.div
           key={index}
    initial={{ opacity: 0 }}
    animate={{ opacity: index === currentImageFramework ? 1 : 0 }}
    exit={{ opacity: 0 }}
    //transition={{ duration: 0.5 }}
    transition={{ duration: 1 }}
    whileTap={{
      scale: index === currentImageFramework ? 2 : 1,
    }}
    style={{
      position: 'absolute',
      //background:'yellow',
      top:0,
      bottom:0,
      left:0,
      right:0,
      //textAlign:'center'
    }}
  >
    <Stack justifyContent={'center'} alignItems={'center'} sx={{
      width:'100%',
      height:'100%'
    }}>
    {image}
    </Stack>
  </motion.div>
         ))}
</Grid>
       </AnimatePresence>
</Stack>

<Stack justifyContent={'center'} alignItems={'center'} style={{
      position: 'relative',
      //background:'cyan',
      //top: 0,
      //left: 0,
      width: 80,
      height: 80,
      objectFit: 'cover',
    }}>
<AnimatePresence style={{
      position: 'relative',
      //background:'red',
      margin:'auto',
      objectFit: 'cover',
    }}>
<Grid container justifyContent={'center'} alignItems={'center'}>
{imgSoftware.map((image, index) => (
           <motion.div
           key={'img-software-' + index}
    initial={{ opacity: 0 }}
    animate={{ opacity: index === currentImageSoftware ? 1 : 0 }}
    exit={{ opacity: 0 }}
    //transition={{ duration: 0.5 }}
    transition={{ duration: 1 }}
    whileTap={{
      scale: index === currentImageSoftware ? 2 : 1,
    }}
    style={{
      position: 'absolute',
      //background:'yellow',
      top:0,
      bottom:0,
      left:0,
      right:0,
      //textAlign:'center'
    }}
  >
    <Stack justifyContent={'center'} alignItems={'center'} sx={{
      width:'100%',
      height:'100%'
    }}>
    {image}
    </Stack>
  </motion.div>
         ))}
</Grid>
       </AnimatePresence>
</Stack>
</Stack>
     <Typography fontWeight={'bold'} pb={3}>{t('userPosition', {ns: _NAMESPACE_LANGAGE_HOME_})}</Typography>
      <Stack alignItems={'center'} spacing={1} mb={2}>
        <Bounce duration={3000}>
        <Paper 
        //elevation={theme.palette.mode === THEME_LIGHT ? 16 : 0} 
        sx={{
          p:1,
          //px:2,
          borderRadius:'50%',
          border:'3px solid var(--primary)',
          background:'transparent'
        }}>
        <Avatar src="/me-no-back.png" 
        sx={{ width: 150, height: 150, }}
         />
          </Paper>
        </Bounce>
        
        <SelectLangageComponent/>
        </Stack>

        <Stack my={5} p={1} alignItems={'center'}>
          <Link href={_PAGE_LINK_CHAT_BOT_} target={'_blank'}>
            <Button sx={{color:'var(--text)'}} startIcon={<ResumeIcon />} variant='contained'>{t('buttons.goChat',{ns:_NAMESPACE_LANGAGE_HOME_})}</Button>
          </Link>
          <Link href={_PAGE_LINK_RESUME_} target={'_blank'}>
            <Button sx={{color:'var(--text)'}}>{t('buttons.goCv',{ns:_NAMESPACE_LANGAGE_HOME_})}</Button>
          </Link>
          </Stack>
     </Stack>


        </div>




        <div className="appFooter" style={{ background: 'var(--background)' }}>
          <div className="footer-title" style={{ color: 'var(--accents9)' }}>
            <Stack style={{ fontSize: 12 }} spacing={0.3}>
              <div>
                {`Crée avec passion et dévouement, propulsé par NextJS `}<NextJsIcon size={15} />{`.`}
              </div>
              <div>
                {`Copyright©`}<span className="yearNow"></span>{` ${_WEBSITE_ADDRESS_}`}
              </div>
              <div>
                {`Tous droits réservés.`}
              </div>
            </Stack>
          </div>

          <div className="mt-2">
            <Tooltip sx={{
              zIndex: 1
            }} title={t('seeMyCV')} placement="top">
              <a href={`/${lang}${_PAGE_LINK_RESUME_}`} target='_blank' className="btn btn-icon btn-sm" style={{
                background: 'var(--primary)',
                color: 'var(--text)'
              }}>
                <ion-icon name="newspaper-outline"></ion-icon>
              </a>
            </Tooltip>

            <Tooltip sx={{
              zIndex: 1
            }} title={t('sendMeMail')} placement="top">
              <a href={`mailto:${_MY_PROFILE_.mail}`} className="btn btn-icon btn-sm" style={{
                background: 'var(--green-light-padelaxe)',
                color: 'black'
              }}>
                <ion-icon name="mail"></ion-icon>
              </a>
            </Tooltip>

            <Tooltip sx={{
              zIndex: 1
            }} title={t('profileLinkedin')} placement="top">
              <a href={_MY_PROFILE_.socials.linkedin} target='_blank' className="btn btn-icon btn-sm" style={{
                background: 'var(--blue-linkedin)',
                color: 'var(--text)'
              }}>
                <ion-icon name="logo-linkedin"></ion-icon>
              </a>
            </Tooltip>

            <Tooltip sx={{
              zIndex: 1
            }} title={t('profileGithub')} placement="top">
              <a href={_MY_PROFILE_.socials.github} target='_blank' className="btn btn-icon btn-sm" style={{
                background: 'var(--text)',
                color: 'var(--background)'
              }}>
                <ion-icon name="logo-github"></ion-icon>
              </a>
            </Tooltip>
          </div>
        </div>
      </div>

    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      //tabPrice: response,
      ...(await serverSideTranslations(locale, ARRAY_NAMESPACES, null, ARRAY_LANGAGES)),
      // Will be passed to the page component as props
    },
  }
}