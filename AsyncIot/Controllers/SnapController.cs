﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Sockets;
using System.Text;
using System.Web.Http;
using AsyncIot.Models;
using AsyncIot.ViewModel;
using Newtonsoft.Json;

namespace AsyncIot.Controllers
{
    public class SnapController : ApiController
    {
        private readonly TimeZoneInfo _hrTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Central Europe Standard Time");
        private ArduinoResponse ArduinoResponse { get; set; }

        public IHttpActionResult Get(string id)
        {
            if (id != "b8ac3b5508740332bef1033b923425b2d1b7cedffb25d26b4eb8d9c0073c4e10")
            {
                return InternalServerError();
            }
            try
            {
                var client = new TcpClient("mlopac.ddns.net", 8899);
                var data = Encoding.ASCII.GetBytes("G");

                var stream = client.GetStream();
                stream.Write(data, 0, data.Length);


                data = new byte[1024];

                var bytes = stream.Read(data, 0, data.Length);
                var response = Encoding.ASCII.GetString(data, 0, bytes);

                ArduinoResponse = JsonConvert.DeserializeObject<ArduinoResponse>(response);

                stream.Close();
                client.Close();
            }
            catch (Exception)
            {
                //todo Look up for Exceptions
                ArduinoResponse = null;
            }

            if (ArduinoResponse != null)
            {
                var snap = new Snap
                {
                    DateTime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, _hrTimeZone),
                    CentralHeating = ArduinoResponse.CentralHeating,
                    Sensor = ArduinoResponse.Sensor
                };

                using (var db = new DatabaseContext())
                {
                    db.Snaps.Add(snap);
                    db.SaveChanges();
                }
            }

            //Must always return 200 OK because of CronJob portal that stops CronJob if there is error
            return Ok();
        }
    }
}