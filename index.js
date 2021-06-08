fetch("http://localhost:3000/api/furniture")
.then(response => { return response.json()})
.then(furnitures => {
    console.log(furnitures)
    const contentElt = document.getElementById('content');
    furnitures.forEach(furniture => {
        contentElt.innerHTML += generateProductBloc(furniture);
     
    })

})
.catch(error => {console.error(error)})

function generateProductBloc(product){

    let productBloc = `
      <div class="product col-4">
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

function formatPrice(price){
    return  (price /100).toFixed(2) + '€'
}