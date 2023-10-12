import React from "react";
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { useTheme } from '@mui/material';

const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: 'var(--primary)',
    },
    [`& .${tooltipClasses.tooltip}`]: {
      //backgroundColor: theme.palette.primary.main,
      backgroundColor: 'var(--primary)',
      color: theme.palette.text.secondary
    },
  }));

  export default function TooltipComponent() {
    const theme = useTheme();
    return(
        <BootstrapTooltip
        theme={theme}
        />
    )
  }