fetch("http://localhost:3000/api/furniture")// l'api permet a tous language de ce comprendre par le JSON  on appelle l'api
.then(response => { return response.json()}) // promesse  fonction fléche stock le contenu du json dans response
.then(furnitures => {  // promesse  fonction fléche stock le contenu dans furniture
    console.log(furnitures)
    const contentElt = document.getElementById('content'); // document objet js et me retourne tout le contenu de l'id
     furnitures.forEach(furniture => {  // forEach fonction qui parcours une tableau et le parcour  (on met un s a furnitires car c'est un tableau)
        //le forEach appelle de manière dynamique les fonction furniture achaque fois que la boucle passe fourniture sera = a quelle que chose de nouveaux
        contentElt.innerHTML += generateProductBloc(furniture); //inner html permet d'ecrire en html en js   
     
    })

})
.catch(error => {console.error(error)}) // catch se met sur n'importe qu'elle call, console.error montre dans la console l'erreur 

function generateProductBloc(product){ 
    // block pour le produit  en html et on viens chercher tous les éléments
    let productBloc = `  
      <div class="product col-4 ">
        <div class="imageBlock">
                <a href="pageproduit.html?id=${product._id}"> <img src="${product.imageUrl}"> </a> 
                <div class="basBlock">
                    <h2 class="titreCard">${product.name} - ${formatPrice(product.price)}</h2>
                    <p class="texteCard">${product.description}</p>
                </div>
            </div>
        </div>
  
    `;
    return productBloc

}

function formatPrice(price){ // permet d'avoir le prix en euro
    return  (price /100).toFixed(2) + '€'
}
