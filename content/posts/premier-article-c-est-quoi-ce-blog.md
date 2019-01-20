---
title: "Le premier article, c'est quoi ce blog ?"
date: "2014-07-02"
tags: ["bienvenue", "nodejs", "nginx", "web"]
---

Depuis 2 ou 3 ans, j'ai envie d’écrire des articles sur mes découvertes et mes humeurs de développeur.

Pour inaugurer ce blog, je vais vous expliquer le fonctionnement de celui-ci. :)

## Le principe du blog

Je n'avais pas envie d'installer un CMS comme Wordpress ou Dotclear. Je voulais un système simple, léger et efficace.
En plus de ces 3 critères, je souhaitais découvrir NodeJS. C'est une technologie très **hype** actuellement. :D

C'est parti !  
Je me lance donc à la recherche de blog en NodeJS et j'en trouve une montagne (poet, typhoon, blogit, wintersmith...).
Après cette recherche, je savais ce que je voulais : Des articles écrits en Markdown et les publier grâce à Git.
Cela existe déjà mais sans intérêt pour moi qui voulait écrire du Javascript et apprendre la base de NodeJS. J'ai donc fait mon propre système.

Le projet est sur mon Github : http://github.com/Vaga/m10c-blog

## La publication d'un article

Aujourd'hui, pour faire un article, j'ouvre un nouveau fichier dans mon dossier `posts/` : `vim posts/le-slug-de-mon-article.md` et j'écris ceci :
```markdown
{{{
    "title"         : "Le titre de mon article",
    "date"          : "07-02-2014",
    "tags"          : ["les", "tags", "de", "mon", "article"]
}}}

Ici le contenu de mon article
```
Après écriture, je pousse l'article sur le git.

Pour finir, Github reçoit le commit et envoie une requête sur http://vaga.io/sync/secret_token. Cela permet à mon script NodeJS de mettre à jour les articles.
Ceci est possible grâce aux Webhooks de Github : https://developer.github.com/webhooks/.  
On trouve ce service dans les paramètres du repo et dans l'onglet *Webhooks & Services*.

## La mise en production

J'ai installé nginx et forever.
```bash
# apt-get install nginx
# npm install forever -g
```
Nginx va me servir de proxy. Il va faire suivre les requêtes de vaga.io:80 sur 127.0.0.1:8106. (8106 est le port défini dans le fichier `app.js`)
```nginx
server {
    listen 80;
    server_name vaga.io;

    access_log /var/log/vaga.io.access.log;
    error_log /var/log/vaga.io.error.log;

    location / {
        proxy_pass http://127.0.0.1:8106;
    }
}
```
Pour les utilisateurs d'Apache2, on remarque que la syntaxe de nginx est plus sympa et nous n'avons pas besoin de module complémentaire.

Ensuite, je lance mon blog à l'aide de forever. Il permet de lancer un script NodeJS en continu.
```bash
$ forever start app.js
```
Et voilà, le blog est en ligne.

## Conclusion

J'ai réussi à faire ce que je voulais le plus simplement possible et je suis content du résultat.

C'est la fin du premier article.
Il manque certainement des explications pour qu'un néophyte comprenne totalement l'article.
N’hésitez pas à me contacter pour me donner votre avis : [@vaga_io](http://twitter.com/vaga_io)

*Fabien Casters*

