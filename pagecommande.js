const orderId = localStorage.getItem("orderId");
const prixGlobal = localStorage.getItem("prixGlobal");
const contactStorage = localStorage.getItem("contact");
const contact = JSON.parse(contactStorage);
const contentElt = document.getElementById('carreviolet');
contentElt.innerHTML += generateOrder(orderId); 

document.querySelector('.btncarre').addEventListener('click', () => {
  localStorage.clear()
  window.location = "index.html"
})

alert(`le num de commande est ${orderId}`);

function generateOrder(orderId) {
    let carreViolet = `
    <div class="carreviolet">
    <p class="blockcarre"> 
    Merci ${contact.firstName} ${contact.lastName}<br>
    d'avoir commander sur Orinoco<br><br>
    La somme est de ${prixGlobal/100} € <br><br>
    Numéro de commande<br> 
    ${orderId} 
     </P>
    <button class="btncarre" >Accueil</button>
    </div>

  `;
    return carreViolet

}

