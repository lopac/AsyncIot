using System;
using System.Web.Mvc;
using AsyncIot.Helpers;
using AsyncIot.Models;
using AsyncIot.ViewModels;

namespace AsyncIot.Controllers
{
    public class HomeController : Controller
    {
        private DatabaseContext db = new DatabaseContext();
        private readonly TimeZoneInfo _hrTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Central Europe Standard Time");
        public ActionResult Index()
        {


            var response = Arduino.Response;

            var model = new HomeModel
            {
                Sensor = response.Sensor,
                Time = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, _hrTimeZone).ToString("HH:mm"),
                SunriseTime = db.Sun(x => x.DateTime.Hour < 12, x => x.Sensor.Lux >= 50, true)?.DateTime.ToString("HH:mm"),
                SunsetTime = db.Sun(x => x.DateTime.Hour > 16, x => x.Sensor.Lux <= 50, false)?.DateTime.ToString("HH:mm")
            };


            return View(model);
        }
    }
}