import React from 'react';
import { Container, Grid, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { Bounce } from 'react-awesome-reveal';
import { AngolanIcon, EnglishIcon, SwissIcon } from '../icons/FlagIcons';
import { _MY_PROFILE_, _NEXTJS_LINK_, _PAGE_LINK_RESUME_, _WEBSITE_ADDRESS_ } from '@/_mocks_/_settings_items_';
import FooterComponent from '../footer/FooterComponent';

export default function LanguagesComponent() {
  const { t } = useTranslation();

  return (
    <Container sx={{
      height: '100vh', position: 'relative', overflowY: 'scroll',
    }}
    >
      <Grid
        container
        justifyContent={'center'}
        spacing={5}
        pt={5}
        pb={{ xs: 20, sm: 10 }}
      >
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <Stack >
            <Bounce triggerOnce duration={2500}><Typography
              fontSize={26}
              fontWeight={'bold'}
              sx={{
                //background:theme.palette.primary.main, 
                //opacity:0.8, 
                margin: 'auto',
                px: 1,
                //borderRadius:1.5,
                color: 'var(--text)'
              }}>{t('sections.skills.langs.title')}</Typography></Bounce>
          </Stack>
        </Grid>

        <Grid item xs={12} sm={10}>
          <Grid container justifyContent={'center'} sx={{ width: '100%', }}>
            <Grid item xs={12}>
              <div className="section inset" >
                <div className="accordion" id="accordionExample2" sx={{ width: '100%', border: '3px solid yellow' }}>
                  <div className="accordion-item" style={{ background: 'var(--background-menu)' }}>
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#accordion01">
                        <Stack direction={'row'} alignItems={'center'} spacing={1}><SwissIcon /><Typography>{t('sections.skills.langs.fr.name')}</Typography></Stack>
                      </button>
                    </h2>
                    <div id="accordion01" className="accordion-collapse collapse" data-bs-parent="#accordionExample2">
                      <div className="accordion-body" style={{ textAlign: 'justify' }}>
                        {t('sections.skills.langs.fr.description')}
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item" style={{ background: 'var(--background-menu)' }}>
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#accordion02">
                        <Stack direction={'row'} alignItems={'center'} spacing={1}><AngolanIcon /><Typography>{t('sections.skills.langs.ao.name')}</Typography></Stack>

                      </button>
                    </h2>
                    <div id="accordion02" className="accordion-collapse collapse" data-bs-parent="#accordionExample2">
                      <div className="accordion-body" style={{ textAlign: 'justify' }}>
                        {t('sections.skills.langs.ao.description')}
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item" style={{ background: 'var(--background-menu)' }}>
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#accordion03">
                        <Stack direction={'row'} alignItems={'center'} spacing={1}><EnglishIcon /><Typography>{t('sections.skills.langs.en.name')}</Typography></Stack>
                      </button>
                    </h2>
                    <div id="accordion03" className="accordion-collapse collapse" data-bs-parent="#accordionExample2">
                      <div className="accordion-body" style={{ textAlign: 'justify' }}>
                        {t('sections.skills.langs.en.description')}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <FooterComponent />
        </Grid>
      </Grid>
    </Container>
  );
}