import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import { styled, useTheme } from '@mui/material/styles';
import { Card, CircularProgress, Container, Grid, IconButton, ImageListItem, LinearProgress, ListSubheader, Stack, Tooltip, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { Bounce, Fade, Flip, Slide } from 'react-awesome-reveal';
import { motion, AnimatePresence } from "framer-motion";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Image from 'next/image';
import { AngolanIcon, EnglishIcon, FrenchIcon } from '../icons/FlagIcons';
import { AndroidIcon, AndroidStudioIcon, AtomIcon, CertificationIcon, CloseIcon, CssIcon, DiscordApiIcon, DjangoIcon, EclipseIcon, EtherJsIcon, FirebaseIcon, GanacheIcon, HtmlIcon, IonicIcon, JavaIcon, JavascriptIcon, MaterialUiIcon, MomentJsIcon, MongoDbIcon, MySqlIcon, NextJsIcon, NodeJsIcon, NotepadIcon, OpenAiIcon, PhotoshopIcon, PhpIcon, PrestashopIcon, PwaIcon, PythonIcon, ReactIcon, SolidityIcon, SpyderIcon, SqlLiteIcon, TruffleIcon, VimIcon, VisualStudioIcon, Web3JsIcon } from '../icons/IconifiyIcons';
import { I18nIcon, MidjourneyIcon, NetbeansIcon, SynthesiaIcon } from '../icons/ImagesIcons';
import { useDeviceMode } from '@/contexts/DeviceModeProvider';
import { blue } from '@mui/material/colors';
import { _MY_PROFILE_, _NEXTJS_LINK_, _PAGE_LINK_RESUME_, _WEBSITE_ADDRESS_ } from '@/_mocks_/_settings_items_';
import { useLangMode } from '@/contexts/LangModeProvider';

import NewsCardDemo from '@/components/projects/CardNews';
import { Carousel, CarouselItem } from 'react-round-carousel';
import Carroussel from '../projects/Caroussel';
import FooterComponent from '../footer/FooterComponent';
import { useSwipeable } from 'react-swipeable';



export function AlertDialog({ selectedId, setSelectedId, item }) {
  const [open, setOpen] = useState(selectedId > 0);
  const { isMobile } = useDeviceMode();

  const { t } = useTranslation();

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
    <div style={{ position: 'relative' }}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullScreen={isMobile ? true : false}
        //style={{p:30}}
        //TransitionComponent={Fade}
        transitionDuration={{
          enter: 0,
          exit: 0
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
                return (
                  <Grid
                    key={idx}
                    item
                    xs={6}
                    md
                  //sx={{background:'cyan'}}
                  >
                    <Card sx={{
                      py: 2,
                      px: 1,
                      height: '100%',
                      width: '100%',
                      border: '1px solid var(--accents2)',
                      //background:'purple',
                      textAlign: 'center'
                    }}>
                      <Stack alignItems={'center'} spacing={1} justifyContent={'center'} sx={{
                        height: '100%',
                        width: '100%',
                        // background:'red',
                        textAlign: 'center'
                      }}>
                        <Stack alignItems={'center'} justifyContent={{ xs: 'center', md: 'center' }}
                          style={{
                            height: '100%', width: '100%',
                            //background:'green'
                          }}>
                          {
                            icon
                          }
                          <Typography sx={{ fontWeight: 'bold' }}>{t(name)}</Typography>
                        </Stack>
                        <Box sx={{ position: 'relative', display: 'inline-flex', width: 100, height: 100 }}>
                          <CircularProgress variant="determinate" value={val} style={{
                            width: 100,
                            height: 100
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
          <div style={{ paddingLeft: 30, paddingRight: 30, display: 'none' }}>
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
                  sx={{ pt: 3, color: 'var(--text)' }}
                  spacing={3}
                >
                  <Grid item xs={4} md={3}>
                    <Typography sx={{ fontWeight: 'bold' }}>{t(name)}</Typography>
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
          <DialogContentText id="alert-dialog-description" sx={{ color: 'red', p: 3 }}>
            {`IMPORTANT : les compétences et les pourcentages indiqués ne représentent pas nécessairement mon niveau absolu, mais plutôt une estimation de ma maîtrise relative des sujets abordés.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ display: 'none' }}>
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

export default function SkillsComponent() {
  const { t } = useTranslation();
  const theme = useTheme();
  const [selectedId, setSelectedId] = useState(1);
  const { isMobile } = useDeviceMode()
  const [lang] = useLangMode();
  const [mouseDown, setMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const handleMouseDown = (e) => {
    setMouseDown(true);
    setStartX(e.clientX);
  };

  const handleMouseUp = () => {
    setMouseDown(false);
  };
  const handleMouseMove = (e) => {
    if (!mouseDown) return;

    const deltaX = e.clientX - startX;
    if (Math.abs(deltaX) > 100) {
      if (deltaX > 0) {
        // Code pour gérer le balayage vers la droite
        setSelectedId((prev) => {
          if (prev - 1 >= 1) {
            return prev - 1
          } else {
            return itemData.length
          }
        })
        console.log("Mouse move right");
      } else {
        // Code pour gérer le balayage vers la gauche
        setSelectedId((prev) => {
          if (prev + 1 <= itemData.length) {
            return prev + 1
          } else {
            return 1
          }
        })
        console.log("Mouse move left");
      }
     setMouseDown(false);
    }
  };
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setSelectedId((prev) => {
        if (prev + 1 <= itemData.length) {
          return prev + 1
        } else {
          return 1
        }
      })
      console.log("Swiped left");
    },
    onSwipedRight: () => {
      setSelectedId((prev) => {
        if (prev - 1 >= 1) {
          return prev - 1
        } else {
          return itemData.length
        }
      })
      console.log("Swiped right");
    },
    onSwipedUp: () => console.log("Swiped up"),
    onSwipedDown: () => console.log("Swiped down"),
    // Vous pouvez également définir d'autres options, consultez la documentation pour plus de détails
  });

  const items = itemData
    .map(({ img, title }, index) => ({
      alt: 'A random photo',
      image: img,
      content: (
        <Grid container justifyContent={'center'} alignItems={'center'} key={index} 
          sx={{
            height: '100%',
            //background:'red'
          }}
        >
          <Grid item>
            <strong>{t(title)}</strong>
          </Grid>
        </Grid>
      )
    }));


  return (
    <Container sx={{
      height: '100vh', position: 'relative', overflowY: 'scroll',
      //background:'green'
    }}
    >
      <Grid
        container
        justifyContent={'center'}
        spacing={5}
        pt={5}
        pb={{xs:20, sm:10}}
      >
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <Stack >
            <Bounce triggerOnce duration={2500}><Typography
              fontSize={26}
              fontWeight={'bold'}
              sx={{
                //background:theme.palette.primary.main, 
                //opacity:0.8, 
                margin: 'auto',
                px: 1,
                //borderRadius:1.5,
                color: 'var(--text)'
              }}>{t('sections.skills.title')}</Typography></Bounce>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <div 
          {...handlers} 
          onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          >
          <Carousel
            //current={previousValue}
            //ref={previousValue}
            
            items={items}
            itemWidth={250} //default : 210
            prevButtonContent={<Typography sx={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: 10, background: 'transparent' }} onClick={() => {
              setSelectedId((prev) => {
                if (prev - 1 >= 1) {
                  return prev - 1
                } else {
                  return itemData.length
                }
              })
            }}>{``}</Typography>}
            nextButtonContent={<Typography sx={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: 10, background: 'transparent' }} onClick={() => {
              setSelectedId((prev) => {
                if (prev + 1 <= itemData.length) {
                  return prev + 1
                } else {
                  return 1
                }
              })
            }}>{``}</Typography>}
          />
          </div>
          
        </Grid>

        <Grid item xs={12}>
          <Stack alignItems={'center'}>
          {
            itemData[selectedId - 1] && <Typography fontSize={20} fontWeight={'bold'} mb={2}>{`${t(itemData[selectedId - 1].title)}`}</Typography>
          }
          <Grid container spacing={1} px={{ md: 10 }}>
            {
              itemData[selectedId - 1] && itemData[selectedId - 1].skills && itemData[selectedId - 1].skills.map(([name, val, icon, certified], idx) => {
                return (
                  <Grid
                    key={idx}
                    item
                    xs={6}
                    sm={3}
                    md
                  //sx={{background:'cyan'}}
                  >
                    <Card sx={{
                      py: 2,
                      px: 1,
                      height: '100%',
                      width: '100%',
                      border: '1px solid var(--accents2)',
                      //background:'purple',
                      textAlign: 'center'
                    }}>
                      <Stack alignItems={'center'} spacing={1} justifyContent={'center'} sx={{
                        height: '100%',
                        width: '100%',
                        // background:'red',
                        textAlign: 'center'
                      }}>
                        <Stack alignItems={'center'} justifyContent={{ xs: 'center', md: 'center' }}
                          style={{
                            height: '100%', width: '100%',
                            //background:'green'
                          }}>
                          {
                            icon
                          }
                          <Typography sx={{ fontWeight: 'bold' }}>{t(name)}</Typography>
                        </Stack>
                        <Box sx={{ position: 'relative', display: 'inline-flex', width: 100, height: 100 }}>
                          <CircularProgress variant="determinate" value={val} style={{
                            width: 100,
                            height: 100
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
          </Stack>
        </Grid>

       <Grid item xs={12} >
       <Grid container px={{md:20}}>
       <Grid item sx={{textAlign:'justify'}}>
       <Typography id="alert-dialog-description" sx={{ color: 'red',}}>
            {t('sections.skills.disclaimer')}
          </Typography>
       </Grid>
       </Grid>
       </Grid>

       <Grid item>
  <FooterComponent />
</Grid>
      </Grid>

    </Container>
  );
}

const itemData = [
  {
    img: '/img/skills/prog.gif',
    title: 'sections.skills.web.title',
    subtitle: 'sections.skills.mobile.title',
    skills: [
      ['Javascript', 95, <Stack direction={'row'} alignItems={'center'} spacing={1}><JavascriptIcon size={30} /><Typography>{``}</Typography></Stack>, true],
      ['Html', 95, <Stack direction={'row'} alignItems={'center'} spacing={1}><HtmlIcon size={30} /><Typography>{``}</Typography></Stack>],
      ['Css', 85, <Stack direction={'row'} alignItems={'center'} spacing={1}><CssIcon size={30} /><Typography>{``}</Typography></Stack>],
      ['Php', 80, <Stack direction={'row'} alignItems={'center'} spacing={1}><PhpIcon size={50} /><Typography>{``}</Typography></Stack>],
      ['Python', 80, <Stack direction={'row'} alignItems={'center'} spacing={1}><PythonIcon size={40} /><Typography>{``}</Typography></Stack>],
      ['Java', 80, <Stack direction={'row'} alignItems={'center'} spacing={1}><JavaIcon size={30} /><Typography>{``}</Typography></Stack>],
      ['ReactJS', 75, <Stack direction={'row'} alignItems={'center'} spacing={1}><ReactIcon size={35} /><Typography>{``}</Typography></Stack>],
      ['NextJS', 75, <Stack direction={'row'} alignItems={'center'} spacing={1}><NextJsIcon size={35} /><Typography>{``}</Typography></Stack>],
      ['Android', 70, <Stack direction={'row'} alignItems={'center'} spacing={1}><AndroidIcon size={50} /><Typography>{``}</Typography></Stack>],
      ['PWA', 100, <Stack direction={'row'} alignItems={'center'} spacing={1}><PwaIcon size={50} /><Typography>{``}</Typography></Stack>],
      ['Ionic', 70, <Stack direction={'row'} alignItems={'center'} spacing={1}><IonicIcon size={45} /><Typography>{``}</Typography></Stack>],
    ]
  },



  {
    img: '/img/skills/frameworks.jpg',
    title: 'sections.skills.frameworks.title',
    skills: [
      ['NodeJS', 80, <NodeJsIcon size={30} />],
      ['Material Ui', 90, <MaterialUiIcon color={blue[600]} size={30} />],
      ['i18n', 100, <I18nIcon size={35} />],
      ['MomentJS', 100, <MomentJsIcon size={30} />],
      ['API ChatGPT', 70, <OpenAiIcon size={30} />],
      /*
      ['Google Maps API', 80, <GoogleMapsIcon size={20} />],
      ['Twitter API', 80, <TwitterApiIcon size={20} />],
      ['Discord API', 80, <DiscordApiIcon size={20} />],
      ['Ionic', 80, <IonicIcon size={20} />],
      */

      // ['Firebase', 80, <FirebaseIcon size={20} />],
    ],
  },
  {
    img: '/img/skills/ai.gif',
    title: 'sections.skills.artificial.title',
    skills: [
      ['OpenAi', 100, <Stack direction={'row'} alignItems={'center'} spacing={1}><OpenAiIcon size={35} /><Typography>{``}</Typography></Stack>],
      ['Midjourney', 100, <Stack direction={'row'} alignItems={'center'} spacing={1}><MidjourneyIcon size={35} /><Typography>{``}</Typography></Stack>],
      ['Synthesia', 100, <Stack direction={'row'} alignItems={'center'} spacing={1}><SynthesiaIcon size={40} /><Typography>{``}</Typography></Stack>],
    ],
  },
  {
    img: '/img/skills/database.jpg',
    title: 'sections.skills.database.title',
    skills: [
      ['Firebase', 70, <Stack direction={'row'} alignItems={'center'} spacing={1}><FirebaseIcon size={25} /><Typography>{``}</Typography></Stack>],
      ['MongoDB', 50, <Stack direction={'row'} alignItems={'center'} spacing={1}><MongoDbIcon size={20} /><Typography>{``}</Typography></Stack>],
      ['MySQL', 65, <Stack direction={'row'} alignItems={'center'} spacing={1}><MySqlIcon size={35} /><Typography>{``}</Typography></Stack>],
      ['SQLite', 75, <Stack direction={'row'} alignItems={'center'} spacing={1}><SqlLiteIcon size={35} /><Typography>{``}</Typography></Stack>],

    ]
  },

  {
    img: '/img/skills/blockchain.gif',
    title: 'sections.skills.blockchain.title',
    skills: [
      ['Solidity', 70, <Stack direction={'row'} alignItems={'center'} spacing={1}><SolidityIcon size={25} /><Typography>{``}</Typography></Stack>],
      ['Web3JS', 75, <Stack direction={'row'} alignItems={'center'} spacing={1}><Web3JsIcon size={45} /><Typography>{``}</Typography></Stack>],
      ['EtherJS', 75, <Stack direction={'row'} alignItems={'center'} spacing={1}><EtherJsIcon size={45} /><Typography>{``}</Typography></Stack>],
      ['Truffle', 75, <Stack direction={'row'} alignItems={'center'} spacing={1}><TruffleIcon size={35} /><Typography>{``}</Typography></Stack>],
      ['Ganache', 75, <Stack direction={'row'} alignItems={'center'} spacing={1}><GanacheIcon size={40} /><Typography>{``}</Typography></Stack>],
    ],
  },
  {
    img: '/img/skills/software.gif',
    title: 'sections.skills.software.title',
    skills: [
      ['Visual Studio Code', 100, <Stack direction={'row'} alignItems={'center'} spacing={1}><VisualStudioIcon size={35} /><Typography>{``}</Typography></Stack>],
      ['Discord', 100, <Stack direction={'row'} alignItems={'center'} spacing={1}><DiscordApiIcon size={35} /><Typography>{``}</Typography></Stack>],
      ['Android Studio', 85, <Stack direction={'row'} alignItems={'center'} spacing={1}><AndroidIcon size={45} /><Typography>{``}</Typography></Stack>],
      ['Spyder', 60, <Stack direction={'row'} alignItems={'center'} spacing={1}><SpyderIcon size={45} /><Typography>{``}</Typography></Stack>],
      ['Eclipse', 60, <Stack direction={'row'} alignItems={'center'} spacing={1}><EclipseIcon size={40} /><Typography>{``}</Typography></Stack>],
      ['Photoshop', 75, <Stack direction={'row'} alignItems={'center'} spacing={1}><PhotoshopIcon size={40} /><Typography>{``}</Typography></Stack>],
      ['Atom', 80, <Stack direction={'row'} alignItems={'center'} spacing={1}><AtomIcon size={45} /><Typography>{``}</Typography></Stack>],
      ['NotePad ++', 100, <Stack direction={'row'} alignItems={'center'} spacing={1}><NotepadIcon size={45} /><Typography>{``}</Typography></Stack>],
      ['Netbeans', 80, <Stack direction={'row'} alignItems={'center'} spacing={1}><NetbeansIcon size={45} /><Typography>{``}</Typography></Stack>],
      ['Django', 80, <Stack direction={'row'} alignItems={'center'} spacing={1}><DjangoIcon size={40} /><Typography>{``}</Typography></Stack>],
      ['Vim', 50, <Stack direction={'row'} alignItems={'center'} spacing={1}><VimIcon size={40} /><Typography>{``}</Typography></Stack>],

    ]
  },
];

