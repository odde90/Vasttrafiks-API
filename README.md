# Vasttrafiks API
# Projektarbete 2, Reseplanerare med Västtrafiks API

vi ska skapa en reseplanerare som låter användare söka resor via Västtrafiks API. Man skall i applikation kunna söka på resor och, via ett gränssnitt, visa upp resultatet.

## Getting Started

Ni väljer själva om ni vill använda en utökad utvecklings-stack i projektet, notera att detta inte är ett krav. Exempel på ramverk ni kan lägga till i er stack är: typescript, react, mm. Låt kreativiteten flöda!

För att bli godkänd på den här uppgiften MÅSTE ni använda GIT och GitHub. Inlämningen sker som vanligt via Zenit där lämnar in er projektmapp som en zip-fil. I projektmappen ska det finnas (utöver all kod) en README.md fil som innehåller en titel, beskrivning av uppgiften, vad som krävs för att bygga och starta projektet samt en länk till GitHub repot. Notera att om instruktioner för hur projektet byggs och startas inte finns eller om instruktionerna är felaktiga kommer uppgiften bli underkänd.


### Kraven för projektet

What things you need to install the software and how to install them

```
Krav för godkänt:

Ni skall använda er av Västtrafiks auth 2 autentisering.
Uppdatering av access_token skall göras automatiskt då giltighetstiden för en token gått ut (tips, använd er av en egen-skapad middleware).
Autentiseringen skall gå genom ett eget api i Node (för G-nivå räcker det att ha ett API/NodeJS server som levererar en access_token).
Samtliga hållplatser skall hämtas och sparas i en JSON-fil. Denna hämtning skall alltså inte ske varje gång man skall söka fram en resa.
Användaren skall med hjälp av två input-fält kunna ange ”från och till” för en resa (hållplatser).
Användaren skall kunna mata in datum och tid samt kunna välja om tiden är för avgående tid eller ankommande tid (när man vill anlända till destinationen eller när ex. Bussen lämnar hållplatsen).
Samtliga hållplatser den hittade rutten kommer stanna på skall visas upp vid hittad resa.
Krav för väl godkänt:

Alla punkter för godkänt är uppfyllda
Alla anrop som görs till Västtrafiks API skall gå igenom en egen-skapad NodeJS server.
Vid sökning av en resa skall de tre nästkommande resorna (som passar in på sökningen) visas. Samtliga av de visade resorna skall visa alla dess stop med tid för varje stop (när ex bussen anländer till varje hållplats i rutten).
Eventuella förseningar skall visas upp för alla resor.
Användaren skall kunna filtrera sin sökning på resetyp (buss, spårvagn, tåg, båt osv.)
Det skall finnas en automatisering så att alla hållplatser hämtas på nytt vid specifika tidpunkter (servern hämtar alla hållplatser och sparar dem i JSON-filen en gång om dagen).
Skicka PIM till online-användaren Ahmed Hussei
```

### Installing

```
https://getbootstrap.com/
https://jquery.com/
https://expressjs.com/
Git, Node.js
https://vuejs.org/
```

## Running the tests

NPM install
node server.js

 

## Authors

* **Test** 

