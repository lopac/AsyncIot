using System;
using System.Web.Http;
using AsyncIot.Models;
using AsyncIot.Helpers;

namespace AsyncIot.Controllers
{
    public class SnapController : ApiController
    {
        private readonly TimeZoneInfo _hrTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Central Europe Standard Time");

        public IHttpActionResult Get(string id)
        {
            if (id != Api.Key)
            {
                return BadRequest("Bad API key!");
            }


            if (Arduino.Response == null)
            {
                return Ok();
            }

            using (var db = new DatabaseContext())
            {
                db.Snaps.Add(new Snap
                {
                    DateTime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, _hrTimeZone),
                    CentralHeating = Arduino.Response.CentralHeating,
                    Sensor = Arduino.Response.Sensor
                });

                db.SaveChanges();
            }

            //Must always return 200 OK because of CronJob portal that stops CronJob if there is error
            return Ok();
        }
    }
}