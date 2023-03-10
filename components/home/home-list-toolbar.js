import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    SvgIcon,
    Typography
  } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { NAMESPACE_LANGAGE_COMMON } from '../../constants';
  import { Download as DownloadIcon } from '../../icons/download';
  import { Search as SearchIcon } from '../../icons/search';
  import { Upload as UploadIcon } from '../../icons/upload';
  
  export const HomeListToolbar = (props) => {
    const { t, i18n } = useTranslation(NAMESPACE_LANGAGE_COMMON);

    return (
        <Box {...props}>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              m: 1
            }}
          >
            <Typography
              sx={{ m: 1 }}
              variant="h4"
            >
              {t('menuHome')}
            </Typography>
            <Box sx={{ m: 1, display: 'none' }}>
              <Button
                startIcon={(<UploadIcon fontSize="small" />)}
                sx={{ mr: 1 }}
              >
                Import
              </Button>
              <Button
                startIcon={(<DownloadIcon fontSize="small" />)}
                sx={{ mr: 1 }}
              >
                Export
              </Button>
              <Button
                color="primary"
                variant="contained"
              >
                Add products
              </Button>
            </Box>
          </Box>
          <Box sx={{ mt: 3, display: 'none' }}>
            <Card>
              <CardContent>
                <Box sx={{ maxWidth: 500 }}>
                  <TextField
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SvgIcon
                            fontSize="small"
                            color="action"
                          >
                            <SearchIcon />
                          </SvgIcon>
                        </InputAdornment>
                      )
                    }}
                    placeholder="Search cryptocurrency"
                    variant="outlined"
                  />
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      );
  }
  