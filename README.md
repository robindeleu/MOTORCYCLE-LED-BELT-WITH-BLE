# MOTORCYCLE-LED-BELT-WITH-BLE

![GitHub repo size](https://img.shields.io/github/repo-size/robindeleu/MOTORCYCLE-LED-BELT-WITH-BLE)
![GitHub top language](https://img.shields.io/github/languages/top/robindeleu/MOTORCYCLE-LED-BELT-WITH-BLE)
![GitHub language count](https://img.shields.io/github/languages/count/robindeleu/MOTORCYCLE-LED-BELT-WITH-BLE)
[![Netlify Status](https://api.netlify.com/api/v1/badges/c2490a46-1ba6-4da8-a90c-76dfa192d067/deploy-status)](https://app.netlify.com/sites/ledbelt/deploys)

<br />
<p align="center">
  <a href="https://github.com/robindeleu/MOTORCYCLE-LED-BELT-WITH-BLE">
    <img src="img/Black and White Circle Personal Logo 2.png" alt="Logo" width="200" height="200">
  </a>
  <h3 align="center">MOTORCYCLE-LED-BELT-WITH-BLE</h3>
  <p align="center">
    An awesome led belt to use!
  </p>
</p>

<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#Groepsleden">Groepsleden</a></li>
    <li><a href="#Regulations">Regulations</a></li>
    <li><a href="#Week report">Week report</a></li>
    <li><a href="#Frontend">Frontend</a></li>
    <li><a href="#Built With">Built With</a></li>
  </ol>
</details>

## Groepsleden

* Emma Dossche
* Pixie Moortgat
* Robin Deleu
* Roelten Jacobs

## Regulations

The legislation for wearing lighting on clothes for cyclists and motorcyclists on public roads in Belgium is briefly mentioned in [this document (click here)](./Regulations.md).

## Week report

[In this document](./Report.md) you find the report of the meetings from past weeks.

## Frontend

[This is the link](https://ledbelt.netlify.app/) to the website that you can use to connect to you're ledbelt.
In the website you can create or sign in with a user. After login you are able to see all data, connect to ledbelts,...
If you don't login you're not able to do anything on the site.
The data you can see is the temperature, humidity. There is also functionality to create you're own color and change the brightness but this code is not ready yet on the frontend and arduino.
There is also a possibility to install the "app" like a PWA.

## Arduino

![arduino schema](./img/arduino-scheme.jpg).
This is the theoretical scheme. On the arduino nano there is a program running that sends the lightsensor value, temperature, humidity and battery level over bluetooth.
On the arduino uno there is a program running that listens to the serial interface and changes the color of the LED's or brightness.

## Built With

* [Vue](https://vuejs.org/)
* [Vuetify](https://vuetifyjs.com/en/)
