import React, { useState } from 'react';

import { Divider, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { Drawer } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Box } from '@mui/system';

import ExperienceCards from '../organisms/ExperienceCards';
import ProjectCards from '../organisms/ProjectCards';
import SkillCards from '../organisms/SkillCards';
import BlogCards from '../organisms/BlogCards';

import ArchitectureRoundedIcon from '@mui/icons-material/ArchitectureRounded';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { ChatbotIcon, GithubIcon, LanguagesIcon, LinkedinIcon, ProjectIcon, ResumeIcon, SkillsIcon } from '@/components/icons/IconifiyIcons';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useLangMode } from '@/contexts/LangModeProvider';
import { _PAGE_LINK_CHAT_BOT_, _PAGE_LINK_RESUME_, _PAGE_LINK_SKILLS_, _MY_PROFILE_, _PAGE_LINK_LANGUAGES_, _PAGE_LINK_PROJECTS_ } from '@/_mocks_/_settings_items_';
import scintillate from "@/styles/Scintillating.module.css";
import EmailIcon from '@mui/icons-material/Email';
import { Slide } from 'react-awesome-reveal';



function SectionsBar() {
  const { t } = useTranslation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [section, setSection] = useState('');
  const router = useRouter();
  const [lang,] = useLangMode();

  const toggleDrawer = (isOpen, section) => {
    setSection(section);
    setDrawerOpen(isOpen);
  };

  const DrawerLayout = () => {
    return (
      <div sx={{ padding: 20, }}>
        <Box
          sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', pt: 3, }}
        >
          <IconButton
            onClick={() => toggleDrawer(false, '')}
            sx={{ margin: 2 }}
          >
            <ArrowBackIosNewRoundedIcon />
          </IconButton>
          <Typography variant="h6">{section}</Typography>
        </Box>
        <Box sx={{ marginX: 2 }}>
          <DrawerContent />
        </Box>
      </div>
    );
  };

  const DrawerContent = () => {
    switch (section) {
      case 'Experience':
        return <ExperienceCards isDetailed={true} />;
      case 'Projects':
        return <ProjectCards isDetailed={true} />;
      case t('sections.skills.title'):
        return <SkillCards isDetailed={true} />;
      case 'Blogs':
        return <BlogCards isDetailed={true} />;
      default:
        return <></>;
    }
  };

  return (
    <>
      <Stack
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{
          height: '100%',
          //background:'green'
        }}
      >
        <Slide cascade direction='up' triggerOnce>
          <Tooltip
            title={<Typography color={'white'}  style={{ fontSize: 13 }}>{t('chatbot')}</Typography>}
            placement="right"
          //sx={{display:'none'}}
          >
            <IconButton
              aria-label="experience"
              onClick={() => router.push(`/${lang}/${_PAGE_LINK_CHAT_BOT_}`)}
              color={router.asPath === _PAGE_LINK_CHAT_BOT_ ? 'var(--primary)' : 'var(--accents7)'}
              sx={{ "&:hover": { color: "var(--primary)" } }}
            //className={scintillate['container']}
            >
              <ChatbotIcon
                // className={scintillate.scintillatingBox}
                //color={router.asPath === PAGE_LINK_CHAT_BOT ? 'var(--primary)' : 'var(--accents7)'} 
                size={30}
                color={router.asPath === _PAGE_LINK_CHAT_BOT_ ? 'var(--primary)' : 'inherit'}
              //color={router.asPath === PAGE_LINK_SKILLS ? 'var(--primary)' : 'blue'} 
              />
            </IconButton>
          </Tooltip>

          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
          //spacing={1}
          >
            <Tooltip
              title={<Typography color={'white'}  style={{ fontSize: 13 }}>{t('sections.skills.langs.title')}</Typography>}
              placement="right"
            //sx={{ "&:hover": { color: "blue" } }}
            >
              <IconButton
                aria-label={t('sections.skills.langs.title')}
                //onClick={() => toggleDrawer(true, t('sections.skills.title'))}
                onClick={() => router.push(`/${lang}/${_PAGE_LINK_LANGUAGES_}`)}
                sx={{ "&:hover": { color: "var(--primary)" } }}
                color={router.asPath === _PAGE_LINK_LANGUAGES_ ? 'var(--primary)' : 'var(--accents7)'}
              >
                <LanguagesIcon
                  //color={'inherit'} 
                  color={router.asPath === _PAGE_LINK_LANGUAGES_ ? 'var(--primary)' : 'inherit'}
                  //sx={{ "&:hover": { color: "var(--primary)" } }} 
                  size={30}
                //sx={{ "&:hover": { background: "inherit" } }}
                //hoverColor={'var(--primary)'}
                />
              </IconButton>
            </Tooltip>

            <Tooltip
              title={<Typography color={'white'}  style={{ fontSize: 13 }}>{t('sections.skills.title')}</Typography>}
              placement="right"
            //sx={{ "&:hover": { color: "blue" } }}
            >
              <IconButton
                aria-label={t('sections.skills.title')}
                //onClick={() => toggleDrawer(true, t('sections.skills.title'))}
                onClick={() => router.push(`/${lang}/${_PAGE_LINK_SKILLS_}`)}
                sx={{ "&:hover": { color: "var(--primary)" } }}
                color={router.asPath === _PAGE_LINK_SKILLS_ ? 'var(--primary)' : 'var(--accents7)'}
              >
                <SkillsIcon
                  //color={'inherit'} 
                  color={router.asPath === _PAGE_LINK_SKILLS_ ? 'var(--primary)' : 'inherit'}
                  //sx={{ "&:hover": { color: "var(--primary)" } }} 
                  size={30}
                //sx={{ "&:hover": { background: "inherit" } }}
                //hoverColor={'var(--primary)'}
                />
              </IconButton>
            </Tooltip>

            <Tooltip
              title={<Typography color={'white'}  style={{ fontSize: 13 }}>{t('sections.projects.title')}</Typography>}
              placement="right"
            sx={{ 
              "&:hover": { display:'none' } 
            }}
            >
              <IconButton
                aria-label={t('sections.projects.title')}
                //onClick={() => toggleDrawer(true, t('sections.skills.title'))}
                onClick={() => router.push(`/${lang}/${_PAGE_LINK_PROJECTS_}`)}
                sx={{ 
                  display:'none',
                  "&:hover": { color: "var(--primary)" } 
                }}
                color={router.asPath === _PAGE_LINK_PROJECTS_ ? 'var(--primary)' : 'var(--accents7)'}
              >
                <ProjectIcon
                  //color={'inherit'} 
                  color={router.asPath === _PAGE_LINK_PROJECTS_ ? 'var(--primary)' : 'inherit'}
                  //sx={{ "&:hover": { color: "var(--primary)" } }} 
                  size={30}
                //sx={{ "&:hover": { background: "inherit" } }}
                //hoverColor={'var(--primary)'}
                />
              </IconButton>
            </Tooltip>

            
          </Stack>

          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
          //spacing={1}
          >
            <Tooltip
              title={<Typography color={'white'}  style={{ fontSize: 13 }}>{t('seeMyCV')}</Typography>}
              placement="right"
              open={false}
            //sx={{ "&:hover": { color: "blue" } }}
            >
              <a href={`/${lang}/${_PAGE_LINK_RESUME_}`} target="_blank" style={{ display: 'none' }}>
                <IconButton
                  aria-label={t('sections.skills.title')}
                  //onClick={() => toggleDrawer(true, t('sections.skills.title'))}
                  //onClick={() => router.push(`/${lang}/${PAGE_LINK_SKILLS}`)}
                  sx={{ "&:hover": { color: "var(--primary)" }, display:"none" }}
                //color={router.asPath === PAGE_LINK_SKILLS ? 'var(--primary)' : 'var(--accents7)'} 
                >
                  <ResumeIcon
                    //color={'inherit'} 
                    color={'inherit'}
                    //sx={{ "&:hover": { color: "var(--primary)" } }} 
                    size={35}
                  //sx={{ "&:hover": { background: "inherit" } }}
                  //hoverColor={'var(--primary)'}
                  />
                </IconButton>
              </a>
            </Tooltip>

            <Tooltip
              title={<Typography color={'white'}  style={{ fontSize: 13 }}>{t('sendMeMail')}</Typography>}
              placement="right"
            //sx={{ "&:hover": { color: "blue" } }}
            >
              <a href={`mailto:${_MY_PROFILE_.mail}`}>
                <IconButton
                  aria-label={t('sections.skills.title')}
                  //onClick={() => toggleDrawer(true, t('sections.skills.title'))}
                  //onClick={() => router.push(`/${lang}/${PAGE_LINK_SKILLS}`)}
                  sx={{ "&:hover": { color: "var(--primary)" } }}
                //color={router.asPath === PAGE_LINK_SKILLS ? 'var(--primary)' : 'var(--accents7)'} 
                >
                  <EmailIcon
                    //color={'inherit'} 
                    color={'inherit'}
                    //sx={{ "&:hover": { color: "var(--primary)" } }} 
                    fontSize={'large'}
                  //sx={{ "&:hover": { background: "inherit" } }}
                  //hoverColor={'var(--primary)'}
                  />
                </IconButton>
              </a>
            </Tooltip>

            <Tooltip
              title={<Typography color={'white'}  style={{ fontSize: 13 }}>{t('profileLinkedin')}</Typography>}
              placement="right"
            //sx={{ "&:hover": { color: "blue" } }}
            >
              <a href={_MY_PROFILE_.socials.linkedin} target="_blank">
                <IconButton
                  aria-label={t('sections.skills.title')}
                  //onClick={() => toggleDrawer(true, t('sections.skills.title'))}
                  //onClick={() => router.push(`/${lang}/${PAGE_LINK_SKILLS}`)}
                  sx={{ "&:hover": { color: "var(--blue-linkedin)" } }}
                //color={router.asPath === PAGE_LINK_SKILLS ? 'var(--primary)' : 'var(--accents7)'} 
                >
                  <LinkedinIcon
                    //color={'inherit'} 
                    color={'inherit'}
                    //sx={{ "&:hover": { color: "var(--primary)" } }} 
                    size={30}
                  //sx={{ "&:hover": { background: "inherit" } }}
                  //hoverColor={'var(--primary)'}
                  />
                </IconButton>
              </a>
            </Tooltip>

            <Tooltip
              title={<Typography color={'white'} style={{ fontSize: 13 }}>{t('profileGithub')}</Typography>}
              placement="right"
            //sx={{ "&:hover": { color: "blue" } }}
            >
              <a href={_MY_PROFILE_.socials.github} target="_blank">
                <IconButton
                  aria-label={t('sections.skills.title')}
                  //onClick={() => toggleDrawer(true, t('sections.skills.title'))}
                  //onClick={() => router.push(`/${lang}/${PAGE_LINK_SKILLS}`)}
                  sx={{ "&:hover": { color: "var(--text)" } }}
                //color={router.asPath === PAGE_LINK_SKILLS ? 'var(--primary)' : 'var(--accents7)'} 
                >
                  <GithubIcon
                    //color={'inherit'} 
                    color={'inherit'}
                    //sx={{ "&:hover": { color: "var(--primary)" } }} 
                    size={35}
                  //sx={{ "&:hover": { background: "inherit" } }}
                  //hoverColor={'var(--primary)'}
                  />
                </IconButton>
              </a>
            </Tooltip>




          </Stack>
        </Slide>
      </Stack>



      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => toggleDrawer(false, '')}
      //sx={{background:'red'}}

      >
        <DrawerLayout />
      </Drawer>
    </>
  );
}

export default SectionsBar;
