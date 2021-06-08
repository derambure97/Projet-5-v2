// recuperer l'id depuis l'url de la page
// source : https://www.sitepoint.com/get-url-parameters-with-javascript/
//exemple : http://127.0.0.1:5501/pageproduit.html?id=5be9cc611c9d440000c1421e
const queryString = window.location.search;
console.log(queryString); // ?id=5be9cc611c9d440000c1421e
const urlParams = new URLSearchParams(queryString);

const id = urlParams.get('id')
console.log(id); // 5be9cc611c9d440000c1421e
fetch("http://localhost:3000/api/furniture/"+id) // j'appel l'url du serveur avec l'id du produit que je veux afficher sur ma page
.then(response => { return response.json()})
.then(product => {
    console.log(product) // j'affiche le produit en console
    const contentElt = document.getElementById('content');
    contentElt.innerHTML += generateProductPage(product);
    generateSelect(product.varnish);
})
.catch(error => {console.error(error)})

function generateProductPage(product){
    let productPage = `
    <div class="product">
      <div class="imageBlock">
              <a href="pageproduit.html?id=${product._id}"> <img src="${product.imageUrl}"> </a>
              <div class="basBlock">
                  <h2 class="titreCard">${product.name} - ${formatPrice(product.price)}</h2>
                  <p class="texteCard">${product.description}</p>
                  <div id="vernisSelector"></div>
                  <button id="addToCartBtn">Ajouter au panier</button>
                  
              </div>
          </div>
      </div>

  `;
  return productPage

}

function formatPrice(price){
    return  (price /100).toFixed(2) + '€'
}



function generateSelect(vernisArray){

  let selectElt = document.createElement('select');
  selectElt.id = "vernisSelect"
  document.getElementById("vernisSelector").appendChild(selectElt);
  
  vernisArray.forEach(vernis => {
    let optionElt = document.createElement('option');
    optionElt.textContent = vernis;
    selectElt.appendChild(optionElt);
  })
  
  document.getElementById('addToCartBtn').addEventListener('click', () => {
    let panier = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    let selectedVernis = document.getElementById('vernisSelect').value;
    const selectedArticle = {};
    selectedArticle.id = id;
    selectedArticle.varnish = selectedVernis;
    //j'affiche une alerte pour afficher le nom du vernis
    panier.push(selectedArticle)
    localStorage.setItem("cart", JSON.stringify(panier))
  })
}
