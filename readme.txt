FlipPage: Tournez les pages sur votre iPad !
============================================

FlipPage est un plugin jQuery créant l'illusion de tourner les pages d'un livre.
Développé à l'origine pour une présentation sur tablette tactile, il peut aussi trouver sa place dans une application de livre électronique par exemple.

Ce plugin a été développé en  HTML5/CSS3 afin d'utiliser la puissance graphique hardware et de créer ainsi une animation plus fluide.

Vous trouverez des exemples d'utilisation ci-après, et n'hésitez pas à me laisser vos impressions et vos suggestions ;)

Navigateurs normalement compatibles
-----------------------------------
iPhone/iPad/iPod Touch - Android - Firefox 3.6+ - Chrome - IE 9 (sans animation) - IE10 

Navigateurs testés
------------------
iPhone 3G / iPhone 3GS / iPad 1 / iPad 2 - Android - Firefox 6 - Firefox 7 Beta - Safari - IE9 - IE10

Licence
-------
LGPL v3

Version actuelle
----------------
v0.6.4

Changelog
---------
- v0.6.4 - 02/07/2016: Ajout du fichier package.json pour publication sur npm (thanks Rob for this request)
- v0.6.2 - 20/11/2012: Correction de Bug sous jQuery 1.8
- v0.6.1 - 12/11/2012: Correction de Bug sous IE10
- v0.6.0 - 19/09/2012: Ajout des trigger 'next' et 'previous' pour changer les pages en mode programmation.
- v0.5.1: Ajout d'un délai pour éviter de changer la page lors d'un click involontaire
- v0.5.0: Import initial 

Demo
----
http://flippage.marcbuils.fr

Exemple d'utilisation
---------------------
```
<div id="exemple2">
    <div><h3>Page 1</h3></div>
    <div><h3>Page 2</h3>  <a href="#" onclick="alert('Pages are clickable !'); return false;">Test me</a> </div>
    <div><h3>Page 3</h3></div>
    <div><h3>Page 4</h3></div>
</div>

<script>
 $(document).ready(function(){
     $('#exemple2').flippage({
         width: 300,
         height: 150
     });
 });
</script>
```
