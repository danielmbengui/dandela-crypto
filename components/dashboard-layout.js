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
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 280
  }
}));

export const DashboardLayout = (props) => {
  const { children, langage, setLangage } = props;
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
            CAUTION: Investing in cryptocurrency carries high risks. Please
            adequately inform before making an investment decision and do not invest more than
            you can't afford to loose. The information contained on this website is only
            for general information purposes and does not constitute investment advice.
            </Typography>
            </Grid>

          </Grid>
        </Box>
      </DashboardLayoutRoot>
      {
        /* <DashboardNavbar onSidebarOpen={() => setSidebarOpen(true)} /> */
      }
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
