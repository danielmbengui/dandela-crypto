import React, {useState, useEffect} from 'react';
import { Avatar, Box, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import MoneyIcon from '@mui/icons-material/Money';
import Image from 'next/image';

/*

  */

export const CryptoComponent = (props) => {
    const {cryptocurrency, currency, bgCrypto} = props;
  const [price, setPrice] = useState(0);
  const [changePercent, setChangePercent] = useState(0);

  useEffect(() => {
    async function init() {
      const url = `https://api.coingecko.com/api/v3/simple/price?ids=${cryptocurrency.id}&vs_currencies=${currency.name}&include_24hr_change=true`;
      const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        "Access-Control-Allow-Origin": "*",
        //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*",

          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        //redirect: 'follow', // manual, *follow, error
        //referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        //body: JSON.stringify(data) // body data type must match "Content-Type" header
      }).then((resp) => {
        //console.log("BITCOIN price usd", resp.json());
        return (resp.json())
      });
      console.log("BITCOIN price usd", response);
      setPrice(response[cryptocurrency.id][currency.name]);
      setChangePercent(response[cryptocurrency.id][`${currency.name}_24h_change`]);
      //usd_24h_change
    }
    
    init();
  });

  return (
    <Card
      sx={{ height: '100%' }}
      {...props}
    >
      <CardContent>
        <Grid
          container
          //spacing={3}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="overline"
            >
            {cryptocurrency.name} {`(${cryptocurrency.symbol.toString().toUpperCase()})`}
            </Typography>
            <Typography
              color="textPrimary"
              variant="h4"
            >
              {currency.symbol}{price}
            </Typography>
          </Grid>
          <Grid container mt={3} justifyContent={'center'} alignItems={'center'}>
          <Grid item sx={{textAlign: 'center'}}>
          <Avatar
              sx={{
                backgroundColor: bgCrypto ? bgCrypto : 'transparent',
                height: 56,
                width: 56
              }}
            >
              {/* <MoneyIcon /> */}
              <Image
              src={`/static/images/crypto/${cryptocurrency.id}.png`}
              layout='fill'
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
            changePercent < 0 && <ArrowDownwardIcon color="error" />
          }

          {
            changePercent >= 0 && <ArrowUpwardIcon color="success" />
          }
          <Typography
            color={changePercent >= 0 ? "success.main" : "error.main"}
            sx={{
              mr: 1,
            }}
            //variant="body2"
          >
            {Math.round(changePercent)}%
          </Typography>
          <Typography
            color="textSecondary"
            variant="caption"
          >
            Dernier 24h
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
