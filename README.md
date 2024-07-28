# Country-verkennen

## Inhoudsopgave
1. [Inleiding](#inleiding)
2. [Screenshot](#screenshot)
3. [Benodigdheden](#benodigdheden)
4. [Installatie Instructies](#installatie-instructies)
5. [De Applicatie Draaien](#de-applicatie-draaien)
6. [Inloggegevens](#inloggegevens)
7. [Beschikbare NPM Commando's](#beschikbare-npm-commandos)
8. [API Informatie](#api-informatie)

## Inleiding

Welkom bij Country-verkennen, een innovatieve webapplicatie gebouwd met React. Deze applicatie is ontworpen om je te helpen bij het vinden van jouw toekomstige vakantiebestemmingen. Ons doel is om het beste land te selecteren op basis van de behoeften en voorkeuren van de gebruiker. 

De applicatie biedt functies zoals het verkennen van landen, het filteren op basis van specifieke criteria, het bekijken van gedetailleerde landinformatie, en het plannen van reizen. Of je nu een avontuurlijke backpacker bent of op zoek bent naar een ontspannen strandvakantie, Country-verkennen helpt je bij het maken van de perfecte keuze voor jouw volgende reis.

## Screenshot

![Screenshot van de applicatie](https://github.com/damienverkerk/country-verkennen/blob/main/src/assets/images/Screenshot.png?raw=true)

Deze screenshot toont de hoofdpagina van de Country-verkennen applicatie, waar gebruikers een overzicht krijgen van verschillende landen en reisopties.

## Benodigdheden

Voordat je begint, zorg ervoor dat je de volgende software geïnstalleerd hebt:

- [Node.js](https://nodejs.org/) (versie 14.0.0 of hoger)
- [npm](https://www.npmjs.com/) (versie 6.0.0 of hoger)

Je kunt de geïnstalleerde versies controleren met de volgende commando's:

```bash
node -v
npm -v
```

## Installatie Instructies

Volg deze stappen om de applicatie te installeren en te runnen:

1. Clone het project:
   ```bash
   git clone https://github.com/damienverkerk/country-verkennen.git
   ```
2. Ga naar de projectmap:
   ```bash
   cd country-verkennen
   ```
3. Installeer de benodigde packages:
   ```bash
   npm install
   ```

## De Applicatie Draaien

Om de applicatie te starten in ontwikkelingsmodus, voer het volgende commando uit:

```bash
npm start
```

De applicatie zal nu draaien op [http://localhost:3000](http://localhost:3000). De pagina zal automatisch herladen als je wijzigingen aanbrengt in de code.

## Inloggegevens

Voor het testen van de applicatie kun je de volgende inloggegevens gebruiken:

- Gebruikersnaam: testuser
- Wachtwoord: test123

Je kunt ook een nieuw account aanmaken via de registratiepagina.

## Beschikbare NPM Commando's

In het project kun je de volgende npm commando's gebruiken:

- `npm start`: Start de applicatie in de ontwikkelmodus.
- `npm test`: Voert de testen uit in de interactieve watch-modus.
- `npm run build`: Bouwt de app voor productie naar de `build` folder.
- `npm run eject`: Verwijdert de single build dependency uit je project.

**Let op:** `npm run eject` is een eenrichtingsoperatie. Zodra je 'eject', kun je niet meer terug!

## API Informatie

Deze applicatie maakt gebruik van de volgende externe API's:

1. [REST Countries API](https://restcountries.com/): Voor het ophalen van landeninformatie.
2. [Unsplash API](https://unsplash.com/developers): Voor het ophalen van landenfoto's.
3. [Amadeus API](https://developers.amadeus.com/): Voor het ophalen van reisinformatie en boekingsmogelijkheden.

Voor het gebruik van de Unsplash en Amadeus API's zijn API-sleutels vereist. Deze zijn reeds geconfigureerd in de applicatie voor testdoeleinden. Bij verder gebruik of doorontwikkeling is het aan te raden om eigen API-sleutels aan te vragen bij de respectievelijke diensten.

---

© Damien Verkerk, 2023