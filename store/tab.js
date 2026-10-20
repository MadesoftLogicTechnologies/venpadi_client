import { defineStore } from "pinia";

export const useTabStore = defineStore("tabStore", {
  state: () => ({
    activeButtonIndex: 0,
    tabsLength: 0,
    label: "",
    createNew: false,
  }),
  actions: {
    setActiveButton(index) {
      this.activeButtonIndex = index;
    },
    setTabsLength(number) {
      this.tabsLength = number;
    },
    setLabel(labelValue) {
      this.label = labelValue;
    },
    setNew(newValue, labelValue = "") {
      this.createNew = newValue;
      this.label = labelValue;
    },
  },
  persist: true,
});
