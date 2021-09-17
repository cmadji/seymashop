// cart est un tableau d'articles
// article est un objet qui contient un id, un nom, un prix et une quantite

// const panier = [
//   {
//     id: 1,
//     name: "Seynou",
//     price: 100,
//     quantity: 1,
//   },
//   {
//     id: 2,
//     name: "Bb",
//     price: 25,
//     quantity: 3,
//   },
//   {
//     id: 3,
//     name: "Madji",
//     price: 50,
//     quantity: 5,
//   },
// ];

function saveCart(cart) {
  window.localStorage.setItem("cart", JSON.stringify(cart));
}

function getCart() {
  const myCart = window.localStorage.getItem("cart");
  return JSON.parse(myCart);
}

function addArticle(article) {
  const newCart = getCart();
  for (const i in newCart) {
    if (newCart[i].id === article.id) {
      newCart[i].quantity++;
      return newCart;
    }
  }
  newCart.push(article);
  saveCart(newCart);
  return newCart;
}

function removeArticle(article) {
  const newCart = getCart();
  for (const i in newCart) {
    if (newCart[i].id === article.id) {
      if (newCart[i].quantity <= 1) {
        const filteredCart = newCart.filter((art) => art.id !== article.id);
        return filteredCart;
      } else {
        newCart[i].quantity--;
        return newCart;
      }
    }
  }
  saveCart(newCart);
  return newCart;
}

function deleteArticle(article) {
  const newCart = getCart();
  const filteredCart = newCart.filter((art) => art.id !== article.id);
  saveCart(filteredCart);
  return filteredCart;
}

function displayCart() {}
