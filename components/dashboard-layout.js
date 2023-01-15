import { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { AuthGuard } from './auth-guard';
import { DashboardNavbar } from './dashboard-navbar';
import { DashboardSidebar } from './dashboard-sidebar';

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  //paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 280
  }
}));

export const DashboardLayout = (props) => {
  const { children } = props;
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <AuthGuard>
      <DashboardLayoutRoot>
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            width: '100%'
          }}
        >
          {children}
          <Grid container alignItems={"center"} justifyContent={"center"} py={20}>
            <Grid item xs={10} sx={{textAlign:'center'}}>
            <Typography>
            ATTENTION : Les investissements en cryptomonnaie comportent des risques élevés. Veuillez vous 
            informer adéquatement avant de prendre une décision d'investissement et n'investissez pas plus que 
            vous ne pouvez vous permettre de perdre. Les informations contenues sur ce site web sont uniquement 
            à des fins d'information générale et ne constituent en aucun cas des conseils en investissement.
            </Typography>
            </Grid>

          </Grid>
        </Box>
      </DashboardLayoutRoot>
      {
        /* <DashboardNavbar onSidebarOpen={() => setSidebarOpen(true)} /> */
      }
      <DashboardSidebar
        onClose={() => setSidebarOpen(false)}
        open={isSidebarOpen}
      />
    </AuthGuard>
  );
};
