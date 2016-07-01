using System;
using System.Linq;
using System.Net.Sockets;
using System.Text;
using AsyncIot.Models.Database;
using AsyncIot.ViewModels;
using Newtonsoft.Json;

namespace AsyncIot.Helpers
{
    public class Arduino
    {
        public static ArduinoResponse Response
        {
            get
            {
                ArduinoResponse value;

                try
                {
                    var client = new TcpClient("mlopac.ddns.net", 8899);
                    var data = Encoding.ASCII.GetBytes("G");

                    var stream = client.GetStream();
                    stream.Write(data, 0, data.Length);


                    data = new byte[1024];

                    var bytes = stream.Read(data, 0, data.Length);
                    var response = Encoding.ASCII.GetString(data, 0, bytes);

                    value = JsonConvert.DeserializeObject<ArduinoResponse>(response);

                    stream.Close();
                    client.Close();

                    //if reading fails
                    if (value.Sensor.Humidity > 100)
                    {
                        value.Sensor.Humidity = 99.98;
                    }

                    if (value.Sensor.Outside > 45)
                    {
                        using (var db = new DatabaseContext())
                        {
                            value.Sensor.Outside = db.Sensors.OrderByDescending(x => x.Id).First().Outside;
                        }
                    }
                    //end

                }
                catch (Exception)
                {
                    //todo Look up for Exceptions
                    value = null;
                }



                return value;
            }
        }
    }
}