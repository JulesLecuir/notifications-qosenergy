import {makeRandomId} from "./utils.js";
import {organizationStructure} from "./organization.js";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid.js";
import LaptopIcon from "@mui/icons-material/Laptop.js";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined.js";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined.js";
import React from "react";

export const notificationsOptions = {
  ticket: {
    triggers: [
      {key: "open", title: "Send a notification on ticket open", label: "On open"},
      {key: "close", title: "Send a notification on ticket close", label: "On close"},
    ],
    priorityField: {
      name: "priority",
      scale: [
        {value: 1, label: "Low"},
        {value: 2, label: "Medium"},
        {value: 3, label: "Major"},
        {value: 4, label: "High"},
      ],
    },
  },
  event: {
    triggers: [
      {key: "start", title: "Send a notification when an event starts", label: "On start"},
      {key: "end", title: "Send a notification when an event ends", label: "On end"},
    ],
    priorityField: {
      name: "criticality",
      scale: [
        {value: 1, label: "Low"},
        {value: 2, label: "Medium"},
        {value: 3, label: "High"},
        {value: 4, label: "Critical"},
      ],
    },
  },
  export: {
    triggers: null,
    priorityField: null,
  },
};

export const contactChannels = [
  {key: "push", label: "Push ", icon: PhoneAndroidIcon},
  {key: "desktop", label: "Desktop", icon: LaptopIcon},
  {key: "email", label: "Emails", icon: EmailOutlinedIcon},
  {key: "sms", label: "SMS", icon: SmsOutlinedIcon},
];

export const notificationSettings = [
  {
    _id: makeRandomId(),
    name: "Support tickets",
    type: "ticket",
    description: "All incoming support tickets.",
    active: true,
    filters: {
      priority: 3,
      keywords: "support",
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
      keywords: "down, downtime, broken, not responding",
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
