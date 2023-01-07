import * as React from "react";
import {useNotificationsStore} from "../../store.js";

// MUI
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import List from "@mui/joy/List";
import AddIcon from "@mui/icons-material/Add";
import NotificationCard from "./NotitificationCard.jsx";
import Divider from "@mui/joy/Divider";
import Stack from "@mui/joy/Stack";
import {useState} from "react";
import {newNotificationDefaults} from "../../mockData/notifications.js";
import Box from "@mui/joy/Box";
import Grow from "@mui/material/Grow";
import Collapse from "@mui/material/Collapse";

const NotificationsList = ({title, subtitle, type}) => {
  const [createMode, setCreateMode] = useState(false);

  // Get the notifications matching the list's type
  const notifications = useNotificationsStore((state) => state.notifications)?.filter(
    (notification) => notification.type === type
  );

  return (
    <>
      {/* List title, create button, and subtitle */}
      <Stack direction="row" spacing={4} alignItems={"center"} sx={{pb: 1}}>
        <Typography
          level="h2"
          sx={{py: 1}}
          fontSize="sm"
          textTransform="uppercase"
          letterSpacing="md"
          fontWeight="lg">
          {title}
        </Typography>

        <Grow in={!createMode}>
          <Button
            startDecorator={<AddIcon />}
            onClick={() => setCreateMode(true)}
            variant="soft"
            size="small">
            New notification
          </Button>
        </Grow>
      </Stack>
      <Typography sx={{pb: 1}} level="body3" textColor="text.tertiary">
        {subtitle}
      </Typography>

      {/* New notification card when it is displayed */}
      <Collapse in={createMode}>
        <Box sx={{my: 2}}>
          <NotificationCard
            createMode
            setCreateMode={setCreateMode}
            notification={{...newNotificationDefaults, type}}
            key="new"
          />
        </Box>
      </Collapse>

      {/* List of notifications */}
      {notifications?.length > 0 && (
        <List sx={{gap: 2, pt: 2}}>
          {notifications.map((notification) => (
            <NotificationCard notification={notification} key={notification._id} />
          ))}
        </List>
      )}
    </>
  );
};

const SettingsPage = () => (
  <>
    {/* Page title */}
    <Typography sx={{pb: 4}} level="h1">
      Notifications
    </Typography>

    {/* Different notifications classes */}
    <NotificationsList
      title="Tickets"
      subtitle="Notify people when a new ticket is opened or closed."
      type="ticket"
    />
    <Divider sx={{my: 3}} />
    <NotificationsList
      title="Events"
      subtitle="Notify people of when an event starts or ends."
      type="event"
    />
    <Divider sx={{my: 3}} />
    <NotificationsList
      title="Data export ready"
      subtitle="Notify people when a data export is ready to be downloaded."
      type="export"
    />
  </>
);

export default SettingsPage;
