#include <ArduinoJson.h>
#include <TimeLib.h>
#include <OneWire.h>
#include <DallasTemperature.h>
//#include <SPI.h>
#include <SparkFunHTU21D.h>


typedef uint8_t uint;

#define LIGHT_S 0
#define IN_S 23
#define CHW_S 24
#define IR  25
#define VENTSW 40
#define CHSW 41
#define CONVSW 42

#define SMOKE_S 7
#define empty_str ""


OneWire inside_w(IN_S);
OneWire chw_w(CHW_S);

DallasTemperature InsideTS(&inside_w);
DallasTemperature ChwTS(&chw_w);

HTU21D OutsideI2C;


struct Sensor
{
	double Inside = 0;
	double Outside = 0;
	double Humidity = 0;
	short Lux = 0;
	short Smoke = 0;
};

struct CentralHeating
{
	double Water = 0;
	double DaySet = 22;
	double NightSet = 15;
};

struct Settings
{
	bool Heating = false;
	bool DayMode = true;
	bool SmokeAbsorber = false;
};



class Timer
{
	time_t start, end;
public:
	Timer(): start(0), end(0)
	{

	}

	void Begin()
	{
		start = now();
	}

	void Reset()
	{
		start = now();
	}

	time_t Elapsed() 
	{
		return now() - start;
	}
};






class MicroHome
{
public:
	Sensor sensor;
	CentralHeating centralHeating;
	Settings settings;

	MicroHome(){
		OutsideI2C.begin();

		pinMode(LIGHT_S, INPUT);
		pinMode(SMOKE_S, INPUT);
		pinMode(VENTSW, OUTPUT);
		pinMode(CHSW, OUTPUT);
		pinMode(CONVSW, OUTPUT);
	}

	void RefreshSensors()
	{
		sensor.Outside = OutsideI2C.readTemperature();
		sensor.Humidity = OutsideI2C.readHumidity();


		InsideTS.requestTemperatures();
		sensor.Inside = InsideTS.getTempCByIndex(0);
		
		ChwTS.requestTemperatures();
		centralHeating.Water = ChwTS.getTempCByIndex(0);

		sensor.Lux = analogRead(LIGHT_S);
		sensor.Smoke = analogRead(SMOKE_S);

	}
	void SendSensorsState()
	{
		StaticJsonBuffer<200> jsonBuffer;

		JsonObject& root = jsonBuffer.createObject();
		JsonObject& Sensor = jsonBuffer.createObject();
		JsonObject& CentralHeating = jsonBuffer.createObject();
		JsonObject& Settings = jsonBuffer.createObject();

		Sensor["Inside"] = sensor.Inside;
		Sensor["Outside"] = sensor.Outside;
		Sensor["Humidity"] = sensor.Humidity;
		Sensor["Lux"] = sensor.Lux;
		Sensor["Smoke"] = sensor.Smoke;
		
		CentralHeating["Water"] = centralHeating.Water;
		CentralHeating["Dayset"] = centralHeating.DaySet;
		CentralHeating["Nightset"] = centralHeating.NightSet;

		Settings["Heating"] = settings.Heating;
		Settings["DayMode"] = settings.DayMode;
		Settings["SmokeAbsorber"] = settings.SmokeAbsorber;

		root["Sensor"] =  Sensor;
		root["CentralHeating"] = CentralHeating;
		root["Settings"] = Settings;

		root.prettyPrintTo(Serial);		
	}

};

MicroHome HomeControl;
Timer RefreshTimer;
Timer SmokeAbsTimer;

void setup()
{
	Serial.begin(115200);
	HomeControl.RefreshSensors();
	HomeControl.SendSensorsState();
	RefreshTimer.Begin();
}


