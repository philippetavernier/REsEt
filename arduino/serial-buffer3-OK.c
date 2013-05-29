//TODO
//Transmision on serial only if needed.

char inData[20]; // Allocate some space for the string
char inChar=-1; // Where to store the character read
byte index = 0; // Index into array; where to store the character

void setup() {
    Serial.begin(9600);
    Serial.write("Power On");
    pinMode(13, OUTPUT); 
}

String Comp() {
  
   String aString;
    while (Serial.available() > 0) // Don't read unless
                                   // there you know there is data
    {
        if(index < 19) // One less than the size of the array
        {
            inChar = Serial.read(); // Read a character
            inData[index] = inChar; // Store it
            index++; // Increment where to write next
            inData[index] = '\0'; // Null terminate the string
        }
    delay(5);
    }  
    index=0;
    aString=inData;
return(aString);
}

void loop()
{
  String axes;
  String myString;
  myString=Comp();
  String myValue;
  myValue=myString.substring(1); //OK with a delay in reading loop read from char 1 to the end
  axes=myString.substring(0,1);
  int myIntValue;
  char myCharValue[myValue.length()+1];
  int myValueLength=myValue.length()+1; //length() +1 for the right size
  myValue.toCharArray(myCharValue,myValueLength);
  myIntValue=atoi(myCharValue);//char to int
  Serial.println(myCharValue);
  if (axes=="x")
  {
    if (myIntValue<=15) {
        digitalWrite(13, LOW);
        delay(10);
        Serial.println("ok-X<15");
        /*Serial.println(myIntValue);
        delay(5);*/
    }
    else {
        digitalWrite(13, HIGH);  
        delay(10);
        Serial.println("ok-Xelse");
        /*Serial.println(myIntValue);
        delay(5);*/
    }
    
  }
  else if (axes=="y") {
    if (myIntValue<=30) {
        digitalWrite(13, LOW);
        delay(10);
        Serial.println("ok-Y<30");
        /*Serial.println(myIntValue);
        delay(5);*/
    }
    else {
        digitalWrite(13, HIGH);  
        delay(10);
        Serial.println("ok-Yelse");
        /*Serial.println(myIntValue);
        delay(5);*/
    }
  }
  else {
  Serial.println("ok-waiting");  
  digitalWrite(13, HIGH); //to see when connection is lost
} 
  
  
}
