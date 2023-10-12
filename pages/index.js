import React, { useRef } from 'react';
import Head from 'next/head';
import useWindowSize from '../hooks/useWindowSize';
import { Box } from '@mui/system';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ARRAY_NAMESPACES, ARRAY_LANGAGES, _MY_PROFILE_, _PAGE_LINK_CHAT_BOT_, _PAGE_LINK_RESUME_, _NAMESPACE_LANGAGE_HOME_, _WEBSITE_ADDRESS_, _NEXTJS_LINK_ } from '@/_mocks_/_settings_items_';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { useLangMode } from '../contexts/LangModeProvider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Avatar, Drawer, Grid, Paper, Stack, Tooltip, useTheme } from '@mui/material';
import StyledBadge from '../components/atoms/StyledBadge';
import SelectLangageComponent from "../components/contexts/SelectLangageComponent"
import SwitchThemeComponent from '../components/contexts/SwitchThemeComponent';
import { CssBaseline } from '@mui/material';
import MobileLinksBar from '../components/layouts/MobileLinksBar';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import MobileSectionsBar from '../components/layouts/MobileSectionsBar';
import Link from 'next/link';
import { ResumeIcon } from '@/components/icons/IconMaterialUi';
import {PlayStoreIcon, AndroidIcon,XCodeIcon,FlutterIcon, CssIcon, HtmlIcon, JavascriptIcon, MaterialUiIcon, NextJsIcon, NodeJsIcon, PwaIcon, ReactIcon, VisualStudioIcon } from '@/components/icons/IconifiyIcons';
import { motion, AnimatePresence } from "framer-motion"
import { Bounce } from "react-awesome-reveal";
import { useDeviceMode } from '@/contexts/DeviceModeProvider';


