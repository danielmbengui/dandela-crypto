import { Chip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styles from '../../styles/Options.module.css';

const Options = ({ getOptions, actionProvider }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setOptions(getOptions(actionProvider));
  }, []);

  return (
    <div className={styles.container}>
      {options.map((option) => {
        return (
          <Chip
            key={option.id}
            onClick={option.handler}
            label={option.text}
            sx={{
              marginRight: '5px',
              padding: '2px',
              fontSize: '0.85rem',
              marginBottom: '5px',
              background:'var(--accents4)',
              border:'1px dashed var(--primary)',
              "&:hover " : {
                background:'var(--primary)',
                color:'black'
              }
            }}
          />
        );
      })}
    </div>
  );
};

export default Options;
