import { Box, Typography } from '@mui/material';
import React from 'react';
import { Autocomplete, Input } from '@mui/joy';
import { CssVarsProvider, extendTheme } from '@mui/joy';
import SearchIcon from '@mui/icons-material/Search';
import sisfil from '../../../static/sisfil';

const theme = extendTheme({
  components: {
    JoyAutocomplete: {
      defaultProps: {
        variant: 'soft',
      },
    },
    JoyInput: {
      defaultProps: {
        variant: 'soft',
      },
    },
  },
});

export default function Header() {
  return (
    <>
    <Box sx={{ display: 'none', justifyContent: 'end', width: 'full', gap: 3, mb:5 }}>
      <CssVarsProvider theme={theme}>
        <Autocomplete variant="soft" placeholder="Filter" options={sisfil} sx={{ width: 150, height: 47 }} />
        <Input variant="soft" sx={{ width: 300 }} startDecorator={<SearchIcon />} placeholder="Cari" />
      </CssVarsProvider>
    </Box>
    </>
  );
}
