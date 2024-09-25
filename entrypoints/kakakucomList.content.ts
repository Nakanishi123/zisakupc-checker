import { addButtonInList } from "./util/site/kakaku.com";

export default defineContentScript({
  matches: ["*://kakaku.com/*itemlist.aspx", "*://kakaku.com/*itemlist.aspx?*"],
  main() {
    addButtonInList();
  },
});
