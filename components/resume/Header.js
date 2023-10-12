import React from 'react';
import { Link, Text, View, StyleSheet, Image, Svg, Font } from '@react-pdf/renderer';
import { _MY_PROFILE_ } from '../../_mocks_/_settings_items_';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

const coffeeIconBase64 = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBkPSJNNTA2LjM0MSA0MjYuMTU0TDE0Ny4yMzQgNjguNjY2IDUxMiAxOTQuODQ0di0xMTQuMjVjMC0yOS43MzEtMjQuMTM4LTUzLjg3MS01My44NzEtNTMuODcxaC00MDYuNjY3Yy0yOS43MzMgMC01My44NzEgMjQuMTQtNTMuODcxIDUzLjg3MXY0MDYuNjY3YzAgMjkuNzMxIDI0LjEzOCA1My44NzEgNTMuODcxIDUzLjg3MWg0MDYuNjY3YzI5LjczMyAwIDUzLjg3MS0yNC4xNCA1My44NzEtNTMuODcxdjExNC4yNTRsLTM1OS4xMDctMTI2LjE3OHoiIGZpbGw9IiMwMDBiMmYiLz48L3N2Zz4=';


Font.register({
    family: 'FontAwesome',
    src: './path/to/your/fontawesome-webfont.ttf', // Assurez-vous de mettre à jour le chemin de la police de caractères
  });

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#112131',
    borderBottomStyle: 'solid',
    alignItems: 'stretch',
  },
  detailColumn: {
    flexDirection: 'column',
    flexGrow: 9,
    textTransform: 'uppercase',
  },
  linkColumn: {
    flexDirection: 'column',
    flexGrow: 2,
    alignSelf: 'flex-end',
    justifySelf: 'flex-end',
  },
  name: {
    fontSize: 24,
    fontFamily: 'Lato Bold',
  },
  subtitle: {
    fontSize: 10,
    justifySelf: 'flex-end',
    fontFamily: 'Lato',
  },
  link: {
    fontFamily: 'Lato',
    fontSize: 10,
    color: 'black',
    textDecoration: 'none',
    alignSelf: 'flex-end',
    justifySelf: 'flex-end',
  },
  icon: {
    fontFamily: 'FontAwesome',
    fontSize: 24,
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
});

export default () => (
  <View style={styles.container}>
    <View style={styles.detailColumn}>
      <Text style={styles.name}>{_MY_PROFILE_.name}</Text>
      <Text style={styles.subtitle}>{_MY_PROFILE_.position}</Text>
    </View>
    <View style={styles.linkColumn}>
    
      <Link href={`${_MY_PROFILE_.socials.website}`} style={styles.link}>
      <Text><FontAwesomeIcon icon="fa-solid fa-clipboard" /></Text>
      <Text>{' '}{_MY_PROFILE_.socials.website}</Text>
      </Link>
      <Link href={`mailto:${_MY_PROFILE_.mail}`} style={styles.link}>
        {_MY_PROFILE_.mail}
      </Link>
      <Link href={`${_MY_PROFILE_.socials.linkedin}`} target='_blank' style={styles.link}>
        {_MY_PROFILE_.socials.linkedin}
      </Link>
      <Link href={`${_MY_PROFILE_.socials.github}`} target={'_blank'} style={styles.link}>
      {_MY_PROFILE_.socials.github}
      </Link>
    </View>
  </View>
);