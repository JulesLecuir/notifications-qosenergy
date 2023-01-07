import {makeRandomId} from "./utils.js";
import {organizationStructure} from "./organization.js";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid.js";
import LaptopIcon from "@mui/icons-material/Laptop.js";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined.js";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined.js";
import React from "react";

export const contactChannels = [
  {key: "push", title: "Push ", icon: PhoneAndroidIcon},
  {key: "desktop", title: "Desktop", icon: LaptopIcon},
  {key: "email", title: "Emails", icon: EmailOutlinedIcon},
  {key: "sms", title: "SMS", icon: SmsOutlinedIcon},
];

export const notificationTriggers = {
  ticket: [
    {key: "open", title: "Send a notification on ticket open", text: "On open"},
    {key: "close", title: "Send a notification on ticket close", text: "On close"},
  ],
  event: [
    {key: "start", title: "Send a notification when an event starts", text: "On start"},
    {key: "end", title: "Send a notification when an event ends", text: "On end"},
  ],
};

export const notificationSettings = [
  {
    _id: makeRandomId(),
    name: "Support tickets",
    type: "ticket",
    description: "All incoming support tickets.",
    active: true,
    filters: {
      priority: 3,
      contains: "support",
      triggers: ["open", "close"],
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
  {
    _id: makeRandomId(),
    name: "Broken infrastructure",
    type: "event",
    description: "Notify people when anything is broken somewhere.",
    active: true,
    filters: {
      priority: 3,
      contains: "down, downtime, broken, not responding",
      triggers: ["start"],
    },
    contactChannels: {
      roles: {
        creator: ["push", "desktop", "email", "sms"],
        tagged: ["push", "desktop"],
        subscribers: ["push", "desktop", "email", "sms"],
        assignees: ["push", "desktop", "email", "sms"],
      },
      custom: {
        sms: "+33612345678, +33698754321",
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
