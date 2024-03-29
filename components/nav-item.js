import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Button, ListItem, useTheme } from '@mui/material';

export const NavItem = (props) => {
  const {langage, href, icon, title, ...others} = props;
  const router = useRouter();
  const active = href ? (router.pathname === href) : false;
  const theme = useTheme();

  return (
    <ListItem
      disableGutters
      sx={{
        display: 'flex',
        mb: 0.5,
        py: 0,
        px: 2
      }}
      {...others}
    >
      <NextLink
        href={href}
        passHref 
        legacyBehavior
        locale={langage}
      >
        <Button
          component="a"
          startIcon={icon}
          disableRipple
          sx={{
            backgroundColor: active && 'primary.main',
            //opacity: active ? 0.85 : 1,
            borderRadius: 1,
            color: active ? 'white.main' : 'text.primary',
            fontWeight: active && 'fontWeightBold',
            justifyContent: 'flex-start',
            px: 3,
            textAlign: 'left',
            textTransform: 'none',
            width: '100%',
            '& .MuiButton-startIcon': {
              color: 'inherit',
            },
            '&:hover': {
              //backgroundColor: theme.palette.mode === 'light' ? 'primary.main' : 'grey.main',
              backgroundColor: 'primary.main',
              //opacity: 0.85,
              color: 'text.withPrimaryBack',
            }
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
          {title}
          </Box>
        </Button>
      </NextLink>
    </ListItem>
  );
};

NavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.string
};
