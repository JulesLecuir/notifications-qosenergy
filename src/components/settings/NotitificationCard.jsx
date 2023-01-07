import React, {useState} from "react";
import {useFormik} from "formik";

// MUI
import TextField from "@mui/joy/TextField";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Box from "@mui/joy/Box";
import Switch from "@mui/joy/Switch";
import ChipDelete from "@mui/joy/ChipDelete";
import Stack from "@mui/joy/Stack";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Slider from "@mui/joy/Slider";
import Collapse from "@mui/material/Collapse";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined.js";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined.js";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import IntegrationInstructionsOutlinedIcon from "@mui/icons-material/IntegrationInstructionsOutlined";
import Grid from "@mui/joy/Grid";
import Link from "@mui/joy/Link";
import IconButton from "@mui/joy/IconButton";

import {useNotificationsStore} from "../../store.js";
import {organizationStructure, organizationRoles} from "../../mockData/organization.js";
import {contactChannels, notificationTriggers} from "../../mockData/notifications.js";
import {CardDivider, CardSubtitle} from "../base/atoms.jsx";
import {AntdTree, MuiTree, ToggleChips, DiscoverableTextField} from "../base/inputs.jsx";

const NotificationCard = ({notification, createMode = false, setCreateMode}) => {
  const {addNotification, updateNotification, removeNotification} = useNotificationsStore();
  const [expanded, setExpanded] = useState(createMode);

  // https://formik.org/docs/examples/with-material-ui
  const {handleSubmit, handleChange, values, setFieldValue, dirty} = useFormik({
    initialValues: notification,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (createMode) {
        addNotification(values);
        setCreateMode(false);
      } else {
        updateNotification(values);
      }
    },
  });

  // define the slider field options if there is a need to.
  const sliderField = notification.type.includes("event")
    ? {
        name: "criticality",
        marks: [
          {value: 1, label: "Low"},
          {value: 2, label: "Medium"},
          {value: 3, label: "High"},
          {value: 4, label: "Critical"},
        ],
      }
    : notification.type.includes("ticket")
    ? {
        name: "priority",
        marks: [
          {value: 1, label: "Low"},
          {value: 2, label: "Medium"},
          {value: 3, label: "Major"},
          {value: 4, label: "High"},
        ],
      }
    : false;

  return (
    <Sheet
      variant="outlined"
      sx={(theme) => ({
        borderColor: createMode && `rgba(${theme.vars.palette.success.mainChannel} / 0.6)`,
        opacity: notification.active ? 1 : 0.4,
        transition: "opacity 0.3s ease-in-out",
        borderRadius: 2,
        p: 2,
      })}>
      {/* HEADER */}
      <Box sx={{display: "flex", justifyContent: "space-between", gap: 2}}>
        {/* Clickable title and subtitle that expands the notification content */}
        <Stack
          direction="row"
          alignItems="center"
          gap={2}
          {...(!createMode && {
            // Positive padding + negative margin to expand the clickable zone
            sx: {cursor: "pointer", p: 2, m: -2, flexGrow: 1},
            onClick: () => setExpanded(!expanded),
          })}>
          {/* Title and subtitle */}
          {createMode ? (
            <Typography textColor="success.main">New notification...</Typography>
          ) : (
            <>
              {/* Dropdown link icon */}
              <IconButton>
                {expanded ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
              </IconButton>
              <Box>
                <Typography fontWeight="md">{notification.name}</Typography>
                <Typography level="body3">{notification.description}</Typography>
              </Box>
            </>
          )}
        </Stack>
        {/* Action buttons */}
        <Stack direction={{xs: "column-reverse", sm: "row"}} alignItems="center" gap={2}>
          {!createMode && (
            <Switch
              checked={notification.active}
              onChange={() =>
                updateNotification({_id: notification._id, active: !notification.active})
              }
              color="success"
              size="lg"
              variant="solid"
            />
          )}
          <ChipDelete
            color="danger"
            variant="soft"
            title="Delete the notification"
            onClick={() =>
              createMode ? setCreateMode(false) : removeNotification(notification._id)
            }
          />
        </Stack>
      </Box>

      <Collapse in={createMode || expanded} sx={{mx: -2, px: 2}}>
        <CardDivider sx={{mt: 2, mx: -2}} />
        {/* Notification card body */}
        <form onSubmit={handleSubmit}>
          <CardSubtitle>Basic information</CardSubtitle>
          <Grid container columnSpacing={8} rowSpacing={3}>
            <Grid lg={6} xs={12}>
              <TextField
                label="Name"
                placeholder="notification name..."
                name="name"
                value={values.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid lg={6} xs={12}>
              <TextField
                label="Description"
                name="description"
                value={values.description}
                onChange={handleChange}
                placeholder="description..."
              />
            </Grid>
          </Grid>

          <CardDivider />
          <CardSubtitle>Filters</CardSubtitle>
          <Grid container columnSpacing={8} rowSpacing={3}>
            <Grid lg={6} xs={12}>
              <AntdTree
                options={organizationStructure}
                setFieldValue={setFieldValue}
                label="Notification scopes"
                name="scopes"
                value={values.scopes}
              />
              {/*<MuiTree*/}
              {/*  options={organizationStructure}*/}
              {/*  setFieldValue={setFieldValue}*/}
              {/*  label="Notification scopes"*/}
              {/*  name="scopes"*/}
              {/*  value={values.scopes}*/}
              {/*/>*/}
            </Grid>
            <Grid lg={6} xs={12}>
              <Stack gap={3}>
                {notificationTriggers[notification.type]?.length > 0 && (
                  <Stack direction="row" gap={3}>
                    <FormLabel>Trigger a notification...</FormLabel>
                    <ToggleChips
                      options={notificationTriggers[notification.type]}
                      value={values.filters.triggers}
                      name="filters.triggers"
                      setFieldValue={setFieldValue}
                    />
                  </Stack>
                )}

                {sliderField && (
                  <FormControl sx={{pb: 2}}>
                    <FormLabel htmlFor="filters.priority">
                      With a minimum {sliderField.name} of...
                    </FormLabel>
                    <Slider
                      sx={{width: "calc(100% - 4rem)", alignSelf: "center"}}
                      name={`filters.${sliderField.name}`}
                      value={values.filters[sliderField.name]}
                      onChange={handleChange}
                      step={1}
                      min={1}
                      max={4}
                      valueLabelDisplay="off"
                      marks={sliderField.marks}
                    />
                  </FormControl>
                )}

                <TextField
                  label="Containing at least one of the following tags..."
                  placeholder="enter tags spaced with a comma..."
                  name="filters.contains"
                  value={values.filters.contains}
                  onChange={handleChange}
                />
              </Stack>
            </Grid>
          </Grid>

          <CardDivider />
          <Grid container columnSpacing={8} rowSpacing={3}>
            <Grid lg={6} xs={12}>
              <CardSubtitle>Contact channels</CardSubtitle>
              <Stack gap={3}>
                {organizationRoles.map((roleName, i) => (
                  <Stack direction="row" gap={3} key={i}>
                    <FormLabel sx={{minWidth: 100}}>{roleName}</FormLabel>
                    <ToggleChips
                      options={contactChannels}
                      value={values.contactChannels.roles[roleName.toLowerCase()]}
                      name={`contactChannels.roles.${roleName.toLowerCase()}`}
                      setFieldValue={setFieldValue}
                    />
                  </Stack>
                ))}
              </Stack>
            </Grid>
            <Grid lg={6} xs={12}>
              <CardSubtitle>More channels</CardSubtitle>
              <Stack gap={3}>
                <DiscoverableTextField
                  startDecorator={<EmailOutlinedIcon />}
                  discoverFieldLabel="Add additional emails"
                  label="Additional emails"
                  placeholder="email@one.com, email@two.com, ..."
                  value={values.contactChannels.custom.email}
                  onChange={(event) => {
                    console.log(event.target.value);
                    handleChange(event);
                  }}
                  name="contactChannels.custom.email"
                />
                <DiscoverableTextField
                  startDecorator={<SmsOutlinedIcon />}
                  discoverFieldLabel="Add additional phone numbers"
                  label="Additional phone numbers"
                  placeholder="+33612345678, +3387654321, ..."
                  value={values.contactChannels.custom.sms}
                  onChange={handleChange}
                  name="contactChannels.custom.sms"
                />
                <Link
                  startDecorator={<IntegrationInstructionsOutlinedIcon />}
                  href={"https://slack.com"}
                  target="_blank">
                  Add more integrations
                </Link>
              </Stack>
            </Grid>
          </Grid>

          <CardDivider />
          <Stack>
            <Button
              type="submit"
              disabled={!dirty}
              size="lg"
              color="success"
              sx={{alignSelf: "center"}}>
              {createMode ? "Create and activate" : "Save changes"}
            </Button>
          </Stack>
        </form>
      </Collapse>
    </Sheet>
  );
};

export default NotificationCard;
