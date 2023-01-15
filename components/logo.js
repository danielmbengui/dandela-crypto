import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import { myLoader } from '../lib/ImageLoader';

export const Logo = styled((props) => {

  return (
    <Image
alt={"the logo of Dandela Crypto Converter created by M. Dandela"}
src={'/logo.png'}
width={72}
height={55}
loader={myLoader}
quality={100}
priority
    />
  );
})``;
