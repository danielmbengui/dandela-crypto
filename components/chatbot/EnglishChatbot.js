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
import { LANGAGE_ENGLISH } from '../../_mocks_/_settings_items_';
import { Stack } from '@mui/material';

const getMoodOptions = (actionProvider) => {
  return [
    {
      text: 'Doing great! Tell me about yourself',
      handler: () => actionProvider.handleGoodMood(LANGAGE_ENGLISH),
      id: 1,
    },
    {
      text: 'Having a bad day...',
      handler: () => actionProvider.handleBadMood(LANGAGE_ENGLISH),
      id: 2,
    },
  ];
};

const getJokeOptions = (actionProvider) => {
  return [
    {
      text: "LOL that's funny",
      handler: () => actionProvider.handleGoodMoodFinally(LANGAGE_ENGLISH),
      id: 1,
    },
    {
      text: 'Tell me another one',
      handler: () => actionProvider.handleBadMoodAgain(LANGAGE_ENGLISH),
      id: 2,
    },
  ];
};

const getPersonalOptions = (actionProvider) => {
  return [
    /*
    {
      text: 'Experience',
      handler: () => actionProvider.handleExperience(),
      id: 1,
    },
    {
      text: 'Projects',
      handler: () => actionProvider.handleProjects(),
      id: 2,
    },
    */
    {
      text: 'Skills',
      handler: () => actionProvider.handleSkills(),
      id: 3,
    },
    /*
    {
      text: 'Blogs',
      handler: () => actionProvider.handleBlogs(),
      id: 4,
    },
    */
  ];
};

const config = {
    botName: 'Jeffrey Yu',
    initialMessages: [
      createChatBotMessage(
        "Hi 👋, I'm Daan. If you're visiting my website, it's probably because you want to get to know me, so let's use informal language... First of all, nice to meet you! How are you doing today?",
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


export default function EnglishChatbot() {

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
        messageParser={MessageParser}
      />
      </Stack>
  );
}