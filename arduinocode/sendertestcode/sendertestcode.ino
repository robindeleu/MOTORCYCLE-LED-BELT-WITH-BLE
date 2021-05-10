#define pin 8
String message = "255,0,0,255\n"; //
String message2 = "0,255,0,50\n";
String message3 = "0,0,255,255\n";
String message4 = "255,255,255,50\n";
String message5 = "255,255,255,255\n";
String CustomMes;
int counter;

void setup() {
  // put your setup code here, to run once:
  pinMode(pin, INPUT_PULLUP);
}

void loop() {
  Serial.begin(9600);
//  int button = digitalRead(pin);
//
//  if (button == LOW) {
//    if ( counter == 0) {
//      Serial.println(message);
//      counter++;
//    } else if (counter == 1) {
//      Serial.println(message2);
//      counter++;
//    } else if (counter == 2) {
//      Serial.println(message3);
//      counter++;
//
//    }
//    else if (counter == 3) {
//      Serial.println(message4);
//      counter++;
//
//    }
//    else {
//      Serial.println(message5);
//      counter = 0;
//    }
//
//
//
//  }

    // put your main code here, to run repeatedly:
    Serial.println(message);
    delay(5000);
    Serial.println(message2);
    delay(5000);
    Serial.println(message3);
    delay(5000);
    Serial.println(message4);
    delay(5000);

  Serial.end();
  delay(200);
}
