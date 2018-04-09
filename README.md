# UltraTeam 7.1 : Server - Data Viz 
This project is a project carried out by two teams, this is the server part with data visualization.

The first team composed of Enzo MOLION and Léo VALETTE [UltraTeamMV](https://air.imag.fr/index.php/RICM4_2017_2018_-_UltraTeamMV) is in charge of creating a mobile application allowing the members of a team or a group of hikers to locate each other with different information such as walking speed, distance between users, the possibility to see if a user is in distress (e. g. if he has broken a leg), etc.

This application will use the LoRa network with ESP-32 cards, connected via Bluetooth to the team's smartphones to run.

The smartphones of the team, if they are connected to the 3G/4G network, will send through a REST API all the information accumulated during the hike to a server that our team composed of Bastien TERRIER and Hugo GROS-DAILLON will have to set up.

This server will be implemented with the JHipster application generator. It will be a web application allowing hikers to create an account and thanks to the information provided by the mobile application, to visualize the information of the current or completed hike (with the route taken during the hike, average speed, participating members, etc.).

It can also be used to visualize the position of hikers during a hike and display whether a person sent a distress signal with their smartphone. This can be useful in cases where rescue workers are trying to locate the injured person precisely.

## Team
-   Supervisor : [Didier DONSEZ](http://lig-membres.imag.fr/donsez/)

-   Members : Hugo GROS-DAILLON, Bastien TERRIER

-   Departement : [RICM 4](http://www.polytech-grenoble.fr/ricm.html), [Polytech Grenoble](https://air.imag.fr/index.php/Polytech_Grenoble "Polytech Grenoble")

# Development 

This project is based on [JHipster](http://www.jhipster.tech/). Please read carefully this general ducomentation. To run our aplication, you will need some to install some applications. 

## Preconditions / Installation

1.  Install Java 8 from [the Oracle website](http://www.oracle.com/technetwork/java/javase/downloads/index.html).
2.  Install Node.js from [the Node.js website](http://nodejs.org/) 
3.  Install Yarn from [the Yarn website](https://yarnpkg.com/en/docs/install)
4.  Install Yeoman: `yarn global add yo`
5.  Install JHipster: `yarn global add generator-jhipster`
6.  Import the project from GitLab.

## Run UltraTeam 7.1 Application

First, you have to go in the project directory. Then, execute the following commands :
* `yarn install` Wait until the end of the execution (it may takes a few minutes)
* `./mvnw` in the current directory (root of the project)
* `yarn start` in the same directory but in an other terminal


# Create a (new) JHipster application
To create a new JHipster application you can run `jhispter` or use [JHipster Online](https://start.jhipster.tech/#/). 
To help you in this step, these were our arguments for the generation :

* Which *type* of application would you like to create? 

    ❯ Monolithic application (recommended for simple projects) 
* Do you want to use the JHipster Registry to configure, monitor and scale your 
application? 

    ❯ No 
* Which *type* of authentication would you like to use?

    ❯ JWT authentication (stateless, with a token) 
* Which *type* of database would you like to use? 

    ❯ SQL (H2, MySQL, MariaDB, PostgreSQL, Oracle, MSSQL) 
* Which *production* database would you like to use? 

    ❯ MySQL 
* Which *development* database would you like to use? 

    ❯ H2 with disk-based persistence 
* Do you want to use the Spring cache abstraction? 

    ❯ No
* Would you like to use Maven or Gradle for building the backend? 

    ❯ Maven
*  Which other technologies would you like to use? 

    ◉ Social login (Google, Facebook, Twitter)
    
    ◯ Search engine using Elasticsearch
    
    ◯ WebSockets using Spring Websocket
    
     ◉ API first development using swagger-codegen

     ◯ Asynchronous messages using Apache Kafka
* Which *Framework* would you like to use for the client? 

    ❯ Angular 5 
* Would you like to enable *SASS* support using the LibSass stylesheet preproces
sor? 

    ❯ Yes
* Would you like to enable internationalization support? 

    ❯ Yes
* Please choose the native language of the application 

    ❯ French 
* Please choose additional languages to install 

     ◯ Dutch
 
    ◉ English
 
    ◯ Estonian
* Besides JUnit and Karma, which testing frameworks would you like to use? 
 
    ◉ Gatling
 
    ◉ Cucumber
 
    ◉ Protractor
*  Would you like to install other generators from the JHipster Marketplace? 

     ❯ Yes
* Which other modules would you like to use? 
 
    ◉ (generator-jhipster-ci-1.0.0) JHipster module, Continuous Integration support
 in your JHipster application
 
    ◉ (generator-jhipster-swagger-api-first-1.0.1) JHipster module to support API f
irst development using swagger
 
    ◉ (generator-jhipster-leaflet-1.0.0) JHipster module to install a sample of ui-
leaflet maps on your JHipster application.

     ◉ (generator-jhipster-material-0.0.0) A Jhipster based generator to create Angu
lar material + spring boot application
 
    ◉ (generator-jhipster-ionic-3.1.1) A JHipster Module that generates an Ionic Cl
ient


Well done, you have just created your first JHipster application ! 


Then, you have to create your entities using a [JDL](http://www.jhipster.tech/jdl/) file (we advise you to use [JDL Studio](https://start.jhipster.tech/jdl-studio/)).

This is our jdl file to show you an example. 

``` text
enum Sex {
    MAN, WOMAN
  }

entity Hiker {
  firstname String required
  name String required
  sex Sex
  birthdate LocalDate
  phone_number String
  anaerobic_maximum_speed  Integer
  weight Integer
}
paginate Hiker with pagination
service Hiker with serviceClass

entity Message {
  longitude Long required min(0) max(360)
  latitude Long required min(0) max(360)
  date_time ZonedDateTime required
  sos Boolean required
  espON Boolean required
  heart_rate Integer
}
paginate Message with pagination
service Message with serviceClass

entity Hike {
  hike_name String
  meeting_place String
  positive_drop Integer
  duration Integer
  date ZonedDateTime

}
paginate Hike with pagination
service Hike with serviceClass


relationship ManyToMany {
    Hiker{itinerary} to Hike{walker}
}
relationship OneToMany {
    Hiker{position} to Message{sender}
}

relationship OneToMany {
    Hike{message} to Message{hike}
}
relationship OneToOne {
    Hiker{user} to User{participant}
}

```

Finally, before running your application using the above commands, you will have to create your entities (with their relationships) in your application. To do this, run `jhipster import-jdl my_jdl_file.jdl`.

Well done, now you have your application with your entities. 
Enjoy coding and don't hesitate to ask some questions on our GitLab. 



## Add a leaflet Map on your Jhipster application 

If you are using Angular (and not AngularJs) it can be difficult to create your first Leaflet map. That's why we have created a [JHipster module](https://github.com/ultratrail/generator-jhipster-leafletmap) that auto-generate a leaflet map in an extra page. 
Don't hesitate to download and test our module. 

You can download the module after the installation (using npm) or directly while creating your application (Would you like to install other generators from the JHipster Marketplace? 
select Yes and search the leafletmap generator).

This module is available on [npm](https://www.npmjs.com/package/generator-jhipster-leafletmap) and [JHipster Marketplace](https://www.jhipster.tech/modules/marketplace/#/details/generator-jhipster-leafletmap).


# This is the auto-generated ReadMe with extra information



# Hiking
This application was generated using JHipster 4.14.0, you can find documentation and help at [http://www.jhipster.tech/documentation-archive/v4.14.0](http://www.jhipster.tech/documentation-archive/v4.14.0).

## Development

Before you can build this project, you must install and configure the following dependencies on your machine:

1. [Node.js][]: We use Node to run a development web server and build the project.
   Depending on your system, you can install Node either from source or as a pre-packaged bundle.
2. [Yarn][]: We use Yarn to manage Node dependencies.
   Depending on your system, you can install Yarn either from source or as a pre-packaged bundle.

After installing Node, you should be able to run the following command to install development tools.
You will only need to run this command when dependencies change in [package.json](package.json).

    yarn install

We use yarn scripts and [Webpack][] as our build system.


Run the following commands in two separate terminals to create a blissful development experience where your browser
auto-refreshes when files change on your hard drive.

    ./mvnw
    yarn start

[Yarn][] is also used to manage CSS and JavaScript dependencies used in this application. You can upgrade dependencies by
specifying a newer version in [package.json](package.json). You can also run `yarn update` and `yarn install` to manage dependencies.
Add the `help` flag on any command to see how you can use it. For example, `yarn help update`.

The `yarn run` command will list all of the scripts available to run for this project.

### Service workers

Service workers are commented by default, to enable them please uncomment the following code.

* The service worker registering script in index.html

```html
<script>
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
        .register('./sw.js')
        .then(function() { console.log('Service Worker Registered'); });
    }
</script>
```

Note: workbox creates the respective service worker and dynamically generate the `sw.js`

### Managing dependencies

For example, to add [Leaflet][] library as a runtime dependency of your application, you would run following command:

    yarn add --exact leaflet

To benefit from TypeScript type definitions from [DefinitelyTyped][] repository in development, you would run following command:

    yarn add --dev --exact @types/leaflet

Then you would import the JS and CSS files specified in library's installation instructions so that [Webpack][] knows about them:
Edit [src/main/webapp/app/vendor.ts](src/main/webapp/app/vendor.ts) file:
~~~
import 'leaflet/dist/leaflet.js';
~~~

Edit [src/main/webapp/content/css/vendor.css](src/main/webapp/content/css/vendor.css) file:
~~~
@import '~leaflet/dist/leaflet.css';
~~~
Note: there are still few other things remaining to do for Leaflet that we won't detail here.

For further instructions on how to develop with JHipster, have a look at [Using JHipster in development][].

### Using angular-cli

You can also use [Angular CLI][] to generate some custom client code.

For example, the following command:

    ng generate component my-component

will generate few files:

    create src/main/webapp/app/my-component/my-component.component.html
    create src/main/webapp/app/my-component/my-component.component.ts
    update src/main/webapp/app/app.module.ts

### Doing API-First development using swagger-codegen

[Swagger-Codegen]() is configured for this application. You can generate API code from the `src/main/resources/swagger/api.yml` definition file by running:
```bash
./mvnw generate-sources
```
Then implements the generated interfaces with `@RestController` classes.

To edit the `api.yml` definition file, you can use a tool such as [Swagger-Editor](). Start a local instance of the swagger-editor using docker by running: `docker-compose -f src/main/docker/swagger-editor.yml up -d`. The editor will then be reachable at [http://localhost:7742](http://localhost:7742).

Refer to [Doing API-First development][] for more details.

## Building for production

To optimize the Hiking application for production, run:

    ./mvnw -Pprod clean package

This will concatenate and minify the client CSS and JavaScript files. It will also modify `index.html` so it references these new files.
To ensure everything worked, run:

    java -jar target/*.war

Then navigate to [http://localhost:8080](http://localhost:8080) in your browser.

Refer to [Using JHipster in production][] for more details.

## Testing

To launch your application's tests, run:

    ./mvnw clean test

### Client tests

Unit tests are run by [Karma][] and written with [Jasmine][]. They're located in [src/test/javascript/](src/test/javascript/) and can be run with:

    yarn test

UI end-to-end tests are powered by [Protractor][], which is built on top of WebDriverJS. They're located in [src/test/javascript/e2e](src/test/javascript/e2e)
and can be run by starting Spring Boot in one terminal (`./mvnw spring-boot:run`) and running the tests (`yarn run e2e`) in a second one.
### Other tests

Performance tests are run by [Gatling][] and written in Scala. They're located in [src/test/gatling](src/test/gatling) and can be run with:

    ./mvnw gatling:execute

For more information, refer to the [Running tests page][].

## Using Docker to simplify development (optional)

You can use Docker to improve your JHipster development experience. A number of docker-compose configuration are available in the [src/main/docker](src/main/docker) folder to launch required third party services.

For example, to start a mysql database in a docker container, run:

    docker-compose -f src/main/docker/mysql.yml up -d

To stop it and remove the container, run:

    docker-compose -f src/main/docker/mysql.yml down

You can also fully dockerize your application and all the services that it depends on.
To achieve this, first build a docker image of your app by running:

    ./mvnw verify -Pprod dockerfile:build

Then run:

    docker-compose -f src/main/docker/app.yml up -d

For more information refer to [Using Docker and Docker-Compose][], this page also contains information on the docker-compose sub-generator (`jhipster docker-compose`), which is able to generate docker configurations for one or several JHipster applications.

## Continuous Integration (optional)

To configure CI for your project, run the ci-cd sub-generator (`jhipster ci-cd`), this will let you generate configuration files for a number of Continuous Integration systems. Consult the [Setting up Continuous Integration][] page for more information.

[JHipster Homepage and latest documentation]: http://www.jhipster.tech
[JHipster 4.14.0 archive]: http://www.jhipster.tech/documentation-archive/v4.14.0

[Using JHipster in development]: http://www.jhipster.tech/documentation-archive/v4.14.0/development/
[Using Docker and Docker-Compose]: http://www.jhipster.tech/documentation-archive/v4.14.0/docker-compose
[Using JHipster in production]: http://www.jhipster.tech/documentation-archive/v4.14.0/production/
[Running tests page]: http://www.jhipster.tech/documentation-archive/v4.14.0/running-tests/
[Setting up Continuous Integration]: http://www.jhipster.tech/documentation-archive/v4.14.0/setting-up-ci/

[Gatling]: http://gatling.io/
[Node.js]: https://nodejs.org/
[Yarn]: https://yarnpkg.org/
[Webpack]: https://webpack.github.io/
[Angular CLI]: https://cli.angular.io/
[BrowserSync]: http://www.browsersync.io/
[Karma]: http://karma-runner.github.io/
[Jasmine]: http://jasmine.github.io/2.0/introduction.html
[Protractor]: https://angular.github.io/protractor/
[Leaflet]: http://leafletjs.com/
[DefinitelyTyped]: http://definitelytyped.org/
[Swagger-Codegen]: https://github.com/swagger-api/swagger-codegen
[Swagger-Editor]: http://editor.swagger.io
[Doing API-First development]: http://www.jhipster.tech/documentation-archive/v4.14.0/doing-api-first-development/
