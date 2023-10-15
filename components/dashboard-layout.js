import React, { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { AuthGuard } from './auth-guard';
import { DashboardNavbar } from './dashboard-navbar';
import { DashboardSidebar } from './dashboard-sidebar';
import { useTranslation } from 'next-i18next';
import { NAMESPACE_LANGAGE_COMMON, ajouterRetourLigneDepuisJson } from '../constants';

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 280
  }
}));

export const DashboardLayout = (props) => {
  const { children, langage, setLangage, } = props;
  const { t, i18n } = useTranslation([NAMESPACE_LANGAGE_COMMON]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AuthGuard>
      <DashboardLayoutRoot>
      <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            width: '100%',
            //py:40,
          }}
        >
          {children}
          <Grid container alignItems={"center"} justifyContent={"center"} py={20}>
            <Grid item xs={10} sx={{textAlign:'center'}}>
            <Typography variant='body2' fontWeight={'bold'} mb={2} sx={{textAlign:'center'}}>
            {`${t('disclaimer.title')}`}
            </Typography>
            <Typography variant='body2' fontWeight={'normal'} mb={1} sx={{textAlign:'center'}}>
            {`${t('disclaimer.paragraph1')}`}
            </Typography>
            <Typography variant='body2' fontWeight={'normal'} mb={1} sx={{textAlign:'center'}}>
            {`${t('disclaimer.paragraph2')}`}
            </Typography>
            <Typography variant='body2' fontWeight={'normal'} mb={1} sx={{textAlign:'center'}}>
            {`${t('disclaimer.paragraph3')}`}
            </Typography>
            </Grid>
          </Grid>
        </Box>
      </DashboardLayoutRoot>

       <DashboardNavbar 
       //isSidebarOpen={isSidebarOpen}
      onSidebarOpen={() => setSidebarOpen(true)}
      onClose={() => setSidebarOpen(false)}
      langage={langage} setLangage={setLangage}
      //currency={currency} setCurrency={setCurrency}
      />
       <DashboardSidebar
       langage={langage}
        onClose={() => setSidebarOpen(false)}
        open={isSidebarOpen}
      />
     
   
    </AuthGuard>
  );
};
