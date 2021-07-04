//on recupere le localstorage
const cartStorage = localStorage.getItem("cart");
console.log("cartStorage",cartStorage);
const cart = JSON.parse(cartStorage);
console.log("cart", cart);
//appeller api (localhost:3000)
fetch("http://localhost:3000/api/furniture")
.then(response => { return response.json()})
.then(furnitures => {
    console.log("furnitures", furnitures);
    generateContent(cart, furnitures)
 //il faut récupéré par rapport aux id présent dans le localstorage les élément nom descritpion prix et image de chaque produit du panier on obtien c'est infromation du produit dans furniture grace a son id
 //il faut mettre un boutton suprimer sur cahque produit (mettre a jour le localstorage par rapport au produit suprimé)
 
})
.catch(error => {console.error(error)})



function generateProductBloc(product,index){

   let productBloc = `
     <div class="product col-12">
       <div class="imageBlock imageBlockPanier">
                <img src="${product.imageUrl}"> 
                <div class="basBlock">
                   <h2 class="titreCard">${product.name} - ${formatPrice(product.price)}</h2>
                   <p>Vernis: ${product.selectedVarnish}</p>
                   <span class="delete-btn" data-index="${index}">x</span>
               </div>
           </div>
       </div>
 
   `;
   return productBloc

}

function formatPrice(price){
   return  (price /100).toFixed(2) + '€';
}

document.getElementById ("order").addEventListener("submit",(e)=>{ 
   e.preventDefault();
   alert("hello");
   let firstNameElt = document.getElementById ("firstName"); 
   let lastNameElt = document.getElementById ("lastName");
   let addressElt = document.getElementById ("address");
   let cityElt = document.getElementById ("city");
   let emailElt = document.getElementById ("email"); 
   
   const regexNoms = /^[A-Za-zÀ-ÖØ-öø-ÿ]+$/;
   const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   const regexAddress =/^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s-]{1,}/;

   const isFirstNameOk = checkInput(firstNameElt.value, regexNoms);
   const isLastNameOk = checkInput(lastNameElt.value, regexNoms);
   const isCityOk = checkInput(cityElt.value, regexNoms);
   const isAddressOk = checkInput(addressElt.value, regexAddress);
   const isEmailOk = checkInput(emailElt.value, regexEmail);

function checkInput(input, regex, error){
  input.addEventListener("keyup", (event) => {
    let test = regex.test(event.target.value)
    if(!test){
      document.getElementById(input.id + '-error').textContent = error;
    }else{
       document.getElementById(input.id + '-error').textContent = '';
    }
    return test
  })
}

checkInput(firstNameElt, regexNoms, "Pas de chiffre, ni de symbole.");
checkInput(lastNameElt, regexNoms, "Pas de chiffre, ni de symbole.");
checkInput(addressElt, regexAddress, "Merci de bien vouloir indiqué votre adresse.");
checkInput(cityElt, regexNoms, "Pas de chiffre, ni de symbole.");
checkInput(emailElt, regexEmail, "Il faut écrire une adresse mail complète.");
   // voir si toute les variables sont true ()
   // si tous est true alors formaté la donner 
   // puis envoyer formulaire avec le (fetch) 
   // si pas bon envoyer (prompt) message erreur  

});

function checkInput(input, regex) {
   return regex.test(input);
}

function generateContent(products, furnitures) {
   const contentElt = document.getElementById('content');
   //on boucle sur les élément du panier localstorage
      products.forEach((element,index) => {
         console.log("index",index);
         let product = furnitures.find(furn => furn._id === element.id);
         product.selectedVarnish = element.varnish;
         contentElt.innerHTML += generateProductBloc(product, index);
      });
      let deleteBtns = Array.from(document.querySelectorAll(".delete-btn"));
  
     deleteBtns.forEach( deleteBtn => {
     deleteBtn.addEventListener('click', (e)=>{
      alert(e.target.dataset.index);
      products.splice(e.target.dataset.index, 1);
      localStorage.setItem('cart', JSON.stringify(products))
      contentElt.innerHTML = '';
      generateContent(products, furnitures)
    })
  })
   
}
