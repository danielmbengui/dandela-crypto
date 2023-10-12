import { Stack, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import React from 'react';
import { AngolanIcon, EnglishIcon, FrenchIcon, ItalianIcon } from '../icons/FlagIcons';
import { AndroidIcon, AndroidStudioIcon, AtomIcon, CssIcon, C_LangageIcon, DiscordApiIcon, EclipseIcon, EtherJsIcon, FirebaseIcon, GoogleMapsIcon, HtmlIcon, IonicIcon, JavaIcon, JavascriptIcon, MaterialUiIcon, MomentJsIcon, MySqlIcon, NextJsIcon, NodeJsIcon, NotepadIcon, OpenAiIcon, PhotoshopIcon, PhpIcon, PrestashopIcon, PwaIcon, PythonIcon, ReactIcon, SolidityIcon, SpyderIcon, TwitterApiIcon, TypescriptIcon, VisualStudioIcon, Web3JsIcon } from '../icons/IconifiyIcons';
import SkillCard from '../molecules/SkillCard';
import { Slide } from "react-awesome-reveal";

export const skills = [
  {
    name: 'sections.skills.langs.title',
    skills: [
      ['sections.skills.langs.ao.name', 100, <Stack direction={'row'} alignItems={'center'} spacing={1}><AngolanIcon size={20} /><Typography>{`Langue maternelle`}</Typography></Stack>],
      ['sections.skills.langs.fr.name', 100, <Stack direction={'row'} alignItems={'center'} spacing={1}><FrenchIcon size={20} /><Typography>{`Langue maternelle`}</Typography></Stack>],
      ['sections.skills.langs.en.name', 70, <Stack direction={'row'} alignItems={'center'} spacing={1}><EnglishIcon size={20} /><Typography>{`Niveau B1`}</Typography></Stack>],
    ],
  },
  {
    name: 'sections.skills.programming.title',
    skills: [
      ['Javascript/HTML/CSS', 95, <Stack direction={'row'} spacing={0.5} alignItems={'center'} justifyContent={'center'}><JavascriptIcon size={25} /><HtmlIcon size={20} /><CssIcon size={20} /></Stack>],
      ['Python', 90, <PythonIcon size={20} />],
      ['Java', 85, <JavaIcon size={20} />],
      ['Android', 85, <AndroidIcon size={25} />],
      ['Ionic', 70, <IonicIcon size={25} />],
      /*
      ['Php', 80, <PhpIcon size={30} />],
      ['SQL', 80, <MySqlIcon size={35} />],
      ['Typescript', 70, <TypescriptIcon size={20} />],
      */
      ['Solidity', 60, <SolidityIcon size={15} />],
      ['C', 50, <C_LangageIcon size={20} />],
    ],
  },
  {
    name: 'sections.skills.frameworks.title',
    skills: [
      ['React', 95, <ReactIcon size={20} />],
      ['NodeJS', 85, <NodeJsIcon size={20} />],
      ['NextJS', 85, <NextJsIcon size={20} />],
      ['PWA', 55, <PwaIcon size={30} />],
      ['Firebase', 80, <FirebaseIcon size={20} />],
      ['Material Ui', 55, <MaterialUiIcon color={blue[600]} size={20} />],
      ['MomentJS', 85, <MomentJsIcon size={20} />],
      ['Web3JS', 85, <Web3JsIcon size={20} />],
      ['EtherJS', 85, <EtherJsIcon size={20} />],
      ['ChatGPT', 55, <OpenAiIcon />],  
      ['Prestashop', 55, <PrestashopIcon />],  
      /*
      ['Google Maps API', 80, <GoogleMapsIcon size={20} />],
      ['Twitter API', 80, <TwitterApiIcon size={20} />],
      ['Discord API', 80, <DiscordApiIcon size={20} />],
      ['Ionic', 80, <IonicIcon size={20} />],
      */
      ['i18n', 55, <div></div>],
      ['Midjourney', 55, <div></div>],
      
    ],
  },
  {
    name: 'sections.skills.software.title',
    skills: [
      ['Visual Studio', 55, <VisualStudioIcon size={20} />],
      ['Spyder', 60, <SpyderIcon size={20} />],
      ['Eclipse', 55, <EclipseIcon size={20} />],
      ['Atom', 55, <AtomIcon size={20} />],
      ['Android Studio', 55, <AndroidStudioIcon size={20} />],
      ['Notepad ++', 55, <NotepadIcon size={20} />],
      ['Photoshop', 55, <PhotoshopIcon size={20} />],
    ],
  },
];

function SkillCards({ isDetailed }) {
  return (
    <Slide cascade direction='up' triggerOnce>
      {skills.map(({ name, skills }, idx) => {
        return (
          <SkillCard
            name={name}
            skills={skills}
            key={idx}
            isDetailed={isDetailed}
          />
        );
      })}
    </Slide>
  );
}

export default SkillCards;
