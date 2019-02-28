+++
title = "Discoverly #1 : Hugo, Loki, Todoist..."
date = "2019-01-28"
tags = ["discoverly", "loki", "hugo", "todoist", "devops", "golang", "productivité"]
+++

En 2019, je souhaite faire un article par mois sur mon blog.
Plutôt que de choisir un sujet, je vais mettre en vrac quelques sujets que je souhaite partager.
C'est aussi un bon moyen pour moi de garder une trace de ce que je découvre sur Internet.

Pour ce premier article mensuel, je vais vous présenter Hugo, Loki et Todoist.

## Hugo

Hugo est un générateur de site web statique, développé en Golang.
Il permet de générer des pages web (HTML, CSS, flux RSS...) et de les héberger sur un simple service HTTP comme Github Pages.
Il est constitué de fichiers templates Golang et de l'arboresence du contenu écrit en Markdown.
Il est difficile de faire plus simple.

Je voulais en parler car je viens de refaire ce blog avec ce générateur.
J'ai tellement apprécié l'outil et la documentation que j'en ai profité pour partager mon thème avec la communauté.

Quelques liens pour plus de détails :

- [Site officiel](https://gohugo.io)
- [Github du projet](https://github.com/gohugoio/hugo)
- [Le theme (m10c) du blog](https://themes.gohugo.io/hugo-theme-m10c/)
- [Les sources du blog](https://github.com/vaga/hugo-theme-m10c)
- [Forestry](https://forestry.io/)

## Loki

Loki, développé par Grafana, est une solution permettant de stocker, de rechercher et de visualiser les logs.
Cela a été release en alpha depuis mi-décembre 2018 et la version 6.0 de Grafana intègre la nouvelle source de donnée Loki.
Le site officiel annonce : Loki works like Prometheus but for logs.

Un grand nombre d'ops souhaitait une solution légère et alternative à une stack Elastic (Elasticsearch + Kibana + agent Beats).
Loki peut certainement répondre à cette problématique et le fait intelligement en suivant les principes de Prometheus.
Cependant, c'est encore en alpha, donc, wait & see.

Dernière remarque, Grafana a commencé par l'intégration de Loki avec Kubernetes mais ils prévoient d'autres supports.

Quelques liens pour plus de détails :

- [Github du projet](https://github.com/grafana/loki)
- [Loki Design Document](https://docs.google.com/document/d/11tjK_lvp1-SVsFZjgOTr1vV3-q6vBAsZYIQ5ZeYBkyM/view)
- [Article: Grafana Loki: Scalable and Flexible Logfile Management](https://www.inovex.de/blog/grafana-loki/)
- [Des questions et des réponses](https://news.ycombinator.com/item?id=18668938)


## Todoist

Todoist est un service de liste des tâches compatible Web, iOS, MacOS, Android.
Elle permet de créer des projets et d'y ajouter des tâches récurrentes, datées ou non.
On peut ajouter des labels, créer des filtres, imbriquer des tâches, mettre des rappels, partager des projets...
Certaines fonctionnalités sont payantes mais elle ne sont pas bloquantes pour se faire une idée.
Il existe un système de point Karma pour te motiver à atteindre tes objectifs.

Avant, j'utilisais un calendrier classique et le format ne me plaisait pas.
J'utilise Todoist depuis 2 mois.
Je prends du plaisir à inscrire mes tâches et à les compléter.
Je pense utiliser encore qu'un quart des fonctionnalités et je compte bien pousser encore mon utilisation et en faire une habitude.

Quelques liens pour plus de détails :

- [Site officiel](https://todoist.com)
- [Blog officiel contenant plein d'astuces](https://doist.com/blog/)


## Quelques articles en vrac

- [Article : The illusion of agility](https://guntherverheyen.com/2019/01/07/the-illusion-of-agility-what-most-agile-transformations-end-up-delivering/)
- [Article : Suicide social](https://page42.org/suicide-social/)

*Fabien CASTERS*
