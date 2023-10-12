import React from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Box } from '@mui/system';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import { GITHUB_LINK, LINKEDIN_LINK } from '../../_mocks_/_links_items_';
import { _PAGE_LINK_RESUME_, _MY_PROFILE_ } from '../../_mocks_/_settings_items_';
import { useTranslation } from 'next-i18next';
import { GithubIcon, LinkedinIcon, ResumeIcon } from '../icons/IconifiyIcons';
import { useLangMode } from '@/contexts/LangModeProvider';

function MobileLinksBar() {
  const {t} = useTranslation();
  const [lang] = useLangMode();
  return (
    <Box flex flexDirection="column">
      <Typography variant="h6">{_MY_PROFILE_.name}</Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginY: '10px',
        }}
      >
        <EmailIcon />
        <Typography variant="span" sx={{ marginLeft: '8px' }}>
          {_MY_PROFILE_.mail}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginY: '10px',
        }}
      >
        <PhoneIcon />
        <Typography variant="span" sx={{ marginLeft: '8px' }}>
          {_MY_PROFILE_.phone}
        </Typography>
      </Box>
      <List>
        <ListItem disablePadding>
          <a
            href={`/${lang}${_PAGE_LINK_RESUME_}`}
            target="_blank"
            rel="noreferrer"
            style={{ display: 'none' }}
          >
            <ListItemButton>
              <ListItemIcon>
                <ResumeIcon />
              </ListItemIcon>
              <ListItemText primary={t('seeMyCV')} />
            </ListItemButton>
          </a>
        </ListItem>
        <ListItem disablePadding>
          <a
            href={`mailto:${_MY_PROFILE_.mail}`}
            //target="_blank"
            rel="noreferrer"
          >
            <ListItemButton>
              <ListItemIcon>
                <EmailIcon fontSize='large' />
              </ListItemIcon>
              <ListItemText primary={t('sendMeMail')} />
            </ListItemButton>
          </a>
        </ListItem>
        <ListItem disablePadding>
          <a
            href={_MY_PROFILE_.socials.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            <ListItemButton>
              <ListItemIcon>
                <LinkedinIcon color='var(--blue-linkedin)' size={30} />
              </ListItemIcon>
              <ListItemText primary={t('profileLinkedin')} />
            </ListItemButton>
          </a>
        </ListItem>
        <ListItem disablePadding>
          <a
            href={_MY_PROFILE_.socials.github}
            target="_blank"
            rel="noreferrer"
          >
            <ListItemButton>
              <ListItemIcon>
                <GithubIcon size={35} />
              </ListItemIcon>
              <ListItemText primary={t('profileGithub')} />
            </ListItemButton>
          </a>
        </ListItem>
       
      </List>
    </Box>
  );
}

export default MobileLinksBar;
