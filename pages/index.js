import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import { Budget } from '../components/dashboard/budget';
import { LatestOrders } from '../components/dashboard/latest-orders';
import { LatestProducts } from '../components/dashboard/latest-products';
import { Sales } from '../components/dashboard/sales';
import { TasksProgress } from '../components/dashboard/tasks-progress';
import { TotalCustomers } from '../components/dashboard/total-customers';
import { TotalProfit } from '../components/dashboard/total-profit';
import { TrafficByDevice } from '../components/dashboard/traffic-by-device';
import { DashboardLayout } from '../components/dashboard-layout';
import { BitcoinComponent } from '../components/dashboard/BitcoinComponent';
import { EthereumComponent } from '../components/dashboard/EthereumComponent';
import { CryptoComponent } from '../components/dashboard/CryptoComponent';
import { cryptocurrencies } from '../__mocks__/cryptocurrencies';
import Script from 'next/script';
import { HomeListToolbar } from '../components/home/home-list-toolbar';

const Page = () => (
  <>
    <Head>
      <title>
        Home | Dandela
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 3
      }}
    >
      <HomeListToolbar />
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >

          {
            cryptocurrencies.map((cryptocurrency, index) => {
              return (
                <Grid
                  item
                  lg={3}
                  sm={6}
                  xl={3}
                  xs={12}
                  key={cryptocurrency.name + index}
                >
                  <CryptoComponent cryptocurrency={cryptocurrency} currency={{ name: "usd", symbol: "$" }} />
                </Grid>
              )
            })
          }
        </Grid>
        
        {
          /*
<Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <CryptoComponent crypto={"bitcoin"} currency={{ name: "usd", symbol: "$" }} />
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <CryptoComponent crypto={"ethereum"} currency={{ name: "usd", symbol: "$" }} />
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <CryptoComponent crypto={"binancecoin"} currency={{ name: "usd", symbol: "$" }} />

          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <CryptoComponent crypto={"tether"} currency={{ name: "usd", symbol: "$" }} />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <Sales />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <TrafficByDevice sx={{ height: '100%' }} />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <LatestProducts sx={{ height: '100%' }} />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <LatestOrders />
          </Grid>
        </Grid>
          */
        }
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
