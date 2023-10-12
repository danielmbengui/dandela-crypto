import React, { useRef, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { ChatbotIcon, SkillsIcon } from '../icons/IconifiyIcons';
import { Avatar, Button, Popover, Stack } from '@mui/material';
import SelectLangageComponent from "@/components/contexts/SelectLangageComponent";
import SwitchThemeComponent from "@/components/contexts/SwitchThemeComponent";
import StyledBadge from '../atoms/StyledBadge';
import { motion, AnimatePresence } from "framer-motion"
import { grey } from '@mui/material/colors';
import { _PAGE_LINK_CHAT_BOT_, _PAGE_LINK_RESUME_, _PAGE_LINK_SKILLS_, _MY_PROFILE_ } from '@/_mocks_/_settings_items_';
import { PhonelinkLockOutlined } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useLangMode } from '@/contexts/LangModeProvider';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function DrawerComponent() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const avatarRef = useRef(null);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const router = useRouter();
  const {t} = useTranslation();
  const [lang,] = useLangMode();

  const handlePopoverClose = () => {
    setPopoverOpen(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} sx={{width:'100%', background:'yellow'}}>
            
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
      <Avatar src="/img/skills/logo.gif" sx={{ width: 40, height: 40, background:'var(--primary)' }} />
    </StyledBadge>
      </IconButton>
      <Popover
    open={popoverOpen}
    onClose={handlePopoverClose}
    anchorEl={avatarRef.current}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    PaperProps={{
      sx: {
        border: 1,
        borderColor: grey[200],
        padding: 2,
        marginLeft: 2,
        borderRadius: '5%',
      },
    }}
    elevation={0}
  >
    <Box flex flexDirection="column">
      <Typography variant="h6">{_MY_PROFILE_.name}</Typography>
      <Box
        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
        <MailIcon />
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
        <PhonelinkLockOutlined />
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
      >
        <Button>{`See my resume`}</Button>
      </a>
      <a
        href={_PAGE_LINK_CHAT_BOT_}
        //target="_blank"
        rel="noreferrer"
      >
        <Button variant='contained'>{`Chat with me`}</Button>
      </a>
    </Box>
  </Popover>
            
            <div>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                //edge="start"
                sx={{
                  //marginRight: 5,
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
            </div>
 
            <Typography variant="h6" noWrap component="div">
              Mini variant drawer
            </Typography>
            <Stack direction={'row'} spacing={1} justifyContent={'center'} alignItems={'center'} sx={{
              //background: 'red',
              //mx:'auto',
              //width: '100%'
            }}>
              <SelectLangageComponent
              />
              <SwitchThemeComponent />
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}
        onMouseEnter={handleDrawerOpen}
        onMouseLeave={handleDrawerClose}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />



        <ListItem disablePadding 
        sx={{ 
          py: 3,
          display: 'block', 
          "&:hover" : {
                      color:'var(--primary)'
                    } }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  color: router.asPath === _PAGE_LINK_CHAT_BOT_ ? 'var(--primary)' : grey[600],
                  //background:'red'
                  "&:hover" : {
                    //background:'red',
                    color:'var(--primary)',
                    fontWeight:'bold',
                  }
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color:'inherit'
                  }}
                >
                  <ChatbotIcon
                  color={'inherit'}
                  size={30}
                  
                  />
                </ListItemIcon>
                <ListItemText primary={'Chat'} sx={{fontWeight:'inherit', opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
        <Divider />
        <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color:'inherit'
                  }}
                >
                  <SkillsIcon
                  color={router.asPath === _PAGE_LINK_SKILLS_ ? 'var(--primary)' : 'inherit'}
                  size={24} />
                </ListItemIcon>
                <ListItemText primary={'Chat'} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  "&:hover" : {
                    //background:'red',
                    color:'blue'
                  }
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color:'inherit'
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Inbox', 'Chat', 'Box'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <ChatbotIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
          enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
          Convallis convallis tellus id interdum velit laoreet id donec ultrices.
          Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
          nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
          leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
          feugiat vivamus at augue. At augue eget arcu dictum varius duis at
          consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
          sapien faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
          eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
          neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
          tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
          sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
          tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
          gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
          et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
          tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </Box>
    </Box>
  );
}