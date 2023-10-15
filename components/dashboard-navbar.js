import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { AppBar, Avatar, Badge, Box, IconButton, Stack, Toolbar, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Bell as BellIcon } from '../icons/bell';
import { UserCircle as UserCircleIcon } from '../icons/user-circle';
import { Users as UsersIcon } from '../icons/users';
import { AccountPopover } from './account-popover';
import MaterialUISwitch from './switch-theme-mode';
import LanguagePopover from './langage-popover';
import Image from 'next/image';
import { myLoader } from '../lib/ImageLoader';



export const DashboardNavbar = (props) => {
  const { onSidebarOpen, langage, setLangage, hideNavBar, ...other } = props;
  const settingsRef = useRef(null);
  const [openAccountPopover, setOpenAccountPopover] = useState(false);

  const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
    backgroundColor: hideNavBar ? theme.palette.background.paper : theme.palette.background.paper,
    boxShadow: hideNavBar ? theme.shadows[0] : theme.shadows[3]
  }));

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          //display:hideNavBar ? 'none' : 'block',
          left: {
            lg: hideNavBar ? 0 : 280
          },
          width: {
            lg: hideNavBar ? '100%' : 'calc(100% - 280px)'
          }
        }}
        {...other}>
          
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: 'inline-flex',
                lg: 'none'
              }
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <div style={{marginLeft:5, display:'none'}}>
          <Image 
src={'/static/images/logos/logo.png'}
alt={"the logo of Dandela created by M. Dandela"}
width={32}
height={25}
loader={myLoader}
quality={100}
priority
          />
          </div>

          <div style={{ mx: 10 }}>
          <LanguagePopover 
          langage={langage} setLangage={setLangage}
          />
          </div>
          <div style={{ marginLeft: 30 }}>
          <MaterialUISwitch />
          </div>

          <div style={{display:'none'}}>
          <Tooltip title="Search">
            <IconButton sx={{ ml: 1 }}>
              <SearchIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Contacts" >
            <IconButton sx={{ ml: 1 }}>
              <UsersIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Notifications">
            <IconButton sx={{ ml: 1 }}>
              <Badge
                badgeContent={4}
                color="primary"
                variant="dot"
              >
                <BellIcon fontSize="small" />
              </Badge>
            </IconButton>
          </Tooltip>
          <Avatar
            onClick={() => setOpenAccountPopover(true)}
            ref={settingsRef}
            sx={{
              cursor: 'pointer',
              height: 40,
              width: 40,
              ml: 1
            }}
            src="/static/images/avatars/avatar_1.png"
          >
            <UserCircleIcon fontSize="small" />
          </Avatar>
          </div>
          
          
        </Toolbar>
      </DashboardNavbarRoot>
      <AccountPopover
        anchorEl={settingsRef.current}
        open={openAccountPopover}
        onClose={() => setOpenAccountPopover(false)}
      />
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func
};
