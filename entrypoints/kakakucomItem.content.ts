import { addButtonInItem } from "./util/site/kakaku.com";

export default defineContentScript({
  matches: ["*://kakaku.com/item/*"],
  main() {
    addButtonInItem();
  },
});
