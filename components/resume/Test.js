import React from 'react';
import { Page, Text, View, Font, Document, StyleSheet, Image, PDFViewer } from '@react-pdf/renderer';
import Education from './Education';
import Skills from './Skills';
import Experience from './Experience';
import Header from './Header';
import { Container, Typography } from '@mui/material';
import { _MY_PROFILE_ } from '../../_mocks_/_settings_items_';

Font.register({
    family: 'Open Sans',
    src: `https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0e.ttf`,
  });
  
  Font.register({
    family: 'Lato',
    src: `https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjx4wWw.ttf`,
  });
  
  Font.register({
    family: 'Lato Italic',
    src: `https://fonts.gstatic.com/s/lato/v16/S6u8w4BMUTPHjxsAXC-v.ttf`,
  });
  
  Font.register({
    family: 'Lato Bold',
    src: `https://fonts.gstatic.com/s/lato/v16/S6u9w4BMUTPHh6UVSwiPHA.ttf`,
  });

// Create styles
const styles = StyleSheet.create({
    page: {
      padding: 30,
      //widht:'90vw'
    },
    container: {
      flex: 1,
      flexDirection: 'row',
      '@media max-width: 400': {
        flexDirection: 'column',
      },
    },
    image: {
      marginBottom: 10,
    },
    leftColumn: {
      flexDirection: 'column',
      width: 170,
      paddingTop: 30,
      paddingRight: 15,
      '@media max-width: 400': {
        width: '100%',
        paddingRight: 0,
      },
      '@media orientation: landscape': {
        width: 200,
      },
    },
    footer: {
      fontSize: 12,
      fontFamily: 'Lato Bold',
      textAlign: 'center',
      marginTop: 15,
      paddingTop: 5,
      borderWidth: 3,
      borderColor: 'gray',
      borderStyle: 'dashed',
      '@media orientation: landscape': {
        marginTop: 10,
      },
    },
  });

const Resume = (props) => {
    const {education,} = props;
    return (
        <Page {...props} style={styles.page}>
          <Header />
          <View style={styles.container}>
            <View style={styles.leftColumn}>
              <Image
                src={_MY_PROFILE_.srcImage}
                style={styles.image}
              />
              <Education education={education} />
              <Skills />
            </View>
            <Experience />
          </View>
          <Text style={styles.footer}>This IS the candidate you are looking for</Text>
        </Page>
      );
}

// Create Document Component
const Test = ({education, }) => (
    <Document
    author="Daniel Mbengui"
      keywords="awesome, resume, start wars"
      subject="The resume of Luke Skywalker"
      title="Resume"
      //fullScreen
    >
      <Resume education={education} size="A4" />
      <Resume orientation="landscape" size="A4" />
      <Resume size={[500, 1250]} />
    </Document>
);

export default Test;