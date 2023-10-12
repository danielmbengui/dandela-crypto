import {
  Box,
  Button,
  ButtonBase,
  Card,
  Grid,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';
import { Avatar } from '@mui/material';
import { grey } from '@mui/material/colors';
import { JavascriptIcon, SunIcon } from '../icons/IconifiyIcons';
import { useTranslation } from 'next-i18next';

function SkillCard({ name, skills, isDetailed }) {
  const {t} = useTranslation();

  return (
    <Card
    elevation={10}
      variant="outlined"
      sx={{
        px: 2,
        py: 3,
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 1,
        //border: isDetailed ? 'none' : '',
        background:'var(--background-card)',
        borderRadius:'10px',
      }}
      width={isDetailed ? '500px' : '100%'}
    >
      <div style={{textAlign:'center'}}>
      <Typography variant="h6">{t(name)}</Typography>
      </div>
      {skills.map(([name, val, icon], idx) => {
        return (
          <Grid
            container
            display="flex"
            flexDirection="row"
            key={idx}
            width="100%"
            alignItems="center"
            justifyContent={'center'}
            sx={{ pt: 3 }}
            
          >
            <Grid item xs={4} md={3}>
              <Typography sx={{fontWeight:'bold'}}>{t(name)}</Typography>
            </Grid>
            <Grid item xs sm md>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} spacing={1} pb={1}>
            {
                icon
              }
            <Typography variant="body2" color="text.secondary">{`${Math.round(
          val,
        )}%`}</Typography>
            </Stack>
            <LinearProgress
                  variant="determinate"
                  value={val}
                  sx={{ borderRadius: 2 }}
                />
              
            </Grid>
          </Grid>
        );
      })}
    </Card>
  );
}

export default SkillCard;
