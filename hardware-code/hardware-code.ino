#include "tinyECC.h"

// Libraries to be included.

#include <WiFi.h>
#include <ThingSpeak.h>
#include "HTTPClient.h"
#include <ArduinoJson.h>
#include "time.h"

// GPIO pins for various purpose
// Following three are the pins of motor controller.
int motorIn1 = 12;    
int motorIn2 = 33;    
int motorEnA = 14;  

//GPIO pin for IR blaster to receive the interrupt signal.
int encoder = 2; 

// Current sensor output pin.
int sensorpin = 34;   


tinyECC ecc;
//baseV is measured while current was 0A.
//using analogRead(34)*(3.3/4095)
float baseV = 2.23;

// Setting PWM properties
const int freq = 500;            //its the frequency of pwm signal  
const int pwmChannel = 0;        // 16 pwm channels from 0 - 15
const int resolution = 8;       // 8 bit resolution. It can be anything between 1 - 16 bits.

int dutyCycle = 0;            //speed is proportional to duty cycle.  (can vary from 0 to 255)                              


//function to count the interrupts from IR blaster and sensor.
int RPM;
void ICACHE_RAM_ATTR sens() 
{
  RPM++;
}

//Thingspeak starting from here.
const char* ssid = "replace_with_ur_ssid";
const char* password = "replace_with_ur_password";
WiFiClient  client;

unsigned long myChannelNumber = 123456; //replace with ur channel number
const char * myWriteAPIKey = "replace with your write API Key";
const char * ReadAPI = "replace with your read API key";
const char* server = "api.thingspeak.com";

void initWiFi() {
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi ..");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print('.');
    delay(1000);
  }
  Serial.println(WiFi.localIP());
}


/// Containers made : Node-1, Node-2, Duty-Cycle, Rotations-Per-Min, Current
///////oneM2M starting here
String server_om = "https://esw-onem2m.iiit.ac.in/~/in-cse/in-name/Team-21/";
String cnt_duty_cycle = "Duty-Cycle";
String cnt_current = "Current";
String cnt_rpm = "Rotations-Per-Min";
String om_val = "1001";

void createCI_duty_cycle(String& val){
 HTTPClient http;
 http.begin(server_om+cnt_duty_cycle+"/Data");
 
 http.addHeader("X-M2M-Origin", "DCmHtJ:0P61z2");
 http.addHeader("Content-Type", "application/json;ty=4");
 int code = http.POST("{\"m2m:cin\": {\"cnf\":\"application/json\",\"con\": " + String(val) + "}}");
Serial.println(code);
if (code == -1) {
Serial.println("UNABLE TO CONNECT TO THE SERVER FOR DUTY CYCLE");
}
http.end();
}

void createCI_current(String& val){
 HTTPClient http;
 http.begin(server_om+cnt_current+"/Data");
 http.addHeader("X-M2M-Origin", "DCmHtJ:0P61z2");
 http.addHeader("Content-Type", "application/json;ty=4");
 int code = http.POST("{\"m2m:cin\": {\"cnf\":\"application/json\",\"con\": " + String(val) + "}}");
Serial.println(code);
if (code == -1) {
Serial.println("UNABLE TO CONNECT TO THE SERVER FOR Current");
}
http.end();
}

void createCI_rpm(String& val){
 HTTPClient http;
 http.begin(server_om+cnt_rpm+"/Data");
 http.addHeader("X-M2M-Origin", "DCmHtJ:0P61z2");
 http.addHeader("Content-Type", "application/json;ty=4");
 int code = http.POST("{\"m2m:cin\": {\"cnf\":\"application/json\",\"con\": " + String(val) + "}}");
Serial.println(code);
if (code == -1) {
Serial.println("UNABLE TO CONNECT TO THE SERVER FOR RPM CYCLE");
}
http.end();
}


