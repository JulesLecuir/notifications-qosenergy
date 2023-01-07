// Zustand
import create from "zustand";
import {immer} from "zustand/middleware/immer";

// Data & utils
import {notificationSettings} from "./mockData/notifications.js";
import {makeRandomId} from "./mockData/utils.js";

// Store
export const useNotificationsStore = create(
  immer((set) => ({
    notifications: notificationSettings,
    addNotification: (newData) => {
      set((state) => {
        newData._id = makeRandomId();
        state.notifications = [newData, ...state.notifications];
      });
    },
    updateNotification: (newData) =>
      set((state) => {
        const index = state.notifications.findIndex((n) => n._id === newData._id);
        if (index !== -1) Object.assign(state.notifications[index], newData);
      }),
    removeNotification: (notificationId) => {
      set((state) => {
        const index = state.notifications.findIndex((n) => n._id === notificationId);
        if (index !== -1) state.notifications.splice(index, 1);
      });
    },
  }))
);
