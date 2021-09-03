
const queryString = window.location.search; // on recupere l'url des produit détailler  avec le window.location.search 
console.log(queryString); 
const urlParams = new URLSearchParams(queryString); // urlParams est un objet native en js, on passe la const au dessus pour avoir au variable dans les url

const id = urlParams.get('id')// nouvelle const, methode .get qui urlParams pour allez chercher la variable id de l'url
console.log(id); 
fetch("http://localhost:3000/api/furniture/"+id) // j'appel l'url du serveur avec l'id du produit que je veux afficher sur ma page
.then(response => { return response.json()})
.then(product => {
    console.log(product) // j'affiche le produit en console
    const contentElt = document.getElementById('content');// document objet js et me retourne tout le contenu de l'id
    contentElt.innerHTML += generateProductPage(product); //inner html permet d'ecrire en html en js 



    generateSelect(product.varnish); // je ne sais pas

  
    document.getElementById('addToCartBtn').addEventListener('click', () => {
      let panier = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []; // Json.parse transforme en objet un string
      let selectedVernis = document.getElementById('vernisSelect').value;
      const selectedArticle = {};
      selectedArticle.id = id;
      selectedArticle.varnish = selectedVernis;
      //j'affiche une alerte pour afficher le nom du vernis
      panier.push(selectedArticle)
      localStorage.setItem("cart", JSON.stringify(panier)) //Json.stringify transforme en string l'objet panier
      alert(`Le produit ${product.name} a ete ajoute au panier`);
    })
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
                  <div class="selectEtBoutton">
                      <div id="vernisSelector"></div>
                      <div><button id="addToCartBtn">Ajouter au panier </button></div>
                  </div>
                  
              </div>
          </div>
      </div>

  `;
  return productPage

}





function formatPrice(price){                    
    return  (price /100).toFixed(2) + '€'
}
//fonction pour avoir le prix sur 100
function generateSelect(vernisArray){

  let selectElt = document.createElement('select');
  selectElt.id = "vernisSelect"
  document.getElementById("vernisSelector").appendChild(selectElt);
  
  vernisArray.forEach(vernis => {
    let optionElt = document.createElement('option');
    optionElt.textContent = vernis;
    selectElt.appendChild(optionElt);
  })

}

