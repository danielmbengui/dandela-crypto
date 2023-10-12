import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import { styled, useTheme } from '@mui/material/styles';
import { Card, CircularProgress, Container, Grid, IconButton, ImageListItem, LinearProgress, ListSubheader, Stack, Tooltip, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { Bounce, Fade, Flip, Slide } from 'react-awesome-reveal';
import {motion, AnimatePresence} from "framer-motion";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Image from 'next/image';
import { AngolanIcon, EnglishIcon, FrenchIcon } from '../icons/FlagIcons';
import { AndroidIcon, AndroidStudioIcon, AtomIcon, CloseIcon, CssIcon, DiscordApiIcon, DjangoIcon, EclipseIcon, EtherJsIcon, FirebaseIcon, GanacheIcon, HtmlIcon, IonicIcon, JavaIcon, JavascriptIcon, MaterialUiIcon, MomentJsIcon, MongoDbIcon, MySqlIcon, NextJsIcon, NodeJsIcon, NotepadIcon, OpenAiIcon, PhotoshopIcon, PhpIcon, PrestashopIcon, PwaIcon, PythonIcon, ReactIcon, SolidityIcon, SpyderIcon, SqlLiteIcon, TruffleIcon, VimIcon, VisualStudioIcon, Web3JsIcon } from '../icons/IconifiyIcons';
import { I18nIcon, MidjourneyIcon, NetbeansIcon, SynthesiaIcon } from '../icons/ImagesIcons';
import { useDeviceMode } from '@/contexts/DeviceModeProvider';
import { blue } from '@mui/material/colors';
import { _MY_PROFILE_, _NEXTJS_LINK_, _PAGE_LINK_RESUME_, _WEBSITE_ADDRESS_ } from '@/_mocks_/_settings_items_';
import { useLangMode } from '@/contexts/LangModeProvider';

import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
//import Carousel from 'react-spring-3d-carousel';
//import Carousel from "react-spring-3d-carousel";
import dynamic from 'next/dynamic';
import Carroussel from './Caroussel';
import NewsCardDemo from './CardNews';
//import CardNews from './CardNews';

import { Carousel, CarouselItem } from 'react-round-carousel';

// Create an array of Carousel Items
const items = Array(20)
  .fill('')
  .map((_, index) => ({
    alt: 'A random photo',
    image: `/img/logos/winnobearzclub.png`,
    content: (
      <div>
        <strong>Round Carousel</strong>
        <span>Slide number {index + 1}</span>
      </div>
    )
  }));

//const Carousel = dynamic(() => import('react-spring-3d-carousel'), { ssr: false });


export function AlertDialog({selectedId, setSelectedId, item}) {
  const [open, setOpen] = useState(selectedId > 0);
const {isMobile} = useDeviceMode();

const {t} = useTranslation();

  const skill = {
    name: 'sections.skills.langs.title',
    skills: [
      ['sections.skills.langs.ao.name', 100, <Stack direction={'row'} alignItems={'center'} spacing={1}><AngolanIcon size={20} /><Typography>{`Langue maternelle`}</Typography></Stack>],
      ['sections.skills.langs.fr.name', 100, <Stack direction={'row'} alignItems={'center'} spacing={1}><FrenchIcon size={20} /><Typography>{`Langue maternelle`}</Typography></Stack>],
      ['sections.skills.langs.en.name', 70, <Stack direction={'row'} alignItems={'center'} spacing={1}><EnglishIcon size={20} /><Typography>{`Niveau B1`}</Typography></Stack>],
    ],
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedId(null);
  };

  return (
    <div style={{position:'relative'}}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullScreen={isMobile ? true : false}
        //style={{p:30}}
        //TransitionComponent={Fade}
        transitionDuration={{
          enter:0,
          exit:0
        }}
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
      {item && t(item.title)}
      <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
    </DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            {
              item.skills && item.skills.map(([name, val, icon], idx) => {
                return(
                  <Grid
                  key={idx}
                  item
                  xs={6}
                  md
                  //sx={{background:'cyan'}}
                  >
                    <Card sx={{
                      py:2,
                      px:1,
                      height:'100%',
                      width:'100%',
                      border:'1px solid var(--accents2)',
                      //background:'purple',
                      textAlign:'center'
                    }}>
                    <Stack alignItems={'center'} spacing={1} justifyContent={'center'} sx={{
                      height:'100%',
                      width:'100%',
                     // background:'red',
                      textAlign:'center'
                    }}>
                   <Stack alignItems={'center'} justifyContent={{xs:'center', md:'center'}} 
                   style={{height:'100%', width:'100%', 
                   //background:'green'
                   }}>
                   {
                icon
              }
                    <Typography sx={{fontWeight:'bold'}}>{t(name)}</Typography>
                   </Stack>
                    <Box sx={{ position: 'relative', display: 'inline-flex', width:100, height:100 }}>
                    <CircularProgress variant="determinate" value={val} style={{
                      width:100,
                      height:100
                    }} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          //background:'red'
        }}
      >
        
        <Typography variant="caption" component="div" color="text.primary">
          {`${Math.round(val)}%`}
        </Typography>
      </Box>
    </Box>
                    </Stack>
                    </Card>
                    </Grid>
                )
              })
            }
          </Grid>
        <div style={{paddingLeft:30, paddingRight:30, display:'none'}}>
        {item.skills && item.skills.map(([name, val, icon], idx) => {
        return (
          <Grid
            container
            display="flex"
            flexDirection="row"
            key={idx}
            width="100%"
            alignItems="center"
            justifyContent={'center'}
            sx={{ pt: 3, color:'var(--text)' }}
            spacing={3}
          >
            <Grid item xs={4} md={3}>
              <Typography sx={{fontWeight:'bold'}}>{t(name)}</Typography>
            </Grid>
            <Grid item xs sm md>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} spacing={1} pb={1}>
            {
                icon
              }
            <Typography variant="body2" color="text.primary">{`${Math.round(
          val,
        )}%`}</Typography>
            </Stack>
            <LinearProgress
                  variant="determinate"
                  value={val}
                  sx={{ borderRadius: 2 }}
                />
              
            </Grid>
          </Grid>
        );
      })}
        </div>
          <DialogContentText id="alert-dialog-description" sx={{color:'red', p:3}}>
            {`IMPORTANT : les compétences et les pourcentages indiqués ne représentent pas nécessairement mon niveau absolu, mais plutôt une estimation de ma maîtrise relative des sujets abordés.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{display:'none'}}>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
 
const Label = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
}));

export default function ProjectsComponent() {
    const {t} = useTranslation();
const theme = useTheme();
const [selectedId, setSelectedId] = useState(null)
const {isMobile} = useDeviceMode()
const [lang] = useLangMode();

const cards = [
  {
    key: '1',
    content: <Card sx={{height:'auto', width:100, background:'yellow'}}><Typography>{`1`}</Typography></Card>
  },
  {
    key: '2',
    content: <NewsCardDemo />
  },
  {
    key: '3',
    content: <Card sx={{height:'auto',width:100, background:'cyan'}}><Typography>{`2`}</Typography></Card>
  },
  {
    key: '4',
    content: <NewsCardDemo />
  },
]; /*.map((element, index) => {
  return { ...element, onClick: () => setGoToSlide(index) };
});*/

const slides = [
  {
    key: '1',
    content: <img src="/img/bot-no-back.gif" />
  },
  {
    key: '2',
    content: <div style={{background:'red'}}><img src="/img/bot-no-back.gif" /></div>
  }
]
  return (
    <Container sx={{height:'100vh', position:'relative', overflowY:'scroll', 
    //background:'green'
}}
    >
        <Grid 
        container 
        justifyContent={'center'}
        spacing={5}
        pt={5} 
        pb={10}
        >
            <Grid item xs={12} sx={{textAlign:'center'}}>
            <Stack >
            <Bounce triggerOnce duration={2500}><Typography 
            fontSize={26} 
            fontWeight={'bold'}
            sx={{
                //background:theme.palette.primary.main, 
                //opacity:0.8, 
                margin:'auto', 
                px:1, 
                //borderRadius:1.5,
                color:'var(--text)'
              }}>{t('sections.projects.title')}</Typography></Bounce>
            </Stack>
            </Grid>


<Grid item xs={12}>
<Carousel items={items} />
</Grid>

            <Grid item sx={{display:'none'}}>
            <div className="App">
            <Carroussel
        cards={cards}
        height="500px"
        width="100%"
        margin="0 auto"
        offset={2}
        showArrows={true}
      />
            </div>
            
            </Grid>

            <Grid item sx={{display:'none'}}>
           
            </Grid>



            <Grid item sx={{display:'none'}}>
<Splide hasTrack={ false } options={ {
    rewind: true,
    width : 300,
    gap   : '1rem',
  } }>
  <SplideTrack>
  <SplideSlide>
    <img src="/img/bot-no-back.png" alt="Image 1" style={{
      //width:'100%',
      //height:'100%',
      objectFit:'contain'
    }} />
  </SplideSlide>
  <SplideSlide>
    <img src="/img/bot-no-back.gif" alt="Image 2"/>
  </SplideSlide>
  </SplideTrack>
</Splide>
</Grid>

<Grid item xs={12} sm={10} sx={{display:'none'}}>
<Splide aria-label="My Favorite Images">
  <SplideSlide>
    <img src="/img/bot-no-back.png" alt="Image 1"/>
  </SplideSlide>
  <SplideSlide>
    <img src="/img/bot-no-back.png" alt="Image 2"/>
  </SplideSlide>
</Splide>
</Grid>




            <Grid item xs={12}>
            <div className="appFooter" style={{ marginTop:150, background: 'var(--background)' }}>
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
            </Grid>
        </Grid>
        
    </Container>
  );
}
