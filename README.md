# The Tchoos website

## TODO
- [x] Composants : 
    - [x] Text : ajouter une nouvelle taille et potentillement des fonts différentes
    - [x] Card : check la propreté du code
    - [x] Popup : check la propreté du code, revoir son fonctionnement et son style
    - [x] Button : clean total du code, repenser les différents types de bouton, utilisation de vrais event et revoir l'utilisation des href pour les liens
    - [x] IconButton : utilisation de vrais event et revoir l'utilisation des href pour les liens
    - [x] Input : retirer les margins
    - [x] Navbar : check la propreté du code
    - [x] MaiarLogin : réécriture complète, utiliser un autre package pour la création de QR code
    - [x] Notifications : véirifer si les notifications se retire dans le bon sens
- [ ] Account (API Endpoint) :
    - [x] Voir si il est possibler de réduire la taille actuel du code
    - [x] Créer des functions pour les requêtes suivantes : 
        - [x] Logout: https://github.com/Meta-Friend-Team/Tchoo-Back/blob/main/docs/routes/account/LOGOUT.md
        - [x] Link Wallet : https://github.com/Meta-Friend-Team/Tchoo-Back/blob/main/docs/routes/account/LINK_WALLET.md
        - [x] Is wallet linked : https://github.com/Meta-Friend-Team/Tchoo-Back/blob/main/docs/routes/account/IS_WALLET_LINKED.md
        - [x] Is token valid : https://github.com/Meta-Friend-Team/Tchoo-Back/blob/main/docs/routes/account/IS_TOKEN_VALID.md
        - [x] Get infos : https://github.com/Meta-Friend-Team/Tchoo-Back/blob/main/docs/routes/account/GET_INFOS.md
    - [ ] Créer un nouveau store pour le link wallet et utiliser celui-ci pour stocker le token qui est actuellement sauvegardé dans WalletStore de la lib Maiar
- [x] Ajouter des titres à toutes les pages
- [ ] Revoir le responsive sur iPhone :
    - [ ] Le design : remonter un peu les elements sur le header de la premiere page
    - [ ] Le bug du bouton "Mint a NFT" sur la premiere page qui passe par dessus la navbar
- [ ] Systeme de connection au wallet :
    - Finir le systeme de connection au wallet et la liaison pour le link avec l'API
    - Permettre un changement de wallet en appuyant à nouveau sur le bouton avec notre adresse wallet
- [ ] Vérifier si le token est toujours valide lors du premier chargement d'une page et faire un check à chaque request, si la personne n'est plus connecté, il faudra la rediriger vers la page de connection avec un paramètre de redirection sur la page ou il se situé

- [ ] Tester le systeme de connexion au Wallet sur le vrais net :
    - [ ] Maiar Extension
    - [ ] Maiar App
    - [ ] Ledger
    - [ ] Elrond Wallet