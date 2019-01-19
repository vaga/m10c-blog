---
title: "Partager rapidement un fichier avec byt.tl"
date: "2015-12-24"
tags: ["golang", "web", "service", "docker"]
---

Je fais un petit article pour présenter un service que j'ai réalisé avec [Wayt](http://wayt.me).

Nous cherchions un moyen rapide et simple pour partager des fichiers.  
Le principe était de pouvoir le décliner sur plusieurs plateformes (un site web, un terminal...)

Pour faire vite fait le tour, on a :

- un service en golang qui nous permet de stocker les fichiers (une micro API)
- une interface web très minimaliste
- un binaire pour envoyer un fichier depuis un terminal

Le tout est sur une image Docker prêt à être déployé :
```
docker run --name byt --restart=always -p 80:8080 -v /local/data:/data maxwayt/byt:latest
```

## Liens
[Github - Byt.tl](http://github.com/byttl)  
[Site web - Byt.tl](http://byt.tl)

*Fabien Casters*

