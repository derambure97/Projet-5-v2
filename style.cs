/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}

/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
  display: block;
}

body {
  line-height: 1;
}

ol, ul {
  list-style: none;
}

blockquote, q {
  quotes: none;
}

blockquote:before, blockquote:after,
q:before, q:after {
  content: "";
  content: none;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

.titreCard {
  font-family: "Roboto", sans-serif;
  font-weight: 700;
}

.texteCard {
  font-family: "Roboto", sans-serif;
  font-weight: 400;
}

body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

#content {
  display: wrap;
  width: 90%;
  margin: auto;
  margin-top: 10px;
  padding-bottom: 10px;
}
#content #content:hover {
  box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.3);
}

.product {
  padding: 1%;
}
.product img {
  width: 100%;
  height: 400px;
  object-fit: cover;
}

.basBlock {
  background-color: #9356DC;
  padding: 15px;
  margin-top: -3px;
}
.basBlock .titreCard {
  color: white;
  padding-bottom: 15px;
  font-weight: 700;
  font-size: 1.5em;
}
.basBlock .texteCard {
  color: white;
}

#content.page2 {
  display: wrap;
  width: 60%;
  margin: auto;
  margin-top: 10px;
  padding-bottom: 10px;
}
#content.page2 #content:hover {
  box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.3);
}

.product {
  padding: 1%;
}
.product img {
  width: 100%;
  height: 400px;
  object-fit: cover;
}

.basblock {
  background-color: #9356DC;
  padding: 15px;
  margin-top: -3px;
}
.basblock .titrecard {
  color: white;
  padding-bottom: 15px;
  font-weight: 700;
  font-size: 1.5em;
}
.basblock .textecard {
  color: white;
}

.selectEtBoutton {
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
  margin: 10 20 10 50;
  padding: 2px;
}

button {
  border-radius: 50px;
  border-color: white;
  border: 0px solid;
  background-color: white;
  width: 200px;
  height: 30px;
}

input[type=select] {
  background-color: purple;
}

select {
  background: white;
}

select option {
  background: white;
}

#vernisSelect {
  border: none;
  border-radius: 50px;
}

header {
  display: flex;
  align-items: center;
  width: auto;
  background: #f3e9f1;
}
header .logo {
  width: 300px;
  margin-left: auto;
  margin-right: auto;
}
header .panier {
  border: none;
  margin-right: 30px;
  width: 30px;
  height: 30px;
  background-image: url(./asset/shopping-basket-solid.svg);
  background-repeat: no-repeat;
}
header .panier:hover {
  margin-right: 30px;
  width: 30px;
  height: 30px;
  background-image: url(./asset/shopping-basket-solid-couleur.svg);
  transition: 0.1s;
  border: none;
}

footer {
  background-color: #f3e9f1;
  width: 100%;
  height: 100px;
  margin-top: auto;
}

/*# sourceMappingURL=style.cs.map */