/////////////////////////////
void setup() 
{
  Serial.begin(9600);

  pinMode(motorIn1, OUTPUT);
  pinMode(motorIn2, OUTPUT);
  pinMode(motorEnA, OUTPUT);
  pinMode(encoder, INPUT_PULLUP); 

   // Move DC motor backward with increasing speed
  digitalWrite(motorIn1, HIGH);
  digitalWrite(motorIn2, LOW);  
  
  // configure LED PWM functionalitites
  ledcSetup(pwmChannel, freq, resolution);
  
  // attach the channel to the GPIO to be controlled
  ledcAttachPin(motorEnA, pwmChannel);

  ledcWrite(pwmChannel, dutyCycle);
  
  attachInterrupt(digitalPinToInterrupt(encoder), sens, RISING);

  initWiFi();
  ThingSpeak.begin(client);  // Initialize ThingSpeak
 
}


void loop() 
{   
    long volta = ThingSpeak.readFloatField(myChannelNumber, 4, ReadAPI);
    long statusCode = ThingSpeak.getLastReadStatus();
    
    int temp = 0; 
    
    if(statusCode == 200)
    { 
      Serial.println("Read successfully from Thingspeak...!");
      double duty = (volta/5.0)*255;
      Serial.println(volta);
      dutyCycle = duty;
    }
    else
    {
      Serial.println("Failed to read data from Thingspeak..!");
      Serial.println("Reading from Serial Monitor");
      if(Serial.available())
      {
          String inpu = Serial.readStringUntil('\n');
          int l = inpu.length();
          
          for(int i = 0; i < l ; i++)
          { 
            if(inpu[i] >= '0' && inpu[i] <= '9')
              temp = temp*10 + (inpu[i] - '0');
          }   
          dutyCycle = temp;  
       }  
    }
    ledcWrite(pwmChannel, dutyCycle);
    delay(100); //time required to inc speed.

    RPM = 0;   
    delay(1000);    //measuring speed for 1 second.
    
    int wings= 20;          // no of wings of rotating object, for disc object use 1 with white tape on one side
    int RPMnew = RPM/wings;   

    float AvgCur = 0.0, Samples = 0.0, AvgACS = 0.0, ACSValue = 0.0; 
    for (int x = 0; x < 1000; x++) 
    { 
      ACSValue = analogRead(sensorpin);
      Samples = Samples + ACSValue;
      delay (1);
    }
    AvgACS = Samples/1000;
    
    //Current = (analogReading - baseV)/Sensitivity
    // ESP32 topoffs at 3.3V and has precision of 4096
    AvgCur = (AvgACS*(3.3/4095)) - baseV;
    
    // We are using 20A module which has sensitivity of 0.1V/A //so AvgCur/0.1 =AvgCur * 10
    AvgCur = AvgCur*10;
    
    Serial.print("Input DutyCycle : ");
    Serial.println(dutyCycle);
    Serial.print((RPMnew*60));
    Serial.println("Rot/min. ");   //Revolutions per minute

    
    Serial.print(AvgCur);
    Serial.println(" Amp");

    Serial.print("Analog Reading is : ");
    Serial.println(analogRead(sensorpin));

  
    ThingSpeak.setField(2, dutyCycle);/////field 1 data here
    ThingSpeak.setField(1, (RPMnew*60)); // field 2 data here
    ThingSpeak.setField(3, AvgCur); // field 3 data here.
      
    int x = ThingSpeak.writeFields(myChannelNumber, myWriteAPIKey);
    if(x == 200)Serial.println("Channel update successful.");

      om_val = String(dutyCycle);
       ecc.plaintext = om_val;
       
       ecc.encrypt();   //encryption of the data.
       
      Serial.print("Om val : ");
      Serial.println(ecc.ciphertext);     
       
      createCI_duty_cycle(ecc.ciphertext);  //Creating container in OM2M for encrypted duty cycle data.

      om_val = String(RPMnew*60);
      ecc.plaintext = om_val;
      ecc.encrypt();   
            
      createCI_duty_cycle(ecc.ciphertext);   //Creating container in OM2M for encrypted RPM data.


    delay(2000);
}
