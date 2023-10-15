import React, { useState } from 'react';
import { Box, Divider, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { AuthGuard } from './auth-guard';
import { DashboardNavbar } from './dashboard-navbar';
import { DashboardSidebar } from './dashboard-sidebar';
import { useTranslation } from 'next-i18next';
import { NAMESPACE_LANGAGE_COMMON, PAGE_LINK_PRIVACY_POLICY, PAGE_LINK_TERMS, ajouterRetourLigneDepuisJson } from '../constants';
import Link from 'next/link';

const DashboardLayoutRoot = styled('div')(({ theme, hidenavbar }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: hidenavbar == 'true' ? 0 : 280
  }
}));

export const DashboardLayout = (props) => {
  const { children, langage, setLangage, hideNavBar } = props;
  const { t, i18n } = useTranslation([NAMESPACE_LANGAGE_COMMON]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);



  return (
    <AuthGuard>
      <DashboardLayoutRoot hidenavbar={hideNavBar.toString()}>
        <Box
          sx={{
            //display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            width: '100%',
            //py:40,
          }}
        >
          {children}
          <Grid container alignItems={"center"} justifyContent={"center"} pt={10}>
            <Grid item xs={10} sx={{ textAlign: 'center' }}>
              <Typography variant='body2' fontWeight={'bold'} mb={2} sx={{ textAlign: 'center' }}>
                {`${t('disclaimer.title')}`}
              </Typography>
              <Typography variant='body2' fontWeight={'normal'} mb={1} sx={{ textAlign: 'center' }}>
                {`${t('disclaimer.paragraph1')}`}
              </Typography>
              <Typography variant='body2' fontWeight={'normal'} mb={1} sx={{ textAlign: 'center' }}>
                {`${t('disclaimer.paragraph2')}`}
              </Typography>
              <Typography variant='body2' fontWeight={'normal'} mb={1} sx={{ textAlign: 'center' }}>
                {`${t('disclaimer.paragraph3')}`}
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{
            borderColor: '#2D3748',
            //my: 3
          }}
          />
          <Grid container alignItems={"center"} justifyContent={"center"} pt={3} spacing={3}>
            <Grid item sx={{ textAlign: 'center' }}>
              <Link href={PAGE_LINK_TERMS} legacyBehavior sx={{ cursor: 'pointer' }}>
                <a>
                  <Typography
                    color="neutral.600"
                    variant="subtitle2"
                    sx={{
                      textDecoration: 'underline', textDecorationColor: 'neutral.600', '&:hover': {
                        color: 'primary.main',
                        textDecorationColor: 'primary.main',
                        fontWeight: 'bold'
                      }
                    }}
                  >
                    {t('menuUseTerms')}
                  </Typography>
                </a>
              </Link>
            </Grid>
            <Grid item sx={{ textAlign: 'center' }}>
              <Link href={PAGE_LINK_PRIVACY_POLICY} legacyBehavior sx={{ cursor: 'pointer' }}>
                <a>
                  <Typography
                    color="neutral.600"
                    variant="subtitle2"
                    sx={{
                      textDecoration: 'underline', textDecorationColor: 'neutral.600', '&:hover': {
                        color: 'primary.main',
                        textDecorationColor: 'primary.main',
                        fontWeight: 'bold'
                      }
                    }}
                  >
                    {t('menuPrivacyPolicy')}
                  </Typography>
                </a>
              </Link>
            </Grid>
          </Grid>
          <Grid container alignItems={"center"} justifyContent={"center"} pt={5}>
            <Grid sx={{ textAlign: 'center' }}>
              <Typography
                color="neutral.600"
                variant="subtitle2"
                sx={{ fontWeight: 'bold' }}
              >
                {new Date().getFullYear() == 2023 ? `©${new Date().getFullYear()} Dandela` : `©2023 - ${new Date().getFullYear()} Dandela`}
              </Typography>
            </Grid>
          </Grid>
          <Grid container alignItems={"center"} justifyContent={"center"} pt={0} pb={5}>
            <Grid sx={{ textAlign: 'center' }}>
              <Typography
                color="neutral.600"
                variant="subtitle2"
                sx={{ fontWeight: 'normal' }}
              >
                {t('all_rights_reserved')}          </Typography>
            </Grid>
          </Grid>



        </Box>
      </DashboardLayoutRoot>

      {
        <DashboardNavbar
          //isSidebarOpen={isSidebarOpen}
          hideNavBar={hideNavBar}
          onSidebarOpen={() => setSidebarOpen(true)}
          onClose={() => setSidebarOpen(false)}
          langage={langage} setLangage={setLangage}
        //currency={currency} setCurrency={setCurrency}
        />
      }

      {
        !hideNavBar && <DashboardSidebar
          //hideNavBar={hideNavBar}
          langage={langage}
          onClose={() => setSidebarOpen(false)}
          open={isSidebarOpen}
        />
      }




    </AuthGuard>
  );
};
