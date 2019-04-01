+++
title = "Discoverly #3 : DotGo 2019..."
date = "2019-03-28"
tags = ["discoverly", "golang", "dotgo", "meetup"]
+++

J'ai attendu un peu pour faire ce discoverly. Il va etre centré sur 6 sujets qui ont retenu mon attention
à la dotGo 2019. (dont je me souviens, car je n'ai pas pris de note...)

## dotGo 2019

Les dot conférences organisent des journées de talks avec les meilleurs speakers du sujet représenté dont
une journée sur Golang.

C'est ma deuxième participation à une dotGo. Elle se déroule au Théatre de Paris.
Durant cette jounée, il y a eu 12 talks et 5 lightning talks.

### Optimizing Go code without a blindfold - Daniel Martí

Ce talk a parlé de l'optimisation du code mais surtout de comment récupérer des métriques justes pour faire les bonnes
optimisations.

- [Les slides du talk](https://docs.google.com/presentation/d/1cUVp8OuzOW4lzClsiptgacW7nSFkcgvhLRVAOgVPpYg/edit#slide=id.g54b9fd6434_0_52)

### Go as a scripting language in Linux - Ignat Korchagin

Ce talk a tenté de faire de Golang un langage de scripting. Malheureusement, un simple shebang ne suffit pas...
J'ai bien aimé l'inutilité du sujet qui malgré tout nous en apprend...

- [Using Go as a scripting language in Linux](https://blog.cloudflare.com/using-go-as-a-scripting-language-in-linux/)

### Swimming Pool Semaphores - Valentin Deleplace

Valentin a expliqué différents patterns concurrentiels en Golang avec des sémaphores en utilisant
l'analogie d'un flux de nageur dans une psicine.

C'était un excellent lightning talk !

- [Les slides du talk](http://35.224.214.137:5050)

### Tune Your Garbage-Collector - Bryan Boreham

Ce talk a abordé le sujet du garbage collector et de son tuning. Il se résume à une variable d'environnement
`GOGC`. C'est un moyen simple d'améliorer les performances dans certains cas.

- [Twitter de Bryan Boreham](https://twitter.com/bboreham)

### Constants - Dave Cheney

Ce talk a abordé le problème des erreurs Sentinels et des constantes utilisable uniquement sur des type primitifs.

La gestion d'erreur est un gros sujet en Golang. Dave Cheney a d'ailleurs fait d'excellent articles à ce sujet :

- [Constant errors](https://dave.cheney.net/2016/04/07/constant-errors)
- [Don’t just check errors, handle them gracefully](https://dave.cheney.net/2016/04/27/dont-just-check-errors-handle-them-gracefully)

### Go 2 Error Values Today - Marcel van Lohuizen

Pour finir en beauté, Marcel van Lohuiven nous parle du nouveau package `errors` qui sortira en Golang 1.13.

- [Godoc package xerrors](https://godoc.org/golang.org/x/xerrors)

### Conclusion

La dotGo est un excellent événement. L'organisation est très impressionante. J'ai passé une excellente journée.
Les autres talks, que je n'ai pas mentionné, ne me concernaient pas directement mais n'en sont pas moins bon et intéréssant.
(Petite mention spécial au talk d'Ellen Körbes et son "dilator")

C'est fini pour l'édition 2019. La prochaine édition aura lieu le 30 Mars 2020.

*(Je mettrais le lien de chaque talk mentionné quand ils sortiront.)*

Quelques liens pour plus de détails :

- [Site officiel](https://www.dotgo.eu)
- [dotGo 2019 sketches, thanks Microsoft](https://www.flickr.com/photos/97226415@N08/sets/72157707845492994/)

## Quelques liens en vrac

- [Back to Traefik 2.0](https://blog.containo.us/back-to-traefik-2-0-2f9aa17be305)
- [Firefox Send](https://send.firefox.com/)
- [Time to Play Fair (Spotify vs. Apple)](https://www.timetoplayfair.com/timeline/)

*Fabien CASTERS*
