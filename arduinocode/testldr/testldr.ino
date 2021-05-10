void setup()
{
  Serial.begin(9600);
}
 
void loop()
{
 
  int value = analogRead(A1);
  value = map(value, 0, 800, 0, 10);
 
  Serial.print("sensor reads value of :"); Serial.println(value);
  delay(2000);
}
