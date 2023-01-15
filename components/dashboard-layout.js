import React, { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { AuthGuard } from './auth-guard';
import { DashboardNavbar } from './dashboard-navbar';
import { DashboardSidebar } from './dashboard-sidebar';
import { useTranslation } from 'next-i18next';
import { NAMESPACE_LANGAGE_COMMON } from '../constants';

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
  const { children, langage, setLangage } = props;
  const { t, i18n } = useTranslation([NAMESPACE_LANGAGE_COMMON]);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <AuthGuard>
      <DashboardLayoutRoot>
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          {children}
          <Grid container alignItems={"center"} justifyContent={"center"} py={20}>
            <Grid item xs={10} sx={{textAlign:'center'}}>
            <Typography>
            {`${t('message_caution')}`}
            </Typography>
            </Grid>

          </Grid>
        </Box>
      </DashboardLayoutRoot>

       <DashboardNavbar 
      onSidebarOpen={() => setSidebarOpen(true)}
      langage={langage} setLangage={setLangage}
      />
       <DashboardSidebar
        onClose={() => setSidebarOpen(false)}
        open={isSidebarOpen}
      />
     
   
    </AuthGuard>
  );
};
