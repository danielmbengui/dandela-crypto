import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

import Title from './Title';
import { useTranslation } from 'next-i18next';
import { useLangMode } from '../../contexts/LangModeProvider';

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  school: {
    fontFamily: 'Lato Bold',
    fontSize: 10,
  },
  degree: {
    fontFamily: 'Lato',
    fontSize: 10,
  },
  candidate: {
    fontFamily: 'Lato Italic',
    fontSize: 10,
  },
});

export default function Education({education, t}) {
//const [lang, setLang] = useLangMode();
  return (
    <View style={styles.container}>
      {
        education && <>
        <Title>{education.title}</Title>
      <Text style={styles.school}>Jedi Academy</Text>
      <Text style={styles.degree}>Jedi Master</Text>
      <Text style={styles.candidate}>A long, long time ago</Text>
        </>
      }
    </View>
  );
}