import PropTypes from 'prop-types';
import { styled, useTheme} from '@mui/material';
import Image from 'next/image';
import { myLoader } from '../lib/ImageLoader';
import { LIGHT_SCREEN_MODE } from '../constants';

export const Logo = styled((props) => {
const theme = useTheme();
  return (
    <Image
alt={"the logo of Dandela Crypto Converter created by M. Dandela"}
src={theme.palette.mode == LIGHT_SCREEN_MODE ? '/logo.png' : '/logo-white.png'}
width={72}
height={55}
loader={myLoader}
quality={100}
priority
    />
  );
})``;
