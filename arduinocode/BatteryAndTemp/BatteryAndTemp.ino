// Temperature & Humidity Sensor
// You can connect to it with the nRF Connect. For some reason on iOS it does not display the converted values.

#include <ArduinoBLE.h> // The library to work with Bluetooth, docs https://www.arduino.cc/en/Reference/ArduinoBLE
#include <Arduino_HTS221.h> // The library to read Temperature and Humidity, install "Arduino_HTS221", docs https://www.arduino.cc/en/Reference/ArduinoHTS221

BLEService sensors("181A"); // Environment Sensing Service, docs https://www.bluetooth.com/specifications/gatt/services/
BLEService batteryService("180F");

BLEShortCharacteristic currentTemperature("2A6E", BLERead | BLENotify); // short (sint16), degrees Celsius with a resolution of 0.01 https://www.bluetooth.com/xml-viewer/?src=https://www.bluetooth.com/wp-content/uploads/Sitecore-Media-Library/Gatt/Xml/Characteristics/org.bluetooth.characteristic.temperature.xml
BLEUnsignedShortCharacteristic currentHumidity("2A6F", BLERead | BLENotify); // uint16, %, with a resolution of 0.01, https://www.bluetooth.com/xml-viewer/?src=https://www.bluetooth.com/wp-content/uploads/Sitecore-Media-Library/Gatt/Xml/Characteristics/org.bluetooth.characteristic.humidity.xml
BLEUnsignedCharCharacteristic batteryLevelChar("2A19", BLERead | BLENotify); 

 // As defined in the official docs https://www.bluetooth.com/specifications/gatt/services/


void setup() {
  Serial.begin(9600); // initialize serial communication
  while (!Serial);

  pinMode(LED_BUILTIN, OUTPUT); // initialize the built-in LED pin to indicate when a central is connected

  if (!HTS.begin()) { // Initialize Temperature and Humidity sensor 
    Serial.println("Failed to initialize LEDBELT!");
    while (1);
  }

  if (!BLE.begin()) {
    Serial.println("starting BLE failed!");
    while (1);
  }
  BLE.setDeviceName("Ledbelt");
  BLE.setLocalName("LEDBELT");
  
  currentTemperature.setEventHandler(BLERead, readTemperature);
  sensors.addCharacteristic(currentTemperature);
  currentHumidity.setEventHandler(BLERead, readHumidity);
  sensors.addCharacteristic(currentHumidity);
  batteryLevelChar.setEventHandler(BLERead, readBattery);
 
  BLE.setLocalName("LEDBELT");
  BLE.setAdvertisedService(batteryService);
  batteryService.addCharacteristic(batteryLevelChar);
  BLE.addService(batteryService);
  
  BLE.addService(sensors);
  BLE.setAdvertisedService(sensors);

  /* Start advertising BLE. It will start continuously transmitting BLE
     advertising packets and will be visible to remote BLE central devices
     until it receives a new connection */
  
  BLE.setEventHandler(BLEConnected, blePeripheralConnectHandler);
  BLE.setEventHandler(BLEDisconnected, blePeripheralDisconnectHandler);
  BLE.advertise();
  Serial.println("Bluetooth device active, waiting for connections...");
}

void loop() {
  BLE.poll();
    BLEDevice central = BLE.central();
}

void blePeripheralConnectHandler(BLEDevice central) {
  digitalWrite(LED_BUILTIN, HIGH);
  Serial.print("Connected event, central: "); Serial.println(central.address());
}

void blePeripheralDisconnectHandler(BLEDevice central) {
  digitalWrite(LED_BUILTIN, LOW);
  Serial.print("Disconnected event, central: "); Serial.println(central.address());
}

void readTemperature(BLEDevice central, BLECharacteristic characteristic) {
  float temperature = HTS.readTemperature();
  short t = convertFloatToShort(temperature);
  currentTemperature.writeValue(t);
  Serial.print("Temperature = "); Serial.println(temperature);
}

void readHumidity(BLEDevice central, BLECharacteristic characteristic) {
  float humidity = HTS.readHumidity();
  short t = convertFloatToShort(humidity);
  currentHumidity.writeValue(t);
  Serial.print("Humidity = "); Serial.println(humidity);
}
 void readBattery (BLEDevice central, BLECharacteristic characteristic) {
      int battery = analogRead(A0);
      int batteryLevel = map(battery, 0, 1023, 0, 100);
      batteryLevelChar.writeValue(batteryLevel);
      Serial.print("Battery Level % is now: ");
      Serial.println(batteryLevel);

  }

short convertFloatToShort(float x) {
  x = x * 100;
  if (x < -32768) {
    return -32768;
  }
  if (x > 32767) {
    return 32767;
  }
  return (short)round(x);
}
