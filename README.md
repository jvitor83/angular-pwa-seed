# Angular PWA Seed (Template)

[![Join the chat at https://gitter.im/angular-pwa-seed/Lobby](https://badges.gitter.im/angular-pwa-seed/Lobby.svg)](https://gitter.im/angular-pwa-seed/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
[![Dependency Status](https://david-dm.org/jvitor83/angular-pwa-seed.svg)](https://david-dm.org/jvitor83/angular-pwa-seed)
[![devDependency Status](https://david-dm.org/jvitor83/angular-pwa-seed/dev-status.svg)](https://david-dm.org/jvitor83/angular-pwa-seed#info=devDependencies)
[![DONATE](https://pledgie.com/campaigns/32766.png?skin_name=chrome)](https://pledgie.com/campaigns/32766)


## Description

**Multiplatform** Angular project (_Web/PWA_, _Mobile_ and _Desktop_) with **[Ionic](http://ionicframework.com/)** applied.


## Sample

A sample is available at: https://angular-pwa-seed.netlify.com


> ## **TL;DR** _(Too Long; Didn't Read)_
> 
> _Just want to see this running on browser and android (if have the emulator already configured)!_
> 
> At shell/cmd run this _(windows only)_:
> ```Batchfile
> npm i -g @angular/cli cordova ionic@beta typescript && git clone https://github.com/jvitor83/angular-pwa-seed && cd angular-pwa-seed && npm i & start cmd.exe @cmd /k "npm run build.watch" & ping 127.0.0.1 -n 30 > nul & (IF DEFINED ANDROID_HOME npm run install.android) & start cmd.exe @cmd /k "npm run cordova.livesync"
> ```


## Goal

Be the easiest, simplest, fastest and performative way to create a **Web(PWA)** using Angular.


> ### Secondary goal
> Allow to create an installable application _(and **reach the maximum performance possible** in this hybrid application)_ using:
> - [x] [Crosswalk WebView](https://crosswalk-project.org/documentation/cordova.html)
> - [x] Simple layout (without complex animations/effects) based on Ionic - [KISS](https://en.wikipedia.org/wiki/KISS_principle)


## Features

- Multiplatform (Web, Mobile, Desktop) [Cordova](https://cordova.apache.org/docs/en/latest/guide/support/index.html)
- Layout out-of-box (Mobile Friendly) ([Ionic](http://ionicframework.com/)/[Boostrap](http://getbootstrap.com/))
- [Authentication/Authorization (OpenID/OAuth2)](https://github.com/IdentityModel/oidc-client-js/wiki)
- VSCode Integration ([Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome), [Cordova Tools](https://marketplace.visualstudio.com/items?itemName=vsmobile.cordova-tools))
- Angular CLI project ([Generator commands](https://github.com/angular/angular-cli#generating-components-directives-pipes-and-services))

> ### Performance features
> - [x] [Angular Ahead-Of-Time Compilation](https://angular.io/docs/ts/latest/cookbook/aot-compiler.html)
> - [x] [Angular Lazy Loading Modules with PreloadAllModules Strategy](https://vsavkin.com/angular-router-preloading-modules-ba3c75e424cb)
> - [x] [Progressive Web App _Features_](https://developers.google.com/web/#progressive-web-apps) - Manifest and Offline _(for faster loading)_



## Technologies

- [Angular](http://angular.io/)
- [Angular CLI](https://cli.angular.io/)
- [Ionic](http://ionicframework.com/)
- [Cordova](https://cordova.apache.org/)
- [Boostrap](http://getbootstrap.com/)
- [OpenID/OAuth2 Client](https://github.com/IdentityModel/oidc-client-js)


## Requirements

- **GIT**: Have installed or Install GIT: [https://git-scm.com/downloads](https://git-scm.com/downloads)
- **NODE**: Have installed or Install NODE **(6.X.X)**: [https://nodejs.org/en/download/releases/](https://nodejs.org/en/download/releases/) 
- **Install Global Dependencies**: `npm install --global @angular/cli cordova ionic@beta typescript`
- **Install Platform Requirements** _(optional if other different than web)_: See the **requirements** at **running** section according to your chosen platform. 

## Starting

```bash
# Clone this repository
git clone https://github.com/jvitor83/angular-pwa-seed
cd angular-pwa-seed

# Install the project's dependencies
npm install

# (Optionally) Start the project
npm run start
```


## Running

You could use:
- **[Angular-CLI commands](https://github.com/angular/angular-cli#usage)** to get it running on web (`ng serve`)
and/or
- **[Cordova commands](https://cordova.apache.org/docs/en/latest/guide/cli/index.html#build-the-app)** to get it running at others platforms (`cordova platform add android && cordova run android`).

> _Only remember to **first build the angular** `ng build` , **then run the cordova** `cordova run android`._

So, the steps are:

| Web              | Cordova                                                                               |
|------------------|---------------------------------------------------------------------------------------|
| - Run `ng serve` | - Compile the App `ng build`                                                          |
|                  | - Install your desired platform **(one time only)** `cordova platform add android --save` |
|                  | - Run your desired platform `cordova run android`                                     |

> **[VSCode:](https://code.visualstudio.com/)** **Running on Web:** <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>B</kbd> then <kbd>F5</kbd>


**Requirements:**

> Each platform has your specific requirements (SDK, Tools, environment) to compile/run.
> > _- Ex: To compile/run android, must have Android Studio or Android SDK installed and a emulator or device._

> > _- Ex: To compile windows, must have Visual Studio and be on windows to run._

> See the links below to know how to install each requirement.


**You could use some custom npm scripts/commands to install/run the platform:**


| PLATFORM       | REQUIREMENTS/*GUIDE (Tools, Sdk, etc)*                                                        | INSTALL                   | RUN                     |
|----------------|-----------------------------------------------------------------------------------------------|---------------------------|-------------------------|
| Web            |                                                                                               |                           | `npm run start`         |
| Android        | [Platform Guide](http://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html) | `npm run install.android` | `npm run start.android` |
| IOS            | [Platform Guide](http://cordova.apache.org/docs/en/latest/guide/platforms/ios/index.html)     | `npm run install.ios`     | `npm run start.ios`     |
| Windows        | [Platform Guide](http://cordova.apache.org/docs/en/latest/guide/platforms/win8/index.html)    | `npm run install.windows` | `npm run start.windows` |
| OSx            | [Platform Guide](http://cordova.apache.org/docs/en/latest/guide/platforms/osx/index.html)     | `npm run install.osx`     | `npm run start.osx`     |
| Ubuntu (Linux) | [Platform Guide](http://cordova.apache.org/docs/en/latest/guide/platforms/ubuntu/index.html)  | `npm run install.ubuntu`  | `npm run start.ubuntu`  |
| Browser        |                                                                                               | `npm run install.browser` | `npm run start.browser` |


### Multiplatform

You can try multiple platform at same time using:
- Open shell then run `npm run build.watch`
- Open **another** shell then run `npm run ionic.livesync`
> _If you want to see it in a emulator (non-web), then run `npm run cordova.livesync`_



## Structure

```
├── src                             <- source code of the application
│   ├── app                         <- angular components
```

More details at: [Angular CLI](https://cli.angular.io/) and [Ionic](http://ionicframework.com/docs/v2/components/)


## AddOns

### VSCode

Recommended extensions:
- [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)
- [AngularDoc for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=AngularDoc.angulardoc-vscode)
- [Auto Import](https://marketplace.visualstudio.com/items?itemName=steoates.autoimport)
- [Cordova Tools](https://marketplace.visualstudio.com/items?itemName=vsmobile.cordova-tools)
- [Angular Snippets](https://marketplace.visualstudio.com/items?itemName=johnpapa.Angular2)
- [Ionic 2 Snippets](https://marketplace.visualstudio.com/items?itemName=oudZy.ionic2-snippets)
- [Ionic 2 Commands](https://marketplace.visualstudio.com/items?itemName=jgw9617.ionic2-vscode)
- [Bootstrap 3 Snippets](https://marketplace.visualstudio.com/items?itemName=wcwhitehead.bootstrap-3-snippets) or [Bootstrap 4 Snippets](https://marketplace.visualstudio.com/items?itemName=thekalinga.bootstrap4-vscode)
