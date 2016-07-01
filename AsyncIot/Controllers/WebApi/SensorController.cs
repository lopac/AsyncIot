using System;
using System.Web.Http;
using AsyncIot.Helpers;
using AsyncIot.Models.Database;
using AsyncIot.ViewModels;

namespace AsyncIot.Controllers
{
    public class SensorController : ApiController
    {
        private DatabaseContext db = new DatabaseContext();
        private readonly TimeZoneInfo _hrTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Central Europe Standard Time");
        public IHttpActionResult Get()
        {

            var response = Arduino.Response;

            var model = new HomeViewModel
            {
                Sensor = response.Sensor,
                Time = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, _hrTimeZone).ToString("HH:mm"),
                SunriseTime = db.Sun(x => x.DateTime.Hour < 12, x => x.Sensor.Lux >= 50, true)?.DateTime.ToString("HH:mm"),
                SunsetTime = db.Sun(x => x.DateTime.Hour > 16, x => x.Sensor.Lux <= 50, false)?.DateTime.ToString("HH:mm")
            };

            return Ok(model);
        }
    }
}
