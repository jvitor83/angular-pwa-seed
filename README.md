# Angular(2) Seed CLI Admin (Template)

[![Join the chat at https://gitter.im/angular-seed-cli-admin/Lobby](https://badges.gitter.im/angular-seed-cli-admin/Lobby.svg)](https://gitter.im/angular-seed-cli-admin/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
[![Dependency Status](https://david-dm.org/jvitor83/angular-seed-cli-admin.svg)](https://david-dm.org/jvitor83/angular-seed-cli-admin)
[![devDependency Status](https://david-dm.org/jvitor83/angular-seed-cli-admin/dev-status.svg)](https://david-dm.org/jvitor83/angular-seed-cli-admin#info=devDependencies)


## Description

**Multiplatform** Angular 2 project (_Web_, _Mobile_ and _Desktop_) with a **[admin template (CoreUI)](https://github.com/mrholek/CoreUI-Free-Bootstrap-Admin-Template)** applied.


## Goal

Be the easiest, simplest, fastest and performative way to create a **Hybrid Application** using Angular 2.


> ### Secondary goal
> Try to reach the maximum performance possible in a hybrid mobile application using:
> - [Crosswalk WebView](https://crosswalk-project.org/documentation/cordova.html)
> - [Angular 2 Ahead-Of-Time Compilation](https://angular.io/docs/ts/latest/cookbook/aot-compiler.html)
> - [Progressive Web App _Features_](https://developers.google.com/web/#progressive-web-apps) - Applicability study
> - Simple layout (without complex animations/effects) - [KISS](https://en.wikipedia.org/wiki/KISS_principle)


## Features

- Multiplatform (Web, Mobile, Desktop) [Cordova](https://cordova.apache.org/docs/en/latest/guide/support/index.html)
- Layout out-of-box ([CoreUI](http://coreui.io/)/[Boostrap](http://getbootstrap.com/))
- [Authentication/Authorization (OpenID/OAuth2)](https://github.com/IdentityModel/oidc-client-js/wiki)
- [Angular CLI generator](https://github.com/angular/angular-cli#generating-components-directives-pipes-and-services) 


## Technologies

- [Angular 2](http://angular.io/)
- [Angular CLI](https://cli.angular.io/)
- [Cordova](https://cordova.apache.org/)
- [CoreUI](http://coreui.io/)
- [Boostrap](http://getbootstrap.com/)
- [OpenID/OAuth2 Client](https://github.com/IdentityModel/oidc-client-js)



## TODOs

- [x] Test Web
- [x] Test Browser (Cordova)
- [x] Test Windows (Cordova)
- [x] Test Android (Cordova)
- [ ] Test iOS (Cordova)
- [ ] Test OSx (Cordova)
- [ ] Test Ubuntu (Cordova)
- [ ] Test others dev environment (Non Windows)


## Requirements

- **GIT**: Have installed or Install GIT: [https://git-scm.com/downloads](https://git-scm.com/downloads)
- **NODE**: Have installed or Install NODE (5.XX): [https://nodejs.org/en/download/releases/](https://nodejs.org/en/download/releases/) 
- Install Global Dependencies: `npm install --global angular-cli cordova typescript`

## Starting

```bash
# Clone this repository
git clone https://github.com/jvitor83/angular-seed-cli-admin
cd angular-seed-cli-admin

# Install the project's dependencies
npm install
```


## Running

You could use Angular-CLI commands to get it running on web (`ng serve`) and Cordova commands to get it running at others platforms (`cordova platform add android && cordova run android`).

So, the steps are:
- Compile the App `ng build`
- Install your desired platform `cordova platform add android` _(or none in case of web only)_
- Run your desired platform `cordova run android`

> Each platform has your specific requirements (SDK, Tools, environment) to compile/run.
> > - Ex: To compile/run android, must have Android Studio or Android SDK installed and a emulator or device.
> > - Ex: To compile windows, must have Visual Studio and be on windows to run.

> See the links below to know how to install each.


**You could use some custom npm scripts/commands to install/run:**


| PLATFORM       | REQUIREMENTS/*GUIDE (Tools, Sdk, etc)*                                                        | INSTALL                   | RUN                     |
|----------------|-----------------------------------------------------------------------------------------------|---------------------------|-------------------------|
| Web            |                                                                                               |                           | `npm run start`         |
| Android        | [Platform Guide](http://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html) | `npm run install.android` | `npm run start.android` |
| IOS            | [Platform Guide](http://cordova.apache.org/docs/en/latest/guide/platforms/ios/index.html)     | `npm run install.ios`     | `npm run start.ios`     |
| Windows        | [Platform Guide](http://cordova.apache.org/docs/en/latest/guide/platforms/win8/index.html)    | `npm run install.windows` | `npm run start.windows` |
| OSx            | [Platform Guide](http://cordova.apache.org/docs/en/latest/guide/platforms/osx/index.html)     | `npm run install.osx`     | `npm run start.osx`     |
| Ubuntu (Linux) | [Platform Guide](http://cordova.apache.org/docs/en/latest/guide/platforms/ubuntu/index.html)  | `npm run install.ubuntu`  | `npm run start.ubuntu`  |
| Browser        |                                                                                               | `npm run install.browser` | `npm run start.browser` |


## Structure

```
├── src                             <- source code of the application
│   ├── app                         <- angular components
```

More details at: [Angular CLI](https://cli.angular.io/) and [CoreUI](https://github.com/mrholek/CoreUI-Free-Bootstrap-Admin-Template/tree/master/Angular2_CLI_Starter)


> ## TL;DR;
> 
> _Just want to see this running on android!_
> On shell/cmd run this:
> ```bash
> git clone https://github.com/jvitor83/angular-seed-cli-admin && cd angular-seed-cli-admin && npm i && npm run install.android && npm run start.android
> ```
