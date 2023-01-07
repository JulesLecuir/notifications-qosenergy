import {makeRandomId} from "./utils.js";
import {organizationStructure} from "./organization.js";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid.js";
import LaptopIcon from "@mui/icons-material/Laptop.js";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined.js";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined.js";
import React from "react";

export const contactChannels = [
  {value: "push", title: "Push notifications in the QOS Energy app", icon: PhoneAndroidIcon},
  {value: "desktop", title: "Desktop notifications", icon: LaptopIcon},
  {value: "email", title: "Emails", icon: EmailOutlinedIcon},
  {value: "sms", title: "SMS", icon: SmsOutlinedIcon},
];

export const notificationSettings = [
  {
    _id: makeRandomId(),
    name: "Downtime ops",
    type: "ticket.opened",
    description: "Small description to remember what the notification was made for.",
    active: true,
    filters: {
      priority: 3,
      contains: "down",
    },
    contactChannels: {
      roles: {
        creator: ["push", "desktop", "email", "sms"],
        tagged: ["push", "desktop"],
        subscribers: ["push", "desktop", "email", "sms"],
        assignees: ["push", "desktop", "email", "sms"],
      },
      custom: {
        email: "truc@machin.com, personne@exterieur.eu",
      },
    },
    scopes: [organizationStructure[0].children[1].key, organizationStructure[2].children[2].key],
  },
];

export const newNotificationDefaults = {
  _id: "new",
  active: true,
  filters: {},
  contactChannels: {
    roles: {
      creator: ["push", "desktop", "email", "sms"],
      tagged: ["push", "desktop"],
      subscribers: ["push", "desktop", "email", "sms"],
      assignees: ["push", "desktop", "email", "sms"],
    },
    custom: {},
  },
  scopes: [],
};
