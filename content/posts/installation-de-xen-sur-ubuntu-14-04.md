---
title: "Installation de Xen sur Ubuntu 14.04"
description: "Installation et configuration de Xen sur Ubuntu 14.04"
date: "2014-07-18"
tags: ["xen", "ubuntu", "sysadmin"]
---

Depuis 3 mois, avec un ami, nous louons un serveur de la gamme IP chez SoYouStart.
C'est un serveur de 4 coeurs, 48 Go de RAM et 2 To de disc durs.
Dans cette gamme, on a aussi le droit à 16 IPs.
Nous avons pris cette machine pour pouvoir virtualiser et déployer rapidement nos projets et nos tests.

Ca a un coût mais il me fallait un serveur personnel alors pourquoi pas partager les frais avec quelqu'un et se faire plaisir.

Pour la virtualisation, nous avons choisi d'installer Xen. C'est pourquoi j'ai décidé de vous faire partager l'installation de notre machine.

On va passé l'étape d'installation d'Ubuntu 14.04 et on s'attaque directement à l'installation de Xen. :)

## Installation de Xen

On commence toujours par un petit :
```
# apt-get update
# apt-get upgrade
```
Et on installe Xen :
```
# apt-get install xen-hypervisor
```
Avant de poursuivre, il y a 2 termes à connaître : dom0 et domU.  
Le dom0 est la machine physique, la mère des domU.  
Le domU est donc les machines virtuelles, les enfants de dom0.

On peut passer à la configuration.

## Configuration de base du dom0

Pour commencer, on configure le GRUB pour qu'il lance Xen avec Ubuntu. La variable `XEN_OVERRIDE_GRUB_DEFAULT` nous permet de le faire très simplement. (Elle n'existe pas sur Debian) On profite d'être dans ce fichier pour limiter la RAM du dom0 à 1Go. Il n'a pas besoin de plus.
```
# vim /etc/default/grub.d/xen.cfg
    XEN_OVERRIDE_GRUB_DEFAULT=1
    GRUB_CMDLINE_XEN="dom0_mem=1024M"
```
On met le grub à jour.
```
# update-grub
```

Ensuite, nous avons le choix entre 2 méthodes pour configurer et gérer les VMs : XL et XEND.
Cependant, XEND est une méthode dépreciée par Xen depuis la version 4.1. Donc, on suit et on choisit XL.

Continuons !  
On désactive la gestion automatique de la mémoire du dom0 :
```
# vim /etc/xen/xl.conf
    autoballoon="0"
```
Lorsqu'on regarde dans la documentation de Xen, il nous conseille de désactiver la restauration et la sauvegarde des domU car cela peut poser des problèmes.
Faisons le :
```
# vim /etc/default/xendomains
    XENDOMAINS_SAVE=
    XENDOMAINS_RESTORE=false
```

Voilà, on a la configuration de base pour notre dom0. On redémarre la machine pour prendre en compte les modifications :
```
# reboot
```
Nous vérifions grâce à `xl list` que notre dom0 a bien prit en compte les dernières configurations.

## Configuration des outils pour Xen

On va installer `xen-tools`. C'est un paquet contenant des scripts Perl pour configurer les VMs :
```
# apt-get install xen-tools
```
Ensuite, on crée un dossier xen dans le /home pour accueillir nos VMs.
```
# mkdir /home/xen
```
Nous modifions quelques configurations de xen-tools tel que le chemin du dossier contenant les VMs, l'architecture et le format de nos VMs.
```
# vim /etc/xen-tools/xen-tools.conf
    dir = /home/xen
    arch = amd64
    fs = ext4
```

## Configuration du réseau en mode bridge

Nous avons un serveur qui peut accueillir des VMs. Maintenant, il faut que ces VMs puissent communiquer avec le reste du monde.

On commence par ajouter une interface à notre dom0
```
# vim /etc/network/interfaces
    auto xenbr0
    iface xenbr0 inet dhcp
        bridge_ports eth0
```

