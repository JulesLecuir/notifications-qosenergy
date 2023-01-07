import React, {useState} from "react";
import FormControl from "@mui/joy/FormControl";
import TextField from "@mui/joy/TextField";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";

export const DiscoverableTextField = ({discoverFieldLabel, ...props}) => {
  const [discovered, setDiscovered] = useState(props.value?.length > 0);

  return discovered ? (
    <FormControl>
      <TextField {...props} />
    </FormControl>
  ) : (
    <Button
      sx={{width: "fit-content"}}
      startDecorator={props.startDecorator}
      variant="outlined"
      onClick={() => setDiscovered(true)}>
      {discoverFieldLabel}
    </Button>
  );
};

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
