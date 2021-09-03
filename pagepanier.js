//on recupere le localstorage
const cartStorage = localStorage.getItem("cart");
console.log("cartStorage", cartStorage);
const cart = JSON.parse(cartStorage);
console.log("cart", cart);
//appeller api (localhost:3000)
fetch("http://localhost:3000/api/furniture")
   .then(response => {
      return response.json()
   })
   .then(furnitures => {
      console.log("furnitures", furnitures);
      generateContent(cart, furnitures)
      //il faut récupéré par rapport aux id présent dans le localstorage les élément nom descritpion prix et image de chaque produit du panier on obtien c'est infromation du produit dans furniture grace a son id
      //il faut mettre un boutton suprimer sur cahque produit (mettre a jour le localstorage par rapport au produit suprimé)

   })
   .catch(error => {
      console.error(error)
   })



function generateProductBloc(product, index) {

   let productBloc = `
     <div class="product">
       <div class="imageBlock imageBlockPanier">
               <div class="img_parent">
                <img src="${product.imageUrl}"> </div>
                <div class="basBlock">
                <span class="croix"><i class="fas fa-times delete-btn" data-index="${index}"></i></span>
                   <h2 class="titreCard">${product.name} - ${formatPrice(product.price)}</h2>
                   <p class="texteCard">${product.description}</p>
                   <p class="texteVernis">Vernis: ${product.selectedVarnish}</p>
                   
               </div>
           </div>

       </div>
 
   `;
   return productBloc

}

function formatPrice(price) {
   return (price / 100).toFixed(2) + '€';
}
let firstNameElt = document.getElementById("firstName");
let lastNameElt = document.getElementById("lastName");
let addressElt = document.getElementById("address");
let cityElt = document.getElementById("city");
let emailElt = document.getElementById("email");

const regexNoms = /^[A-Za-zÀ-ÖØ-öø-ÿ]+$/;
const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regexAddress = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s-]{1,}/;



let firstName = checkInput(firstNameElt, regexNoms, "Pas de chiffre, ni de symbole.");
let lastName = checkInput(lastNameElt, regexNoms, "Pas de chiffre, ni de symbole.");
let city = checkInput(cityElt, regexNoms, "Pas de chiffre, ni de symbole.");
let address = checkInput(addressElt, regexAddress, "Merci de bien vouloir indiqué votre adresse.");
let email = checkInput(emailElt, regexEmail, "Il faut écrire une adresse mail complète.");

document.getElementById("order").addEventListener("submit", (e) => {
         e.preventDefault();
         alert("hello");



         if  ( 
            !regexTester(firstNameElt, regexNoms, "Pas de chiffre, ni de symbole.") ||
            !regexTester(lastNameElt, regexNoms, "Pas de chiffre, ni de symbole.") ||
            !regexTester(cityElt, regexNoms, "Pas de chiffre, ni de symbole.") ||
            !regexTester(addressElt, regexAddress, "Merci de bien vouloir indiqué votre adresse.") ||
            !regexTester(emailElt, regexEmail, "Il faut écrire une adresse mail complète.") 
            
            
         ){
           
               console.log('fail');
               return false;
            }

            let order = {
               contact: {
                  firstName: firstNameElt.value,
                  lastName: lastNameElt.value,
                  address: addressElt.value,
                  city: cityElt.value,
                  email: emailElt.value,
               },
               products: cart.map(elt => elt.id)
            }
            console.log(order);
            localStorage.setItem("contact", JSON.stringify (order.contact));
            fetch("http://localhost:3000/api/furniture/order", {
               method: "POST",
               body: JSON.stringify(order),
               headers: {
                  "Content-type": "application/json; charset=UTF-8"
               }
            }).then(response => response.json())
            .then(rep =>{
               console.log ("réponse comande", rep);
               localStorage.setItem("orderId", rep.orderId)           
               alert(rep.orderId)
               window.location = "pagecommande.html"
            })
            .catch(err => console.log(err))

            


            // voir si toute les variables sont true ()
            // si tous est true alors formaté la donner 
            // puis envoyer formulaire avec le (fetch) 
            // si pas bon envoyer (prompt) message erreur  

         });

        
      function checkInput(input, regex, error) {
         input.addEventListener("keyup", (event) => {
            regexTester(input, regex, error)
         })
      }

      function regexTester(input, regex, error) {
         let test = regex.test(input.value) ? input.value : false;
         if (!test) {
            document.getElementById(input.id + '-error').textContent = error;
         } else {
            document.getElementById(input.id + '-error').textContent = '';
         }
         console.log(test);
         return test
      }

      function generateContent(products, furnitures) {
         let prixGlobal = 0
         const contentElt = document.getElementById('content');
         //on boucle sur les élément du panier localstorage
         products.forEach((element, index) => {
            console.log("index", index);
            let product = furnitures.find(furn => furn._id === element.id);
            product.selectedVarnish = element.varnish;
            prixGlobal += product.price;

            contentElt.innerHTML += generateProductBloc(product, index);
         });
         console.log(prixGlobal / 100, "prixGlobal")
         let prixGlobalElt = document.querySelector(".prixGlobal");
         prixGlobalElt.innerHTML = 'Prix total : ' + prixGlobal / 100 + '€'
         let deleteBtns = Array.from(document.querySelectorAll(".delete-btn"));
         localStorage.setItem("prixGlobal", JSON.stringify (prixGlobal));
         deleteBtns.forEach(deleteBtn => {
            deleteBtn.addEventListener('click', (e) => {
               console.log("e.target", e.target);
               alert(e.target.dataset.index);
               products.splice(e.target.dataset.index, 1);
               localStorage.setItem('cart', JSON.stringify(products))
               contentElt.innerHTML = '';
               generateContent(products, furnitures)
            })
         })

      }

      let deleteAllBtn = document.querySelector(".formule"); deleteAllBtn.addEventListener('click', (e) => {
         localStorage.clear();
         window.location.reload();
      })