export function WebAppBar() {
  const theme = useTheme();
  const avatarRef = useRef(null);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handlePopoverClose = () => {
    setPopoverOpen(false);
  };

  return (
    <Box sx={{ background: 'transparent' }}>
      <AppBar position="fixed" sx={{ background: 'var(--background-menu)' }}>
        <Toolbar
          sx={{ background: 'transparent' }}
        >
          <Stack direction={'row'} justifyContent={'center'} spacing={1} alignItems={'center'} sx={{
            width: '100%',
            //background:'pink'
          }}>
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

const getMoodOptions = (actionProvider) => {
  return [
    {
      text: 'Doing great! Tell me about yourself',
      handler: () => actionProvider.handleGoodMood(),
      id: 1,
    },
    {
      text: 'Having a bad day...',
      handler: () => actionProvider.handleBadMood(),
      id: 2,
    },
  ];
};

const getJokeOptions = (actionProvider) => {
  return [
    {
      text: "LOL that's funny",
      handler: () => actionProvider.handleGoodMoodFinally(),
      id: 1,
    },
    {
      text: 'Tell me another one',
      handler: () => actionProvider.handleBadMoodAgain(),
      id: 2,
    },
  ];
};

const getPersonalOptions = (actionProvider) => {
  return [
    {
      text: 'Experience',
      handler: () => actionProvider.handleExperience(),
      id: 1,
    },
    {
      text: 'Projects',
      handler: () => actionProvider.handleProjects(),
      id: 2,
    },
    {
      text: 'Skills',
      handler: () => actionProvider.handleSkills(),
      id: 3,
    },
    {
      text: 'Blogs',
      handler: () => actionProvider.handleBlogs(),
      id: 4,
    },
  ];
};



export const WebHome = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [lang,] = useLangMode();
  const refProgramm = useRef();
  const [positionVisualStudio, setPositionVisualStudio] = useState({
    x: 0,
    y: 0
  })


  const [isVisible, setIsVisible] = useState(true);
  const [currentImageProg, setCurrentImageProg] = useState(0);
  const [currentImageFramework, setCurrentImageFramework] = useState(0);
  const [currentImageSoftware, setCurrentImageSoftware] = useState(0);
  const imgProg = [
    <JavascriptIcon size={60} />,
    <HtmlIcon size={60} />,
    <NodeJsIcon size={70} />,
    <AndroidIcon size={70} />
  ]

  const imgFramework = [
    <ReactIcon size={60} />,
    <MaterialUiIcon size={60} />,
    <PwaIcon size={70} />,
    <XCodeIcon size={60} />
  ]

  const imgSoftware = [
    <NextJsIcon size={60} />,
    <CssIcon size={60} />,
    <VisualStudioIcon size={60} />,
    <FlutterIcon size={50} />
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
    <Box sx={{
      height: '100%',
      position: 'relative',
      //my:30,
      //mb:50,
      overflowY: 'scroll',
      //backgroundColor: `rgba(${theme.palette.mode === THEME_LIGHT ? '255,255,255' : '0,0,0'}, 0.7)`, /* Black w/opacity/see-through */
      //opacity:0.5,
      //zIndex:0
      //mt: 3,
      //paddingBottom: 100
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        //paddingTop:50
        //background:'red',

        //opacity:1,
        //zIndex:10000
        //opacity:0.5

      }}>
        <Stack
          //mb={50}
          py={10}
          justifyContent={'center'} alignItems={'center'}
          sx={{
            opacity: 1,
            //background:'cyan'
          }}>
          <Stack p={1} mt={3} direction={'row'} spacing={1} alignItems={'center'} justifyContent={'center'} sx={{
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
                margin: 'auto',
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
                        scale: index === currentImageProg ? 2 : 1,
                      }}
                      transition={{ duration: 1 }}
                      style={{
                        position: 'absolute',
                        //background:'yellow',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        //textAlign:'center'
                      }}
                    >
                      <Stack justifyContent={'center'} alignItems={'center'} sx={{
                        width: '100%',
                        height: '100%'
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
                margin: 'auto',
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
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        //textAlign:'center'
                      }}
                    >
                      <Stack justifyContent={'center'} alignItems={'center'} sx={{
                        width: '100%',
                        height: '100%'
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
                margin: 'auto',
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
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        //textAlign:'center'
                      }}
                    >
                      <Stack justifyContent={'center'} alignItems={'center'} sx={{
                        width: '100%',
                        height: '100%'
                      }}>
                        {image}
                      </Stack>
                    </motion.div>
                  ))}
                </Grid>
              </AnimatePresence>
            </Stack>
          </Stack>

          <Typography fontWeight={'bold'} pb={3}>{t('userPosition', { ns: _NAMESPACE_LANGAGE_HOME_ })}</Typography>

          <Stack alignItems={'center'} spacing={1} mb={2}>
            <Bounce duration={3000}>
              <Paper
                //elevation={theme.palette.mode === THEME_LIGHT ? 16 : 0} 
                sx={{
                  p: 1,
                  //px:2,
                  borderRadius: '50%',
                  border: '3px solid var(--primary)',
                  background: 'transparent'
                }}>
                <Avatar src="/me-no-back.png"
                  sx={{ width: 150, height: 150, }}
                />
              </Paper>
            </Bounce>

            <SelectLangageComponent />
          </Stack>


          <Stack my={5} p={1} alignItems={'center'}>
            <Link href={_PAGE_LINK_CHAT_BOT_} target={'_blank'}>
              <Button sx={{ color: 'var(--text)' }} startIcon={<ResumeIcon />} variant='contained'>{t('buttons.goChat', { ns: _NAMESPACE_LANGAGE_HOME_ })}</Button>
            </Link>
            <Link href={_PAGE_LINK_RESUME_} target={'_blank'} style={{ display: 'none' }}>
              <Button sx={{ color: 'var(--text)' }}>{t('buttons.goCv', { ns: _NAMESPACE_LANGAGE_HOME_ })}</Button>
            </Link>
          </Stack>


        </Stack>
        <div className="appFooter" style={{ position: 'relative', background: 'var(--background)' }}>
          <div className="footer-title" style={{ color: 'var(--accents9)' }}>
            <Stack style={{ fontSize: 12 }} spacing={0.3}>
              <div>
                {t('footer.deployedWith')} <a href={_NEXTJS_LINK_} target='_blank'>{`Next.js`} <NextJsIcon size={15} /></a>
              </div>
              <div>
                {`${t('footer.copyright')}`}<span className="yearNow"></span>{` ${_WEBSITE_ADDRESS_}`}
              </div>
              <div>
                {t('footer.allRightsReserved')}
              </div>
            </Stack>
          </div>

          <div className="mt-2">
            <Tooltip sx={{
              zIndex: 1
            }} open={false} title={t('seeMyCV')} placement="top">
              <a href={`/${lang}${_PAGE_LINK_RESUME_}`} target='_blank' className="btn btn-icon btn-sm" style={{
                background: 'var(--accents6)',
                color: 'black',
                display: "none"
              }}>
                <ion-icon name="newspaper-outline"></ion-icon>
              </a>
            </Tooltip>

            <Tooltip sx={{
              zIndex: 1
            }} title={t('sendMeMail')} placement="top">
              <a href={`mailto:${_MY_PROFILE_.mail}`} className="btn btn-icon btn-sm" style={{
                background: 'var(--primary)',
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
                color: 'white'
              }}>
                <ion-icon name="logo-linkedin"></ion-icon>
              </a>
            </Tooltip>

            <Tooltip sx={{
              zIndex: 1
            }} title={t('profileGithub')} placement="top">
              <a href={_MY_PROFILE_.socials.github} target='_blank' className="btn btn-icon btn-sm" style={{
                background: 'black',
                color: 'white'
              }}>
                <ion-icon name="logo-github"></ion-icon>
              </a>
            </Tooltip>

            <Tooltip sx={{
              zIndex: 1
            }} title={t('profilePlaystore')} placement="top">
              <a href={_MY_PROFILE_.socials.playstore} target='_blank' className="btn btn-icon btn-sm" style={{
                background: "white",
                //color: 'white'
              }}>
                <PlayStoreIcon size={15} />
              </a>
            </Tooltip>

            
          </div>
        </div>
      </div>
    </Box>
  );
};

export default function HomePage() {
  const theme = useTheme();
  const { width } = useWindowSize();
  const { t } = useTranslation();
  const { isMobile } = useDeviceMode();
  const [lang] = useLangMode();

  return (
    <div style={{
      //background:'red', 
      //paddingTop:20,
      //backgroundImage: `url('/img/home/background-${theme.palette.mode}.gif')`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      //background:theme.palette.background.default,
      overflow: 'scroll', position: 'absolute', bottom: 0, top: 0, left: 0, right: 0
    }}>
      <Head>
        <title>{t('titlePage', { ns: _NAMESPACE_LANGAGE_HOME_ })}</title>
        <meta
          name="description"
          content={t('descriptionPage', { ns: _NAMESPACE_LANGAGE_HOME_ })}
        />
      </Head>

      <WebAppBar />
      <CssBaseline />
      <WebHome />

    </div>
  );
  /*
  {width > 740 && <WebAppBar />}
      {width <= 740 && <MobileAppBar />}

   {width > 740 && <WebHome />}
      {width <= 740 && <MobileHome />}
  */
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