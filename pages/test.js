import React from "react";
import Head from "next/head";
import styles from "../styles/Test.module.css";
import { Box, Container, Grid, Stack } from "@mui/material";
import Image from "next/image";
import LanguagePopover from "../components/langage-popover";
import MaterialUISwitch from "../components/switch-theme-mode";

function InclinedImage(srcImage, width = '100%') {
    const style = {
      transform: 'perspective(700px) rotateX(-10deg) rotateY(30deg)',  // Incline l'image de -5 degrés
      maxWidth: width,            // Assurez-vous que l'image ne dépasse pas la largeur de son conteneur
      display: 'block'             // Évite les espaces indésirables sous l'image
    };
  
    return (
      <img src={srcImage} alt="Description de l'image" style={style} />
    );
  }

export default function Test(props) {
    const { onSidebarOpen, langage, setLangage, hideNavBar, ...other } = props;
    return(
        <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 5
        }}
      >
<Container maxWidth={false}>
        <>
       <Grid px={5} container justifyContent={'center'} alignItems={'center'} sx={{backgroundColor: 'red', position:'fixed'}}>
        <Grid item xs={1}>
            <Image src={"/logo.png"} width={50} height={50} layout="responsive" />
        </Grid>
        <Grid item xs={8} container justifyContent="space-evenly" sx={{background:'green'}}>
            <Stack direction={'row'} spacing={5}>
            <a href="#" className={styles.link}>Home</a>
        <a href="#" className={styles.link}>Services</a>
        <a href="#" className={styles.link}>FAQ</a>
            </Stack>
        </Grid>
        <Grid item xs={3} container justifyContent="space-evenly" sx={{background:'green'}}>
            <Stack direction={'row'} spacing={1}>
            <MaterialUISwitch />
            <LanguagePopover 
          langage={langage} setLangage={setLangage}
          />
          
            </Stack>
       
        </Grid>
       </Grid>
       <div className={styles.menuContainer}>
      <span className={styles.logo}>Veteran.</span>
      <div className={styles.links}>
        <a href="#" className={styles.link}>Home</a>
        <a href="#" className={styles.link}>Services</a>
        <a href="#" className={styles.link}>FAQ</a>
      </div>
    </div>
            <section className={styles.mainContent}>
                <h1>Honoring Heroes: Ukraine's War Veterans</h1>
                <p>Welcome to a tribute to the indomitable spirit of Ukraine's war veterans. This application is a digital sanctuary dedicated to the brave men and women who have selflessly defended our nation's freedom and sovereignty.</p>
                <div className={styles.downloadLinks}>
                    <a href="#"><img src="/icons/appstore.png" alt="App Store" width={'200px'} /></a>
                    <a href="#"><img src="/icons/playstore.png" alt="Play Store" width={'200px'} /></a>
                </div>
                <div className={styles.phoneImages}>
                    {
                        InclinedImage("/static/images/mockups/android/get_started_page.png", '30%')
                    }
                    <img width={'30%'} src="/static/images/mockups/android/get_started_page.png" alt="Phone Image 1" />
                    <img width={'30%'}  src="/static/images/mockups/android/get_started_page.png" alt="Phone Image 2" />
                </div>
                <div className={styles.usersCount}>
                    <p>300K +</p>
                    <p>Users</p>
                </div>
            </section>
       </>
       </Container>
        </Box>
       
        
    );
}