On configure `xen-tools` au niveau réseau pour nos VMs :
```
# vim /etc/xen-tools/xen-tools.conf
    gateway    = 94.23.240.254 (IP du dom0 avec 254 à la fin pour les offres SYS)
    netmask    = 255.255.255.255
    broadcast  = 94.23.240.XXX (IP du dom0)
```

Et enfin, on autorise notre dom0 à transmettre les paquets à nos domU :
```
# vim /etc/sysctl.conf
    net.ipv4.conf.eth0.proxy_arp=1
    net.ipv4.ip_forward=1
# sysctl -p /etc/sysctl.conf
```

## Création de notre première VM

On a écrit un fichier que nous éditons avant chaque création de VM.
C'est un bon moyen pour ne pas oublier un paramètre.
Avant de remplir ce fichier, on prend une IP diponible dans le panel de SoYouStart et on génère une adresse MAC virtuelle.
```
# vim /root/create_vm.sh
    HOSTNAME='domu.vaga.io'
    IP='178.32.243.121'
    MAC='00:00:00:00:00:00'
    BROADCAST=$IP

    DISTRIB='trusty'

    CPUS='4'
    RAM='4096M'
    DISK='100G'

    xen-create-image --hostname $HOSTNAME --ip $IP --broadcast $BROADCAST --mac $MAC --vcpus $CPUS --memory $RAM --size $DISK --dist $DISTRIB
```
On lance notre script :
```
# chmod u+x /root/create_vm
# /root/create_vm
```
**Attention, on vous donne votre mot de passe root vers la fin.**

On va enfin créer et lancer notre première VM :
```
# xl create /etc/xen/domu.vaga.io
```
Ca y'est, notre VM est en place. Avec un `xl list`, on peut vérifier qu'elle tourne avec les bonnes configurations.
Ensuite, on se connecte via :
```
# xl console domu.vaga.io
```
On se connecte en root avec le mot de passe donné à la fin de l'installation. On ajoute les routes nécessaire afin d'avoir Internet.
```
domU # vi /etc/network/interface
            post-up route add 94.23.240.254 dev eth0
            post-up route add default gw 94.23.240.254
            pre-down route del 94.23.240.254 dev eth0
            pre-down route del default gw 94.23.240.254
```
On reboot la VM.
```
domU # reboot
```
On se reconnecte à la VM :
```
# xl console minecraft.wayt.me
```
On vérifie avec un petit `ping google.fr`.

Tadaaaa, nous avons notre première VM.  
Il reste à securiser les services actifs et à installer d'autres services. Mais ca, je vous laisse faire. :)

Une astuce avant de conclure, on peut ajouter un script après la création de la VM. Il faut ajouter l'option `--role` suivi du path du script à la commande `xen-create-image`. Nous utilisons ce script :
```
#!/bin/sh

prefix=$1

if [ -e /usr/share/xen-tools/common.sh ]; then
    . /usr/share/xen-tools/common.sh
else
    echo "Installation problem"
fi

# Add default route
sed '/iface eth0 inet static/a post-up route add 94.23.240.254 dev eth0\n post-up route add default gw 94.23.240.254\n pre-down route del 94.23.240.254 dev eth0\n pre-down route del default gw 94.23.240.254' -i ${prefix}/etc/network/interfaces

# Install munin-node
chroot ${prefix} apt-get update
chroot ${prefix} apt-get install munin-node -y
sed '/allow ^127\\.0\\.0\\.1\$/aallow ^94\\.23\\.240\\.159\$' -i ${prefix}/etc/munin/munin-node.conf

# Install tools
chroot ${prefix} apt-get install vim htop -y
```

## Conclusion

Cette idée vient de Maxime et c'est une très bonne idée. On ne se pose plus la question d'où héberger nos services et nous pouvons tous les séparer pour garder des environnements propres.

## Quelques liens
[OVH : BridgeClient](http://guide.ovh.com/BridgeClient)  
[Xen Project Best Practices](http://wiki.xenproject.org/wiki/Xen_Project_Best_Practices)  
[Le twitter de Maxime](http://twitter.com/Max_Wayt)

*Fabien Casters*

