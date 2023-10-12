import React, { useState } from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Drawer,
  Stack,
  FormControl,
  Select,
} from '@mui/material';
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
import SelectLangageComponent from '../contexts/SelectLangageComponent';
import { ARRAY_LANGAGES, _PAGE_LINK_CHAT_BOT_, _PAGE_LINK_LANGUAGES_, _PAGE_LINK_PROJECTS_, _PAGE_LINK_SKILLS_ } from '../../_mocks_/_settings_items_';
import EducationCards from '../organisms/EducationCards';
import { ChatbotIcon, EducationIcon, ExperienceIcon, LanguagesIcon, ProjectIcon, SkillsIcon, SoftSkillsIcon } from '../icons/IconifiyIcons';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useLangMode } from '@/contexts/LangModeProvider';
import SwitchThemeComponent from '../contexts/SwitchThemeComponent';

function MobileSectionsBar() {
  const {t} = useTranslation();
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
      <div sx={{ padding: 20 }}>
        <Box
          sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
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
      case 'Education':
        return <EducationCards isDetailed={true} />;
        case 'Experience':
        return <ExperienceCards isDetailed={true} />;
      case 'Projects':
        return <ProjectCards isDetailed={true} />;
      case t(`sections.skills.title`):
        return <SkillCards isDetailed={true} />;
      case 'Blogs':
        return <BlogCards isDetailed={true} />;
      default:
        return <></>;
    }
  };

  return (
    <Box flex flexDirection="column" sx={{position:'relative', zIndex:100}}>
      <List>
      <ListItem disablePadding>
          <ListItemButton
            aria-label="chatbot"
            onClick={() => router.push(`/${lang}/${_PAGE_LINK_CHAT_BOT_}`)}
            sx={{color:router.asPath === _PAGE_LINK_CHAT_BOT_ ? 'var(--primary)' : 'inherit'}}
          >
            <ListItemIcon>
              <ChatbotIcon color={
                router.asPath === _PAGE_LINK_CHAT_BOT_ ? 'var(--primary)' : 'inherit'
              } />
            </ListItemIcon>
            <ListItemText
            primaryTypographyProps={{
              color:router.asPath === _PAGE_LINK_CHAT_BOT_ ? 'var(--primary)' : 'inherit'
            }}
            primary={t(`chatbot`)} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            aria-label={t(`sections.skills.langs.title`)}
            onClick={() => router.push(`/${lang}/${_PAGE_LINK_LANGUAGES_}`)}
            sx={{color:router.asPath === _PAGE_LINK_LANGUAGES_ ? 'var(--primary)' : 'inherit'}}
          >
            <ListItemIcon>
              <LanguagesIcon color={
                router.asPath === _PAGE_LINK_LANGUAGES_ ? 'var(--primary)' : 'inherit'
              } />
            </ListItemIcon>
            <ListItemText
            primaryTypographyProps={{
              color:router.asPath === _PAGE_LINK_LANGUAGES_ ? 'var(--primary)' : 'inherit'
            }}
            primary={t(`sections.skills.langs.title`)} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            aria-label="skills"
            onClick={() => router.push(`/${lang}/${_PAGE_LINK_SKILLS_}`)}
            sx={{color:router.asPath === _PAGE_LINK_SKILLS_ ? 'var(--primary)' : 'inherit'}}
          >
            <ListItemIcon>
              <SkillsIcon color={
                router.asPath === _PAGE_LINK_SKILLS_ ? 'var(--primary)' : 'inherit'
              } />
            </ListItemIcon>
            <ListItemText
            primaryTypographyProps={{
              color:router.asPath === _PAGE_LINK_SKILLS_ ? 'var(--primary)' : 'inherit'
            }}
            primary={t(`sections.skills.title`)} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding sx={{display:'none'}}>
          <ListItemButton
            aria-label={t(`sections.projects.title`)}
            onClick={() => router.push(`/${lang}/${_PAGE_LINK_PROJECTS_}`)}
            sx={{color:router.asPath === _PAGE_LINK_PROJECTS_ ? 'var(--primary)' : 'inherit'}}
          >
            <ListItemIcon>
              <ProjectIcon color={
                router.asPath === _PAGE_LINK_PROJECTS_ ? 'var(--primary)' : 'inherit'
              } />
            </ListItemIcon>
            <ListItemText
            primaryTypographyProps={{
              color:router.asPath === _PAGE_LINK_PROJECTS_ ? 'var(--primary)' : 'inherit'
            }}
            primary={t(`sections.projects.title`)} />
          </ListItemButton>
        </ListItem>


        <ListItem disablePadding sx={{display: 'none'}}>
          <ListItemButton
            aria-label="education"
            onClick={() => toggleDrawer(true, t('sections.education.title'))}
            
          >
            <ListItemIcon>
              <EducationIcon color={'inherit'} />
            </ListItemIcon>
            <ListItemText primary={t('sections.education.title')} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{display: 'none'}}>
          <ListItemButton
            aria-label="skills"
            onClick={() => toggleDrawer(true, 'Soft skills')}
          >
            <ListItemIcon>
              <SoftSkillsIcon color={'inherit'} />
            </ListItemIcon>
            <ListItemText primary="Soft skills" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{display: 'none'}}>
          <ListItemButton
            aria-label="experience"
            onClick={() => toggleDrawer(true, 'Experience')}
          >
            <ListItemIcon>
              <ExperienceIcon color={'inherit'} />
            </ListItemIcon>
            <ListItemText primary="Experience" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{display: 'none'}}>
          <ListItemButton
            aria-label="projects"
            onClick={() => toggleDrawer(true, 'Projects')}
          >
            <ListItemIcon>
              <ProjectIcon color={'inherit'} />
            </ListItemIcon>
            <ListItemText primary="Projects" />
          </ListItemButton>
        </ListItem>


        <ListItem disablePadding sx={{display: 'none'}}>
          <ListItemButton
            aria-label="blogs"
            onClick={() => toggleDrawer(true, 'Blogs')}
          >
            <ListItemIcon>
              <BookOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Blogs" />
          </ListItemButton>
        </ListItem>
      </List>
<Stack px={2} py={7} sx={{
  
}}>
<Stack direction={'row'} alignItems={'center'} >
  <Typography fontWeight={'bold'} sx={{textTransform:'capitalize'}}>{`${t('langs.title')} : `}</Typography>
<SelectLangageComponent />
</Stack>
<Stack direction={'row'} alignItems={'center'}>
  <Typography fontWeight={'bold'} sx={{textTransform:'capitalize'}}>{`${t('theme')} : `}</Typography>
  <SwitchThemeComponent />
</Stack>
</Stack>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => toggleDrawer(false, '')}
      >
        <DrawerLayout />
      </Drawer>
    </Box>
  );
}

export default MobileSectionsBar;
