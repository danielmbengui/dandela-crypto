import { useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Button, Divider, Drawer, Grid, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Selector as SelectorIcon } from '../icons/selector';
import { Logo } from './logo';
import { NavItem } from './nav-item';
import RepeatIcon from '@mui/icons-material/Repeat';
import Image from 'next/image';
import HomeIcon from '@mui/icons-material/Home';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import { useTranslation } from 'next-i18next';
import { PAGE_LINK_LIST_CRYPTO_CURRENCIES, PAGE_LINK_CRYPTO_CONVERTER, PAGE_LINK_HOME, NAMESPACE_LANGAGE_COMMON, PAGE_LINK_MARKET, PAGE_LINK_TERMS, PAGE_LINK_PRIVACY_POLICY } from '../constants';
import { myLoader } from '../lib/ImageLoader';
import InsightsIcon from '@mui/icons-material/Insights';
import { ResumeIcon } from '../icons/IconMaterialUi';
import Link from 'next/link';

export const DashboardSidebar = (props) => {
  const { t } = useTranslation(NAMESPACE_LANGAGE_COMMON);
  const { open, onClose, langage, hideNavBar, } = props;
  const theme = useTheme();
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false
  });

  const items = [
    {
      href: PAGE_LINK_HOME,
      icon: (<HomeIcon fontSize="small"/>),
      title: t('menuHome'),
    },
  ];


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
              href={PAGE_LINK_HOME}
              passHref
              legacyBehavior
              locale={langage}
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
              backgroundColor: 'primary.main',
              //opacity: 0.85,
              //cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              px: 3,
              py: '11px',
              borderRadius: 1
            }}
          >
            <div>
              <Typography
                color="white.main"
                variant="subtitle1"
              >
                {'Dandela'}
              </Typography>
              <Typography
                color={'neutral.300'}

                variant="subtitle1"
              >
                {t('Bisso Na Bisso')}
              </Typography>
            </div>            
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
          langage={langage}
            key={item.title}
            icon={item.icon}
            href={item.href}
            title={item.title}
          />
        ))}
      </Box>
      
      <Box
        sx={{
          px: 2,
          py: 3
        }}
      >

<Stack
          sx={{
            display: 'flex',
            mt: 5,
            //mx: 'auto',
            width: '100%',
            '& img': {
              width: '100%'
            }
          }}
        >
          <Link href={PAGE_LINK_TERMS} legacyBehavior sx={{cursor:'pointer'}}>
            <a target='_blank' >
            <Typography
            color="neutral.600"
            variant="subtitle2"
            sx={{textDecoration:'underline', textDecorationColor:'neutral.600', '&:hover': {
              color:'primary.main',
              textDecorationColor:'primary.main',
              fontWeight:'bold'
            }}}
          >
            {t('menuUseTerms')}
          </Typography>
            </a>
            </Link>
            <Link href={PAGE_LINK_PRIVACY_POLICY} legacyBehavior sx={{cursor:'pointer'}}>
            <a target='_blank' >
            <Typography
            color="neutral.600"
            variant="subtitle2"
            sx={{textDecoration:'underline', textDecorationColor:'neutral.600', '&:hover': {
              color:'primary.main',
              textDecorationColor:'primary.main',
              fontWeight:'bold'
            }}}
          >
            {t('menuPrivacyPolicy')}
          </Typography>
            </a>
            </Link>

         
          
        </Stack>

        <Box
          sx={{
            display: 'flex',
            mt: 5,
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
            sx={{ fontWeight: 'bold' }}
          >
            {new Date().getFullYear() == 2023 ? `©${new Date().getFullYear()} Dandela` : `©2023 - ${new Date().getFullYear()} Dandela`}
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
            variant="body2"
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
            backgroundColor: 'background.default',
            //bgcolor:'red',
            color: '#FFFFFF',
            width: 280,
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
          backgroundColor: 'background.default',
          //color: '#FFFFFF',
          //        border: "5px red solid",
          display: 'flex',
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
