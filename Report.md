# Meeting

## Meeting 1: 29 maart 14h

Bespreking welk project er gekozen zal worden + verdeling van de taken. Roelten zal vooral het elektronica gedeelte op zich nemen (hardware), Emma werkt vooral aan het ICT-gedeelte (Vue applicatie) en Robin zal meehelpen met beide.

## Meeting 2: 2 april 14h

Robin heeft het GitKraken bord en een repo op GitHub gemaakt, een Vue applicatie gecreëerd en de lay-out ervan aangepast.

Roelten zal bekijken welke elektronica componenten we nodig hebben en hiervan een schema maken.

Emma heeft de wetgeving rond verlichting voor fietsers en motorrijders opgezocht en in Regulations.md een korte samenvatting geplaatst. Zij zal starten met de Bluetooth functionaliteit toe te voegen en te testen.

## Meeting 3: 6 april 14h

Robin en Emma: Het zoeken van devices via Bluetooth werkt via onze Vue applicatie, maar niet alle Bluetooth devices (zoals smartphones) worden gevonden. Functies moeten toegevoegd worden om te kunnen filteren op naam of prefixnaam. Ten slotte gaan we ook het koppelen van de devices via Bluetooth nog uittesten.

Roelten zal het elektronica schema verder afwerken en op GitHub zetten.

## Meeting 4: 13 april 14 h

Roelten zal bekijken en navragen welke hardware componenten er beschikbaar zijn op de campus en welke er eventueel besteld moeten worden.

Robin zal beginnen aan de PowerPointpresentatie om ons project volgende week voor te stellen op de campus.

Robin en Emma: Het connecteren via Bluetooth met de showAllDevices werkt, de filters geven nog een error. Het geconnecteerde device zal opgeslagen worden in de Vuex store, deze functionaliteit moet nog toegevoegd worden. De disconnect knop werkt nog niet, dit zal toegevoegd worden als het device kan uitgelezen worden uit de Vuex store.

## Meeting 5 20 april 14h

Robin en Emma: De fout bij het filteren van de Bluetooth devices is opgelost. Het opslaan van het device in de store lukt nog niet helemaal: we krijgen nog een TypeError bij het sturen van een dispatch naar de store. De disconnect action moet nog toegevoegd worden aan de store.
De presentatie voor morgen werd kort overlopen, nog enkele details moeten toegevoegd worden.

Roelten zal zijn updates op GitHub zetten.

## Meeting 6 21 april 8h15

Robin en Emma: Vue frontend verder afwerken, store werkende gemaakt, connect werkt, conditional rendering voor v-cards. Vue disconnect knop moet nog aangepast worden zodat deze werkt

Roelten: arduino nano bluetooth programma met temperatuur, luchtvochtigheid werkt. Batterij level werkt bijna.

## Meeting 7 22 april 8h15

Robin en Emma: Vue frontend verder afwerken, beltcard props toevoegen. Mutaties in Store aanpassen en optimaliseren. Bluetooth search only for ledbelt devices. Na lange tijd mergen met main en merge conflicten opgelost.
PWA werkenge gemaakt en disconnect werkt.

Roelten: arduino nano bluetooth programma met temperatuur, luchtvochtigheid werkt. Batterij level werkt nu ook.

## Meeting 8 30 april 8h15

Robin en Emma: Vue adding datalistereners for bluetooth for reading data from arduino nano. Fix all about History.
Datavalue error. Don't work right now!

Roelten: arduino nano leds proberen aan te sturen.

## Meeting 9 7 Mei 13h30

Robin en Emma: Vue routing protection als user niet bestaat. Store veranderingen voor users. Login en register scherm maken. Data allemaal opslaan in de locale data van de pcif user not login. Store changes for users, adding loginscreen, registerscreen. Adding Vuex store to be saved in localstorage/cookie. 

Roelten: arduino nano leds proberen aan te sturen lukte niet door library probleem. Opgelost door via seriele communicatie RGB en brightness waardes door te sturen.

## Meeting 9 10 Mei 8h15

Robin en Emma: Bekijken code en powerpoint. Vervoledigen Readme en gitkraken board.

Roelten: Arduino optimaliseren code seriële communicatie op trigger (nu button).

## Meeting 9 13 Mei 8h15

Robin, Emma en Roelten: maken van video