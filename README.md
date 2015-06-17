# EM1

Aplicatie de evidenta a membrilor unei biserici.
### Version

0.1.0

### Download

Linkurile de download vor fi disponibile ulterior.

### Tech

EM1 foloseste urmatoarele technologii:

* [node.js] - JavaScript backend
* [electron] - aplicatii pentru desktop folosind technologii web
* [reactjs] - librarie pentru User Interfaces
* [flux] - arhitectura pentru aplicatii client-server
* [Twitter Bootstrap] - UI boilerplate
* [Gulp] - streaming build system

### Development

Vrei sa contribui? Foarte bine!

Cum sa contribui:

Instaleaza git, node si npm. Indiferent daca folosti OS X, Linux sau Windows, asigurate ca binarele sunt introduse in PATH.
Deschide un terminal si executa:

```sh
# descarca repo
$ git clone <repo>
# schimba directorul curent
$ cd em1
# instaleaza Electron si Gulp global (foloseste sudo in Linux/OS X)
$ npm install electron-prebuilt gulp -g
# instaleaza dependintele
$ npm install
# porneste aplicatia
$ npm start
```

### Distributie

Binarele pentru OS X, Linux si Windows le poti genera folosind comanda de mai jos. Ele vor fi create in directorul /dist

```sh
# build
$ npm build --all
```


### Todo's

* export/import
* raportare
* upgrade procedure

License
----

* [apache] -  Apache 2.0


[node.js]:http://nodejs.org
[electron]:http://electron.atom.io/
[reactjs]:https://facebook.github.io/react/
[flux]:https://facebook.github.io/flux/docs/overview.html
[Twitter Bootstrap]:http://twitter.github.com/bootstrap/
[Gulp]:http://gulpjs.com
[apache]:https://www.apache.org/licenses/LICENSE-2.0.html
