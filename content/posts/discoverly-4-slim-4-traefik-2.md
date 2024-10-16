+++
title = "Discoverly #4 : Slim 4, Traefik 2..."
date = "2019-04-29"
tags = ["discoverly", "slimphp", "traefik", "devops", "php", "golang"]
+++

C'est fait ! La décision a été prise, je ne suis plus un simple salarié. Nous venons de m'embaucher chez Owaka.
Cela fait déjà 7 ans que nous avons monté cette entreprise. Je suis le premier salarié et c'est le moment
d'accélerer les développements pour faire évoluer plus rapidement notre solution. C'est excitant !

Ce mois-ci, je vais présenter deux projets qui viennent de sortir la version alpha de leur prochaine release majeure.

## Slim 4

Slim est un micro framework PHP gérant les couches essentielles d'une application HTTP. (routeur, middleware et injection de dépendance)
La version 4 apporte beaucoup de modularité et d'amélioration.

Maintenant, le framework requiert la version PHP 7.1 au minimum. Il est maintenant centré sur les middlewares. Beaucoup de configurations
sont retirées et remplacées par l'implémentation de middleware. Par exemple, la gestion d'erreurs a été migrée dans un middleware.
Cela va permettre de mieux customiser et intéragir avec les exceptions.

Ils ont aussi découplé les dépendances et amélioré l'interopérabilité des implémentations (PSR-7, PSR-11, PSR-15, PSR-17 et aussi
sur les interfaces du routeur). Malgré tout, l'instanciation d'une application Slim reste simple grâce à une factory. (`AppFactory::create()`)

Ces changements ont rendu le code de Slim plus lisible. On le voit clairement grâce à un benchmark qu'Akrabat a publié sur son blog :
```
                                    Slim 3    Slim 4-dev
Cyclomatic Complexity
  Average Complexity per LLOC         0.30          0.18
  Average Complexity per Class       10.40          4.76
    Minimum Class Complexity          1.00          1.00
    Maximum Class Complexity         67.00         25.00
  Average Complexity per Method       2.44          2.05
    Minimum Method Complexity         1.00          1.00
    Maximum Method Complexity        15.00         15.00

```
Source : [Slim 3 vs Slim 4-dev phploc](https://gist.github.com/akrabat/6b486ecd861105301a194cbf1e360dc4)

C'est pour moi une excellente nouvelle version : plus de modularité, plus de qualité et moins de code. J'ai hâte de pouvoir migrer vers
la version stable.

Quelques liens pour plus de détails :

- [Slim 4.0.0-alpha released](http://www.slimframework.com/2019/04/25/slim-4.0.0-alpha-release.html)
- [Slim 4 documentation](http://dev.slimframework.com/docs/v4/)
- [Slim 4 Cyclomatic Complexity](https://akrabat.com/slim-4-cyclomatic-complexity/)

## Traefik 2

Traefik est un reverse proxy dynamique compatible avec plusieurs providers (Swarm, Rancher, Kubernetes, Consul, Etcd...)

Cette nouvelle version arrive avec une fonctionnalité que la communauté attendait depuis 2015, c'est le support complet du protocol TCP.

Ensuite, elle vient améliorer les étapes intermédiaires entre le frontend et le backend pour plus de modularité. Elle ajoute des middlewares
pour mettre à jour les requêtes (basic auth, redirection, compression...). Grâce à cette refactorisation, ils annoncent pouvoir ajouter
des middlewares plus facilement dans un futur proche. Ils améliorent aussi la syntaxe des règles pour rediriger les requêtes vers les bons services.

Cependant, toutes les features ne sont pas encore terminées. Ils doivent encore ajouter quelques providers présents dans la première version.
Ils ont annoncé l'ajout du support du protocol UDP, l'ajout d'une fonctionnalité de canary et l'amélioration de l'interface.

C'est encore pour moi une excellente nouvelle. Traefik garde sa simplicité et apporte avec efficacité des nouvelles fonctionnalités très attendues.
Personnellement, je suis impatient de voir leur fonctionnalité de canary.

Quelques liens pour plus de détails :

- [Back to Traefik 2.0](https://blog.containo.us/back-to-traefik-2-0-2f9aa17be305)
- [Traefik 2 documentation](https://docs.traefik.io/v2.0/)

## Quelques articles en vrac

- [Projet : K3s Lightweight Kubernetes](https://k3s.io/)
- [Thread Twitter : #ClavierFrançais](https://threadreaderapp.com/thread/1113079690472943617.html)
