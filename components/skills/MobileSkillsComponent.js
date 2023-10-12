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
import { AndroidIcon, AndroidStudioIcon, AtomIcon, CloseIcon, CssIcon, DiscordApiIcon, DjangoIcon, EclipseIcon, EtherJsIcon, FirebaseIcon, GanacheIcon, HtmlIcon, IonicIcon, JavaIcon, JavascriptIcon, MaterialUiIcon, MomentJsIcon, MongoDbIcon, MySqlIcon, NextJsIcon, NodeJsIcon, NotepadIcon, OpenAiIcon, PhotoshopIcon, PhpIcon, PrestashopIcon, PwaIcon, PythonIcon, ReactIcon, SolidityIcon, SpyderIcon, SqlLiteIcon, TruffleIcon, VimIcon, VisualStudioIcon, Web3JsIcon } from '../icons/IconifiyIcons';
import { I18nIcon, MidjourneyIcon, NetbeansIcon, SynthesiaIcon } from '../icons/ImagesIcons';
import { useDeviceMode } from '@/contexts/DeviceModeProvider';
import { blue } from '@mui/material/colors';
import { _MY_PROFILE_, _NEXTJS_LINK_, _PAGE_LINK_RESUME_, _WEBSITE_ADDRESS_ } from '@/_mocks_/_settings_items_';
import { useLangMode } from '@/contexts/LangModeProvider';

import NewsCardDemo from '@/components/projects/CardNews';
import { Carousel, CarouselItem } from 'react-round-carousel';
import Carroussel from '../projects/Caroussel';
import FooterComponent from '../footer/FooterComponent';



export function AlertDialog({ selectedId, setSelectedId, item }) {
  const [open, setOpen] = useState(selectedId > 0);
  const { isMobile } = useDeviceMode();

  const { t } = useTranslation();

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
            {t('sections.skills.disclaimer')}
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

export default function MobileSkillsComponent() {
  const { t } = useTranslation();
  const theme = useTheme();
  const [selectedId, setSelectedId] = useState(null);
  const { isMobile } = useDeviceMode()
  const [lang] = useLangMode();



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

        <Grid item xs={12} md={9}>
        <Masonry columns={{xs:1, sm:3, }} spacing={{xs:0, sm:2}} sx={{
 //width:'70%',
 //height:'100%'
}}>
 
 {itemData.map((item, index) => (
     <Slide key={index} direction='up' cascade damping={1} triggerOnce>
        <div  style={{cursor:'pointer', color:'var(--text)', position:'relative', paddingTop: isMobile ? 10 : 0,}} >
   <motion.div
   layoutId={index + 1} onClick={() => setSelectedId(index + 1)}
whileHover={{ scale: 1.05 }}
style={{
  border:'1px solid var(--accents2)',
  borderRadius:'10px'
}}
//whileTap={{ scale: 0.9, background:'red' }}
//whileFocus={{background:'red'}}
>

<motion.div
whileHover={{ scale: 1.1 }}
 
//whileTap={{ scale: 0.9, background:'red' }}
//whileFocus={{background:'red'}}
>
<Label sx={{
borderTopLeftRadius:'10px',
borderTopRightRadius:'10px',
fontWeight:'bold',
fontSize:16,
py:2,px:2, color:'var(--text)', background:'var(--background-menu)', 
//position:'absolute', 
//left:20,
//right:20,
//top:'50%',
//bottom:'50%'
my:'auto'
}}>
        {t(item.title)}
        {item.subtitle && ` / ${t(item.subtitle)}`}
    </Label>
</motion.div>
    <img
       src={`${item.img}?w=81&auto=format`}
       srcSet={`${item.img}?w=81&auto=format&dpr=2 2x`}
       alt={item.title}
       loading="lazy"
       style={{
         borderBottomLeftRadius: 10,
         borderBottomRightRadius: 10,
         display: 'block',
         width: '100%',
       }}
     />
</motion.div>        
   </div>
   </Slide>
 ))}

</Masonry>
<AnimatePresence>
        {selectedId && (
          <motion.dialog layoutId={selectedId}>
            <AlertDialog
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            item={itemData[selectedId-1]}
            />
          </motion.dialog>
        )}
      </AnimatePresence>
        </Grid>

        <Grid item xs={12}>
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
      ['Javascript', 95, <Stack direction={'row'} alignItems={'center'} spacing={1}><JavascriptIcon size={30} /><Typography>{``}</Typography></Stack>],
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

