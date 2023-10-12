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
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
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
import LanguagesComponent from '@/components/languages.js/LanguagesComponent';
import ProjectsComponent from '@/components/projects/ProjectsComponent';



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

export function WebAppBar() {
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
      title={<Typography fontSize={14} color={'text.secondary'}><Fade cascade damping={0.2} style={{fontFamily:GENERAL_FONT_FAMILY}}>{t('sections.skills.title')}</Fade></Typography>} 
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

export function MobileAppBar() {
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
      title={<Typography fontSize={14} color={'text.secondary'}><Fade cascade damping={0.2} style={{fontFamily:GENERAL_FONT_FAMILY}}>{t('sections.skills.title')}</Fade></Typography>} 
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



const WebHome = () => {
  const {t} = useTranslation();
  const [lang, ] = useLangMode();

  const carouselItems = document.querySelectorAll(".carousel-item");

carouselItems.forEach((item, index) => {
    item.style.transform = `rotateY(${(360 / carouselItems.length) * index}deg) translateZ(250px)`;
});

let angle = 0;

const slides = [
  {
    key: '1',
    content: <img src="https://picsum.photos/800/800/?random" alt="1" />
  },
  {
    key: '2',
    content: <img src="https://picsum.photos/800/800/?random" alt="2" />
  },
  {
    key: '3',
    content: <img src="https://picsum.photos/600/800/?random" alt="3" />
  },
  {
    key: '4',
    content: <img src="https://picsum.photos/800/500/?random" alt="4" />
  },
  {
    key: '5',
    content: <img src="https://picsum.photos/800/800/?random" alt="5" />
  },
  {
    key: '6',
    content: <img src="https://picsum.photos/500/800/?random" alt="6" />
  },
  {
    key: '7',
    content: <img src="https://picsum.photos/800/600/?random" alt="7" />
  },
  {
    key: '8',
    content: <img src="https://picsum.photos/800/800/?random" alt="8" />
  }
];



  return (
    <>
    
<Box sx={{
  py:'5px',
      paddingBottom:100,
      background:'transparent'
    }}> 
<Stack direction={'row'} justifyContent={'space-between'}>
<div className={styles.links}>
        <SectionsBar />
      </div>

      <div style={{width:'100%'}}>
      
        <ProjectsComponent />
        {
            /*
            
      <div style={{width:'100%'}}>
{
        lang && lang === LANGAGE_FRENCH && <FrenchChatbot />
      }

{
        lang && lang === LANGAGE_ENGLISH && <EnglishChatbot />
      }
</div>
            */
        }
</div>
    </Stack>
</Box>
    </>
  );
};

const MobileHome = () => {
  const {t} = useTranslation();
  const [lang, ] = useLangMode();
  const [config, setConfig] = useState({
    botName: 'Jeffrey Yu',
    initialMessages: [
      createChatBotMessage(
        t('welcome'),
        {
          widget: 'moodOptions',
        }
      ),
    ],
    // customStyles: {
    //   botMessageBox: {
    //     backgroundColor: '#147efb',
    //   },
    //   chatButton: {
    //     backgroundColor: '#147efb',
    //   },
    // },
    widgets: [
      {
        widgetName: 'moodOptions',
        widgetFunc: ({ actionProvider }) => (
          <Options actionProvider={actionProvider} getOptions={getMoodOptions} />
        ),
      },
      {
        widgetName: 'jokeOptions',
        widgetFunc: ({ actionProvider }) => (
          <Options actionProvider={actionProvider} getOptions={getJokeOptions} />
        ),
      },
      {
        widgetName: 'personalOptions',
        widgetFunc: ({ actionProvider }) => (
          <Options
            actionProvider={actionProvider}
            getOptions={getPersonalOptions}
          />
        ),
      },
      {
        widgetName: 'experienceOptions',
        widgetFunc: () => <ExperienceCards />,
      },
      {
        widgetName: 'projectsOptions',
        widgetFunc: () => <ProjectCards />,
      },
      {
        widgetName: 'skillsOptions',
        widgetFunc: () => <SkillCards />,
      },
      {
        widgetName: 'blogsOptions',
        widgetFunc: () => <BlogCards />,
      },
    ],
  });
  /*
  const config = {
    botName: 'Jeffrey Yu',
    initialMessages: [
      createChatBotMessage(
        t('welcome'),
        {
          widget: 'moodOptions',
        }
      ),
    ],
    // customStyles: {
    //   botMessageBox: {
    //     backgroundColor: '#147efb',
    //   },
    //   chatButton: {
    //     backgroundColor: '#147efb',
    //   },
    // },
    widgets: [
      {
        widgetName: 'moodOptions',
        widgetFunc: ({ actionProvider }) => (
          <Options actionProvider={actionProvider} getOptions={getMoodOptions} />
        ),
      },
      {
        widgetName: 'jokeOptions',
        widgetFunc: ({ actionProvider }) => (
          <Options actionProvider={actionProvider} getOptions={getJokeOptions} />
        ),
      },
      {
        widgetName: 'personalOptions',
        widgetFunc: ({ actionProvider }) => (
          <Options
            actionProvider={actionProvider}
            getOptions={getPersonalOptions}
          />
        ),
      },
      {
        widgetName: 'experienceOptions',
        widgetFunc: () => <ExperienceCards />,
      },
      {
        widgetName: 'projectsOptions',
        widgetFunc: () => <ProjectCards />,
      },
      {
        widgetName: 'skillsOptions',
        widgetFunc: () => <SkillCards />,
      },
      {
        widgetName: 'blogsOptions',
        widgetFunc: () => <BlogCards />,
      },
    ],
  };
  */

  useEffect(() => {
    /*
    setConfig({
      botName: 'Jeffrey Yu',
      initialMessages: [
        createChatBotMessage(
          t('welcome'),
          {
            widget: 'moodOptions',
          }
        ),
      ],
      // customStyles: {
      //   botMessageBox: {
      //     backgroundColor: '#147efb',
      //   },
      //   chatButton: {
      //     backgroundColor: '#147efb',
      //   },
      // },
      widgets: [
        {
          widgetName: 'moodOptions',
          widgetFunc: ({ actionProvider }) => (
            <Options actionProvider={actionProvider} getOptions={getMoodOptions} />
          ),
        },
        {
          widgetName: 'jokeOptions',
          widgetFunc: ({ actionProvider }) => (
            <Options actionProvider={actionProvider} getOptions={getJokeOptions} />
          ),
        },
        {
          widgetName: 'personalOptions',
          widgetFunc: ({ actionProvider }) => (
            <Options
              actionProvider={actionProvider}
              getOptions={getPersonalOptions}
            />
          ),
        },
        {
          widgetName: 'experienceOptions',
          widgetFunc: () => <ExperienceCards />,
        },
        {
          widgetName: 'projectsOptions',
          widgetFunc: () => <ProjectCards />,
        },
        {
          widgetName: 'skillsOptions',
          widgetFunc: () => <SkillCards />,
        },
        {
          widgetName: 'blogsOptions',
          widgetFunc: () => <BlogCards />,
        },
      ],
    })
    */
  }, [lang])

  return (
    <div style={{
      paddingTop:10
    }}>
<ProjectsComponent />
    </div>
  );
};

export default function ProjectsPage() {
  const { width } = useWindowSize();
const {t} = useTranslation();
const [lang] = useLangMode();

  return (
    <>      
      {width > 740 ? <WebAppBar /> : <MobileAppBar />}
    <CssBaseline />
    
    {width > 740 ? <WebHome /> : <MobileHome />}
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
            }} title={t('seeMyCV')} placement="top">
              <a href={`/${lang}${_PAGE_LINK_RESUME_}`} target='_blank' className="btn btn-icon btn-sm" style={{
                background: 'var(--accents6)',
                color: 'black'
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
          </div>
        </div>
    </>
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