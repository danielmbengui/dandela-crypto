import { useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Button, Divider, Drawer, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { ChartBar as ChartBarIcon } from '../icons/chart-bar';
import { Cog as CogIcon } from '../icons/cog';
import { Lock as LockIcon } from '../icons/lock';
import { Selector as SelectorIcon } from '../icons/selector';
import { ShoppingBag as ShoppingBagIcon } from '../icons/shopping-bag';
import { User as UserIcon } from '../icons/user';
import { UserAdd as UserAddIcon } from '../icons/user-add';
import { Users as UsersIcon } from '../icons/users';
import { XCircle as XCircleIcon } from '../icons/x-circle';
import { Logo } from './logo';
import { NavItem } from './nav-item';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RepeatIcon from '@mui/icons-material/Repeat';
import Image from 'next/image';
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import MaterialUISwitch from './switch-theme-mode';
import { useTranslation } from 'next-i18next';
import { NAMESPACE_LANGAGE_COMMON } from '../constants';

export const DashboardSidebar = (props) => {
  const {t} = useTranslation(NAMESPACE_LANGAGE_COMMON);
  const { open, onClose } = props;
  const theme = useTheme();


const items = [
  {
    href: '/',
    icon: (<HomeIcon fontSize="small" />),
    title: t('menuHome'),
  },
  {
    href: '/cryptoconverter',
    icon: (<RepeatIcon fontSize="small" />),
    title: t('menuCryptoConverter')
  },
/*
  {
    href: '/converttocrypto',
    icon: (<ChartBarIcon fontSize="small" />),
    title: 'FIAT to Crypto'
  },
  {
    href: '/customers',
    icon: (<UsersIcon fontSize="small" />),
    title: 'Customers'
  },
  {
    href: '/products',
    icon: (<ShoppingBagIcon fontSize="small" />),
    title: 'Products'
  },
  {
    href: '/account',
    icon: (<UserIcon fontSize="small" />),
    title: 'Account'
  },
  {
    href: '/settings',
    icon: (<CogIcon fontSize="small" />),
    title: 'Settings'
  },
  {
    href: '/login',
    icon: (<LockIcon fontSize="small" />),
    title: 'Login'
  },
  {
    href: '/register',
    icon: (<UserAddIcon fontSize="small" />),
    title: 'Register'
  },
  {
    href: '/404',
    icon: (<XCircleIcon fontSize="small" />),
    title: 'Error'
  }
*/
];
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false
  });

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  const content = (
    <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          
        }}
      >
        <div>
          <Box sx={{ p: 3 }}>
            <Stack direction={'row'}>
            <NextLink
              href="/"
              passHref
            >
              <a>
                <Logo
                  sx={{
                    height: 42,
                    width: 42
                  }}
                />
              </a>
            </NextLink>
            </Stack>
          </Box>
          <Box sx={{ px: 2 }}>
            <Box
              sx={{
                alignItems: 'center',
                backgroundColor: theme.palette.mode === 'light' ? 'primary.main' : 'rgba(255, 255, 255, 0.09)',
                opacity:0.85,
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                px: 3,
                py: '11px',
                borderRadius: 1
              }}
            >
              <div>
                <Typography
                  color="white"
                  variant="subtitle1"
                >
                  {'Dandela'}
                </Typography>
                <Typography
                  color={theme.palette.mode === 'light' ? "neutral.400" : "neutral.500"}
                  variant="subtitle1"
                >
                  {t('menuCryptoConverter')}
                </Typography>
              </div>
              <SelectorIcon
                sx={{
                  color: 'neutral.500',
                  width: 14,
                  height: 14
                }}
              />
            </Box>
          </Box>
        </div>
        <Divider sx={{
            borderColor: '#2D3748',
            my: 3
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>
        <Divider sx={{ borderColor: '#2D3748' }} />
        <Box
          sx={{
            px: 2,
            py: 3
          }}
        >
          <Typography
            color="text.primary"
            variant="subtitle2"
          >
            {t('data_provided_by_coingecko')}
          </Typography>
          <NextLink href={"https://www.coingecko.com/en/api/documentation"}>
          <a target="_blank" style={{textDecoration: 'none'}}>
          <Typography
            color="primary.main"
            variant="body2"
          >
            {t('explore_the_api')}
          </Typography>
          </a>
          </NextLink>
          <Box
            sx={{
              display: 'flex',
              mt: 2,
              //mx: 'auto',
              width: '160px',
              '& img': {
                width: '100%'
              }
            }}
          >
            <NextLink 
            href="https://www.coingecko.com/"
            >
              <a target={"_blank"}>
              <Image 
            alt="CoinGecko logo"
            src="/static/images/sponsors/coingecko.png"
            width={50}
            height={50}
            priority
            //layout='responsive'
            />
              </a>
            </NextLink>
          </Box>
          <Box
            sx={{
              display: 'flex',
              mt: 20,
              //mx: 'auto',
              width: '160px',
              '& img': {
                width: '100%'
              }
            }}
          >
            <Typography
                  color="neutral.600"
                  variant="subtitle2"
                  sx={{fontWeight:'bold'}}
                >
                  {`© ${new Date().getFullYear()} Dandela`}
                </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              //mx: 'auto',
              width: '160px',
              '& img': {
                width: '100%'
              }
            }}
          >
                <Typography
                  color="neutral.600"
                  variant="subtitle3"
                >
                  {t('all_rights_reserved')}
                </Typography>
          </Box>
        </Box>
      </Box>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            //backgroundColor: 'neutral.900',
            backgroundColor: 'background.menu',
            //bgcolor:'red',
            color: '#FFFFFF',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
   
      PaperProps={{
        sx: {
          backgroundColor: 'background.menu',
          //color: '#FFFFFF',
  //        border: "5px red solid",
          width: 280
        }
      }}
      sx={{ 
        zIndex: (theme) => theme.zIndex.appBar + 100,
      }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
