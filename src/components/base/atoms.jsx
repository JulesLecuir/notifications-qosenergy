import React from "react";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";

export const CardDivider = ({sx}) => <Divider sx={{mt: 4, mb: 2, ...sx}} />;

export const CardSubtitle = ({children}) => (
  <Typography
    sx={{mb: 3}}
    fontSize="xs2"
    textColor="text.tertiary"
    textTransform="uppercase"
    letterSpacing="md">
    {children}
  </Typography>
);