void loop()
{
	char serial_data = Serial.read();

	switch (serial_data)
	{
	case 'G':
		HomeControl.SendSensorsState();
		RefreshTimer.Reset();
		break;
	case 'Y':
		HomeControl.centralHeating.DaySet += 0.5;
		break;
	case 'A':
		HomeControl.centralHeating.DaySet -= 0.5;
		break;
	case 'W':
		HomeControl.centralHeating.NightSet += 0.5;
		break;
	case 'Q':
		HomeControl.centralHeating.NightSet -= 0.5;
		break;
	case 'F':
		HomeControl.settings.Heating = false;
		if (digitalRead(CHSW)) digitalWrite(CHSW, LOW);
		if (digitalRead(CONVSW)) digitalWrite(CONVSW, LOW);
		break;
	case 'O':
		HomeControl.settings.Heating = true;
		if (!digitalRead(CHSW)) digitalWrite(CHSW, HIGH);
		break;
	case 'X':
		HomeControl.settings.SmokeAbsorber = false;
		digitalWrite(VENTSW, LOW);
		break;
	case 'S':
		HomeControl.settings.SmokeAbsorber = true;
		if (map(analogRead(SMOKE_S), 0, 1023, 0, 100) >= 11)
		{
			SmokeAbsTimer.Begin();
			digitalWrite(VENTSW, HIGH);
		}
		break;
	case 'N':
		HomeControl.settings.DayMode = false;
		break;
	case 'D':
		HomeControl.settings.DayMode = true;
		break;

	default:
		break;
	}


	if (HomeControl.settings.Heating == true)
	{
		if (HomeControl.settings.DayMode == true)
		{
			if (HomeControl.centralHeating.DaySet + 1.5 > HomeControl.sensor.Inside && !digitalRead(CHSW))
				digitalWrite(CHSW, HIGH);

			if (HomeControl.centralHeating.DaySet + 1.5 < HomeControl.sensor.Inside && digitalRead(CHSW))
				digitalWrite(CHSW, LOW);

			if (HomeControl.centralHeating.DaySet + 1.5 > HomeControl.sensor.Inside && HomeControl.centralHeating.Water >= 37 && !digitalRead(CONVSW))
				digitalWrite(CONVSW, HIGH);

			if (HomeControl.centralHeating.DaySet + 1.5 < HomeControl.sensor.Inside && HomeControl.centralHeating.Water < 37 && digitalRead(CONVSW) == HIGH)
				digitalWrite(CONVSW, LOW);
		}
		else
		{
			if (HomeControl.centralHeating.NightSet + 1.5 > HomeControl.sensor.Inside && !digitalRead(CHSW))
				digitalWrite(CHSW, HIGH);
			if (HomeControl.centralHeating.NightSet + 1.5 < HomeControl.sensor.Inside && digitalRead(CHSW))
				digitalWrite(CHSW, LOW);

			if (HomeControl.centralHeating.NightSet + 1.5 > HomeControl.sensor.Inside && HomeControl.centralHeating.Water >= 37 && !digitalRead(CONVSW))
				digitalWrite(CONVSW, HIGH);

			if (HomeControl.centralHeating.NightSet + 1.5 < HomeControl.sensor.Inside && HomeControl.centralHeating.Water < 37 && digitalRead(CONVSW) == HIGH)
				digitalWrite(CONVSW, LOW);
		}
	}

	if (HomeControl.settings.DayMode == false)
	{
		if (digitalRead(CHSW)) digitalWrite(CHSW, LOW);
		if (digitalRead(CONVSW)) digitalWrite(CONVSW, LOW);
	}

	if (HomeControl.settings.SmokeAbsorber && map(analogRead(SMOKE_S),0,1023,0,100) >= 11)
	{
		SmokeAbsTimer.Begin();
		if (!digitalRead(VENTSW)) digitalWrite(VENTSW, HIGH);
	}

	if (HomeControl.settings.SmokeAbsorber && digitalRead(VENTSW) == HIGH && map(analogRead(SMOKE_S), 0, 1023, 0, 100) < 11 && SmokeAbsTimer.Elapsed() > 200)
	{
		digitalWrite(VENTSW, LOW);
	}

	if (HomeControl.settings.SmokeAbsorber == false && digitalRead(VENTSW))
		digitalWrite(VENTSW, LOW);

	if (RefreshTimer.Elapsed() > 30)
	{
		HomeControl.RefreshSensors();
		RefreshTimer.Reset();
	}
}

