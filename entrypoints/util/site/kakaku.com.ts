import { addProduct } from "../storage";
import { Product } from "../types";

const BUTTON_TEXT = "リストに追加";

export function addButtonInItem() {
  const bpBox = document.querySelector(".bpBox");
  if (!bpBox) return console.error("bpBox not found");
  const button = document.createElement("button");
  button.textContent = BUTTON_TEXT;
  button.onclick = () => {
    addProduct(getProductInItem());
  };
  bpBox.appendChild(button);
}

function getProductInItem(): Product {
  const url = location.href;
  const name = document.querySelector('#titleBox [itemprop="name"]')?.textContent || "";
  const price = document.querySelector("#priceBox .priceTxt")?.textContent?.replace(/[^0-9]/g, "");
  const imagePath = document.querySelector('#imgBox [itemprop="image"]')?.getAttribute("src") || undefined;
  const addedDate = new Date();
  return { url, name, price: price ? parseInt(price) : undefined, imagePath, addedDate };
}

export function addButtonInList() {
  const favoriteBtns = document.querySelectorAll(".addFavoriteBtn");
  for (const favoriteBtn of favoriteBtns) {
    const parent = favoriteBtn.parentElement as HTMLElement;
    const product = getProductInList(favoriteBtn);
    const span = createTdButton(BUTTON_TEXT, product);

    parent.appendChild(span);
  }
}

function createTdButton(text: string, product?: Product): HTMLTableCellElement {
  const td = document.createElement("td");
  td.className = "ckitemSpecBtn";

  const span = document.createElement("span");
  span.textContent = text;
  span.style.cssText = `
          padding: 1px 10px;
          width: 110;px;
          font-size: 12px;
          color: #000000;
          background-color: #ffffff;
          border: 1px solid #000000;
          border-radius: 4px;
          cursor: pointer;
          text-align: center;
          text-decoration: none;
      `;
  span.onmouseover = () => {
    span.style.backgroundColor = "#dddddd";
  };
  span.onmouseout = () => {
    span.style.backgroundColor = "#ffffff";
  };
  span.onclick = () => {
    if (product) {
      addProduct(product);
    } else {
      console.error("Product is undefined");
    }
  };

  td.appendChild(span);
  return td;
}

function getProductInList(favoriteBtn: Element): Product | undefined {
  const ckitemLink = favoriteBtn.previousElementSibling;
  const nameWithSpan = ckitemLink?.querySelector("a")?.cloneNode(true) as Element | null;
  nameWithSpan?.querySelector("span")?.remove();
  const name = nameWithSpan?.textContent;

  const trBorder = favoriteBtn.closest(".tr-border");
  if (!trBorder) return undefined;
  const infoTr = trBorder.nextElementSibling;
  const imagePath = infoTr?.querySelector("img")?.getAttribute("src");
  const price = infoTr?.querySelector(".pryen a")?.textContent?.replace(/[^0-9]/g, "");
  const url = infoTr?.querySelector(".pryen a")?.getAttribute("href");
  const addedDate = new Date();

  if (!name || !url) return undefined;
  return {
    url: url,
    name: name,
    price: price ? parseInt(price) : undefined,
    imagePath: imagePath || undefined,
    addedDate: addedDate,
  };
}
