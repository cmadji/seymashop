function saveCart(cart) {
  window.localStorage.setItem("cart", JSON.stringify(cart));
}

function getCart() {
  const myCart = window.localStorage.getItem("cart");
  if (!myCart) {
    saveCart([]);
    return [];
  }
  return JSON.parse(myCart);
}

function addArticle(article) {
  const newCart = getCart();
  for (const i in newCart) {
    if (newCart[i].id === article.id) {
      newCart[i].quantity++;
      saveCart(newCart);
      return newCart;
    }
  }
  newCart.push(article);
  saveCart(newCart);
  return newCart;
}

function selectArticle(articleId) {
  const catalogItem = document.getElementById(articleId);
  const catalogName = catalogItem.children[1].children[0].innerHTML;
  const catalogPrice =
    catalogItem.children[1].children[1].children[0].innerHTML;
  const catalogImage =
    catalogItem.children[0].children[0].children[0].getAttribute("src");
  console.log(catalogItem.children[0].children[0]);
  addArticle({
    id: articleId.substr(3, articleId.length),
    name: catalogName,
    price: Number(catalogPrice.substr(0, catalogPrice.length - 2)),
    quantity: 1,
    image: catalogImage,
  });
}

function removeArticle(article) {
  const newCart = getCart();
  for (const i in newCart) {
    if (newCart[i].id === article.id) {
      if (newCart[i].quantity <= 1) {
        const filteredCart = newCart.filter((art) => art.id !== article.id);
        saveCart(filteredCart);
        return filteredCart;
      } else {
        newCart[i].quantity--;
        saveCart(newCart);
        return newCart;
      }
    }
  }
}

function deleteArticle(article) {
  const newCart = getCart();
  const filteredCart = newCart.filter((art) => art.id !== article.id);
  saveCart(filteredCart);
  return filteredCart;
}

function displayCart() {
  const myCart = document.getElementById("cart");
  myCart.innerHTML = "";
  const panier = getCart();
  for (const i in panier) {
    const myArticle = document.createElement("div");
    myArticle.className = "myArticle";

    const imageContainer = document.createElement("div");
    imageContainer.className = "imageContainer";
    const articleImage = document.createElement("img");
    articleImage.className = "articleImage";
    articleImage.setAttribute("src", panier[i].image);
    imageContainer.appendChild(articleImage);
    myArticle.appendChild(imageContainer);

    const articleName = document.createElement("span");
    articleName.className = "articleName";
    articleName.innerHTML = panier[i].name;
    myArticle.appendChild(articleName);

    const articlePrice = document.createElement("span");
    articlePrice.innerHTML = panier[i].price + "Dhs";
    articlePrice.className = "articlePrice";
    myArticle.appendChild(articlePrice);

    const quantityContainer = document.createElement("div");
    quantityContainer.className = "quantityContainer";
    const removeButton = document.createElement("button");
    removeButton.innerHTML = "-";
    removeButton.onclick = function () {
      removeArticle(panier[i]);
      displayCart();
    };
    quantityContainer.appendChild(removeButton);
    const articleQuantity = document.createElement("span");
    articleQuantity.innerHTML = panier[i].quantity;
    articleQuantity.className = "articleQuantity";
    quantityContainer.appendChild(articleQuantity);
    const addButton = document.createElement("button");
    addButton.innerHTML = "+";
    addButton.onclick = function () {
      addArticle(panier[i]);
      displayCart();
    };
    quantityContainer.appendChild(addButton);
    myArticle.appendChild(quantityContainer);

    const totalPrice = document.createElement("span");
    totalPrice.innerHTML = panier[i].price * panier[i].quantity + "Dhs";
    totalPrice.className = "totalPrice";
    myArticle.appendChild(totalPrice);

    myCart.appendChild(myArticle);
  }

  setSubtotalPrice();
}

function setSubtotalPrice() {
  const panier = getCart();
  let somSubTotal = 0;
  for (const i in panier) {
    somSubTotal += panier[i].price * panier[i].quantity;
  }
  const subTotal = document.getElementById("subtotal-price");
  subTotal.innerHTML = somSubTotal + "Dhs";
}

function fav(iconId) {
  const icon = document.getElementById(iconId);
  if (icon.className === "fas fa-heart") {
    icon.className = "fal fa-heart";
  } else {
    icon.className = "fas fa-heart";
  }
}

function buy() {
  window.localStorage.removeItem("cart");
  window.location.href = "./index.html";
}

function subscribe() {
  const text = document.getElementById("subscription");
  const inputText = document.getElementById("email-input");
  if (inputText.value === "") {
    text.style.color = "red";
    text.innerHTML = "Veuillez entrer votre email svp!";
  } else {
    text.style.color = "green";
    text.innerHTML =
      "Merci de vous être abonné! Profitez du shopping sur SeymaShop";
  }

  console.log(inputText.value);
}
