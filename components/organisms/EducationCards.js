import { Typography } from '@mui/material';
import React from 'react';
//import ExperienceCard from '../molecules/ExperienceCard';
import EducationCard from '../molecules/EducationCard';

//moment().format('MMMM Do YYYY, h:mm:ss a');

const education = [
  {
    name: 'sections.education.javascript.name',
    position: 'sections.education.javascript.position',
    date: "sections.education.javascript.date", // 20 mars 2022
    imgSrc: 'sections.education.javascript.image',
    link: 'sections.education.javascript.link',
    lessons: [
        <Typography sx={{textDecoration:'underline'}} width="95%">• {'Palyndrome'}</Typography>,
        '',
        '',
        '',
        '',
        'Enhanced live sports CMS to search, create and update multiple seasons and series by implementing GraphQL endpoints using NodeJS and autocomplete form using React, laying out groundworks for future season page',
        'Refactored React components into a library documented with Storybook, reused by 5+ streaming team projects',
      ],
    works: [
      'Delivered internal tool for video content team to create multiple TV series by using React to parse, validate, and upload spreadsheets and show real-time reports for uploads, accelerating workflow to push new content on Paramount+',
      'Enhanced live sports CMS to search, create and update multiple seasons and series by implementing GraphQL endpoints using NodeJS and autocomplete form using React, laying out groundworks for future season page',
      'Refactored React components into a library documented with Storybook, reused by 5+ streaming team projects',
    ],

  },
  {
    name: 'Done.',
    position: 'Software Engineer Intern',
    date: 'Feb 2021 - May 2021',
    imgSrc: 'done.jpeg',
    works: [
      'Reconstructed Typeform to native surveys using React & Golang, providing customization & user-targeted data',
      'Scheduled end-to-end tests on production server using CronJob and configured emails notifications with Python SendGrid to developers working remote, reducing failure detection time and potential user issues',
      'Fetched data from MySQL to Retool and built admin-friendly GUI for operation team to modify user data efficiently',
    ],
    lessons: [
        'Reconstructed Typeform to native surveys using React & Golang, providing customization & user-targeted data',
        'Scheduled end-to-end tests on production server using CronJob and configured emails notifications with Python SendGrid to developers working remote, reducing failure detection time and potential user issues',
        'Fetched data from MySQL to Retool and built admin-friendly GUI for operation team to modify user data efficiently',
      ],
  },
  {
    name: 'TechFin.AI',
    position: 'Frontend Developer Intern',
    date: 'Jul 2020 - Oct 2020',
    imgSrc: 'techfin.png',
    works: [
      'Built an alpha evaluation site using Vue.js from scratch, allowing 20+ Quant developers to edit Python scripts in-browser while synchronizing to server, run with history datasets and illustrate graphical reports for download',
      'Visualized real-time assets performance with ECharts and ensured synchronization of real-time data using Vuex',
      'Implemented dynamic authorization using Axios interceptor and Vue-router, improving security for trading platform',
    ],
    lessons: [
        'Built an alpha evaluation site using Vue.js from scratch, allowing 20+ Quant developers to edit Python scripts in-browser while synchronizing to server, run with history datasets and illustrate graphical reports for download',
        'Visualized real-time assets performance with ECharts and ensured synchronization of real-time data using Vuex',
        'Implemented dynamic authorization using Axios interceptor and Vue-router, improving security for trading platform',
      ],
  },
];

export default function EducationCards({ isDetailed }) {
  return (
    <>
      {education.map(({ name, position, date, imgSrc, works, lessons, link }, idx) => {
        return (
          <EducationCard
            name={name}
            position={position}
            date={date}
            imgSrc={imgSrc}
            link={link}
            works={works}
            lessons={lessons}
            key={idx}
            isDetailed={isDetailed}
          />
        );
      })}
    </>
  );
}