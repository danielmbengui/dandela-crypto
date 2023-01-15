import React from 'react';
import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { CryptoComponent } from '../components/dashboard/CryptoComponent';
import { cryptocurrencies } from '../__mocks__/cryptocurrencies';
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
