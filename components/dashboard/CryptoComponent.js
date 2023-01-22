import React, { useState, useEffect } from 'react';
import { Avatar, Box, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import MoneyIcon from '@mui/icons-material/Money';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { NAMESPACE_LANGAGE_COMMON, PAGE_LINK_COIN } from '../../constants';
import { myLoader } from '../../lib/ImageLoader';
import { roundNumber } from '../../lib/func/func';
import Link from 'next/link';
import createPalette from '@mui/material/styles/createPalette';

/*

  */

export const CryptoComponent = (props) => {
  const { t, i18n } = useTranslation(NAMESPACE_LANGAGE_COMMON);

  const { cryptocurrency, currency, bgCrypto } = props;
  const [price, setPrice] = useState(0);
  const [changePercent, setChangePercent] = useState(0);
  useEffect(() => {
    setPrice(roundNumber(cryptocurrency.current_price));
    setChangePercent(roundNumber(cryptocurrency.price_change_percentage_24h));
  }, [currency]);

  return (
   <Link href={`${PAGE_LINK_COIN}/${cryptocurrency.id}`} style={{textDecoration:'none', cursor:'pointer'}}>
    <Card
      sx={{ height: '100%', }}
      {...props}
    >
      <CardContent>
        <Grid
          container
          //spacing={3}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid item xs={12}>
            <Typography
              color="text.primary"
              variant="subtitle1"
            >
              {cryptocurrency.name} {`(${cryptocurrency.symbol.toString().toUpperCase()})`}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              color="text.primary"
              variant="h4"
            >
              {price}<br />
              {currency.symbol}
            </Typography>
          </Grid>
          <Grid container mt={3} justifyContent={'center'} alignItems={'center'}>
            <Grid item sx={{ textAlign: 'center' }}>
              <Avatar
                sx={{
                  backgroundColor: bgCrypto ? bgCrypto : 'transparent',
                  height: 56,
                  width: 56
                }}
              >
                {/* <MoneyIcon /> */}
                <Image
                  src={cryptocurrency.image}
                  alt={`the cryptocurrency logo of ${cryptocurrency.name} (${cryptocurrency.symbol}) provided by CoinGecko`}
                  width={56}
                  height={56}
                  loader={myLoader}
                  quality={100}
                  priority
                />
              </Avatar>
            </Grid>
          </Grid>
        </Grid>
        <Box
          sx={{
            pt: 2,
            display: 'flex',
            alignItems: 'center'
          }}
        >

          {
            cryptocurrency.price_change_percentage_24h < 0 ?
             <ArrowDownwardIcon color="error" /> :
             <ArrowUpwardIcon color="success" />
          }

          <Typography
            color={cryptocurrency.price_change_percentage_24h >= 0 ? "success.main" : "error.main"}
            sx={{
              mr: 1,
            }}
          //variant="body2"
          >
            {changePercent}%
          </Typography>
          <Typography
            color="text.primary"
            variant="caption"
          >
            {t('last_24_h')}
          </Typography>
        </Box>
      </CardContent>
    </Card>
   </Link>
  );
}
