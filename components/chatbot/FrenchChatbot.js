import React from 'react';
import styles from '../../styles/Home.module.css';
import Chatbot from 'react-chatbot-kit';
import ActionProvider from '../../utility/chatbot/ActionProvider';
import MessageParser from '../../utility/chatbot/MessageParser';
import { createChatBotMessage } from 'react-chatbot-kit';
import Options from '../molecules/Options';
import ExperienceCards from '../organisms/ExperienceCards';
import ProjectCards from '../organisms/ProjectCards';
import SkillCards from '../organisms/SkillCards';
import BlogCards from '../organisms/BlogCards';
import { useTranslation } from 'next-i18next';
import { useLangMode } from '../../contexts/LangModeProvider';
import { LANGAGE_FRENCH } from '../../_mocks_/_settings_items_';
import { Container, Stack, Typography } from '@mui/material';

const getMoodOptions = (actionProvider) => {
  return [
    {
      text: 'Ça va merci! Parle-moi de toi.',
      handler: () => actionProvider.handleGoodMood(LANGAGE_FRENCH),
      id: 1,
    },
    {
      text: 'Journée pourrie, pour être honnête...',
      handler: () => actionProvider.handleBadMood(LANGAGE_FRENCH),
      id: 2,
    },
  ];
};

const getJokeOptions = (actionProvider) => {
  return [
    {
      text: `LOL c'était drôle`,
      handler: () => actionProvider.handleGoodMoodFinally(LANGAGE_FRENCH),
      id: 1,
    },
    {
      text: `T'en as une autre?`,
      handler: () => actionProvider.handleBadMoodAgain(LANGAGE_FRENCH),
      id: 2,
    },
  ];
};

const getPersonalOptions = (actionProvider) => {
  return [
    /*
    {
      text: 'Experiences',
      handler: () => actionProvider.handleExperience(),
      id: 1,
    },
    {
      text: 'Projets',
      handler: () => actionProvider.handleProjects(),
      id: 2,
    },
    */
    {
      text: 'Compétences',
      handler: () => actionProvider.handleSkills(),
      id: 3,
    },
    {
      text: 'Non merci',
      handler: () => actionProvider.handleFinish(),
      id: 5,
    },
    /*
    {
      text: 'Autres',
      handler: () => actionProvider.handleBlogs(),
      id: 4,
    },
    */
  ];
};

const config = {
  botName: 'Daniel Mbengui',
  initialMessages: [
    createChatBotMessage(
      "Salut 👋, je suis Daan. Si tu visites mon site internet c'est que tu veux surement faire connaissance avec moi, alors autant se tutoyer... Tout d'abord, heureux de te rencontrer! Comment vas-tu aujourd'hui?",
      //"Heureux de te rencontrer! Comment vas tu aujourd'hui ?",
      {
        widget: 'moodOptions',
      }
    ),
  ],
  // customStyles: {
  //   botMessageBox: {
  //     backgroundColor: '#147efb',
  //   },
  //   chatButton: {
  //     backgroundColor: '#147efb',
  //   },
  // },
  widgets: [
    {
      widgetName: 'moodOptions',
      widgetFunc: ({ actionProvider }) => (
        <Options actionProvider={actionProvider} getOptions={getMoodOptions} />
      ),
    },
    {
      widgetName: 'jokeOptions',
      widgetFunc: ({ actionProvider }) => (
        <Options actionProvider={actionProvider} getOptions={getJokeOptions} />
      ),
    },
    {
      widgetName: 'personalOptions',
      widgetFunc: ({ actionProvider }) => (
        <Options
          actionProvider={actionProvider}
          getOptions={getPersonalOptions}
          
        />
      ),
    },
    {
      widgetName: 'experienceOptions',
      widgetFunc: () => <ExperienceCards />,
    },
    {
      widgetName: 'projectsOptions',
      widgetFunc: () => <ProjectCards />,
    },
    {
      widgetName: 'skillsOptions',
      widgetFunc: () => <SkillCards />,
    },
    {
      widgetName: 'blogsOptions',
      widgetFunc: () => <BlogCards />,
    },
  ],
};


export default function FrenchChatbot() {
const [lang,] = useLangMode();
  return (
    <Stack sx={{
      //position:'absolute',
      //bottom:0,
      //background:'cyan', 
      height:'90vh', 
      overflowY: 'auto',
      pb:3
      }}>
      <Chatbot
    className={styles}
    config={config}
    actionProvider={ActionProvider}
    lang={lang}
    messageParser={MessageParser}
  />
    </Stack>
  );
}