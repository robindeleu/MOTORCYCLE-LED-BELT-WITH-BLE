//adding nessecary libraries
#include <Adafruit_NeoPixel.h>

//defining constants
#define rate 9600
#define LEDpin 6
#define NoP 8
#define wait 250

//setting global vars
String recData;
String R;
String G;
String B;
String Bright;


int ind1; // , locations
int ind2;
int ind3;
int ind4;

int RED;
int GREEN;
int BLUE;
int BRIGHTNESS;
// setup adafruit pixels
Adafruit_NeoPixel pixels(NoP, LEDpin, NEO_GRB + NEO_KHZ800);


void setup() {
  // starting serial for communication with nano

  // starting pixels
  pixels.begin(); //start pixel class
  Serial.begin(rate); //begin serial com
  pixels.clear(); //clear pixels

}

void loop() {
  //while nothing is recieved on port it will skip code
  while (Serial.available() > 0) {
    recData = Serial.readString();
    Serial.println(recData);

    ind1 = recData.indexOf(',');  //finds location of first ,
    R = recData.substring(0, ind1 + 1); //captures first data String
    ind2 = recData.indexOf(',', ind1 + 1 ); //finds location of second ,
    G = recData.substring(ind1 + 1, ind2 + 1); //captures second data String
    ind3 = recData.indexOf(',', ind2 + 1 );
    B = recData.substring(ind2 + 1, ind3 + 1);
    ind4 = recData.indexOf(',', ind3 + 1 );
    Bright = recData.substring(ind3 + 1);

    //    Serial.println(Bright);

    //converting diffrent values to Integers so they are usauble in neo pixel
    RED = R.toInt();
    GREEN = G.toInt();
    BLUE = B.toInt();
    BRIGHTNESS = Bright.toInt();
    //
    //
    //printing diffrent values for troubleshooting and verification
    //    Serial.println("string :");
    //    Serial.print("R=");
    //    Serial.println( R);
    //    Serial.print("G=");
    //    Serial.println(G);
    //    Serial.print("B=");
    //    Serial.println(B);
    //
    //    Serial.println(Bright);
    //    //
    //    Serial.println("int :");
    //    Serial.print("RED=");
    //    Serial.println( RED);
    //    Serial.print("GREEN=");
    //    Serial.println(GREEN);
    //    Serial.print("BLUE=");
    //    Serial.println( BLUE);
    //    Serial.print("bright =");
    //    Serial.println(BRIGHTNESS);

    // settign brightness pixels
    pixels.setBrightness(BRIGHTNESS);

    //setting values to pixels
    //for loop to turn on all the leds since it doesnt support all at once
    for (int i = 0; i < NoP; i++) {
      pixels.setPixelColor(i, pixels.Color(RED, GREEN, BLUE));
      pixels.show();
      delay(wait);
    }
    //                for (int i = 0; i < NoP; i++) {
    //          pixels.setPixelColor(i, pixels.Color(0, 255, 0));
    //          pixels.show();
    //          delay(wait);
    //        }
    //                        for (int i = 0; i < NoP; i++) {
    //          pixels.setPixelColor(i, pixels.Color(0, 0, 255));
    //          pixels.show();
    //          delay(wait);
    //        }

  }




}
