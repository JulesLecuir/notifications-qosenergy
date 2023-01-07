import {makeRandomId} from "./utils.js";

export const organizationRoles = ["Creator", "Tagged", "Subscribers", "Assignees"];

export const organizationStructure = [
  {
    key: makeRandomId(),
    title: "Site 1",
    children: [
      {key: makeRandomId(), title: "Centrale 1.1"},
      {key: makeRandomId(), title: "Centrale 1.2"},
    ],
  },
  {
    key: makeRandomId(),
    title: "Site 2",
    children: [
      {key: makeRandomId(), title: "Centrale 2.1"},
      {key: makeRandomId(), title: "Centrale 2.2"},
      {key: makeRandomId(), title: "Centrale 2.3"},
      {key: makeRandomId(), title: "Centrale 2.4"},
    ],
  },
  {
    key: makeRandomId(),
    title: "Site 3",
    children: [
      {key: makeRandomId(), title: "Centrale 3.1"},
      {key: makeRandomId(), title: "Centrale 3.2"},
      {key: makeRandomId(), title: "Centrale 3.3"},
    ],
  },
  {
    key: makeRandomId(),
    title: "Site 4",
    children: [
      {key: makeRandomId(), title: "Centrale 4.1"},
      {key: makeRandomId(), title: "Centrale 4.2"},
      {key: makeRandomId(), title: "Centrale 4.3"},
      {key: makeRandomId(), title: "Centrale 4.4"},
    ],
  },
  {
    key: makeRandomId(),
    title: "Site 5",
    children: [
      {key: makeRandomId(), title: "Centrale 5.1"},
      {key: makeRandomId(), title: "Centrale 5.2"},
      {key: makeRandomId(), title: "Centrale 5.3"},
    ],
  },
];
