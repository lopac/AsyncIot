using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
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


            var model = new HomeModel
            {
                Sensor = db.Snaps.OrderByDescending(x=> x.Id).First().Sensor,
                Time = db.Snaps.OrderByDescending(x => x.Id).First().DateTime.ToString("HH:mm"),
                SunriseTime = db.Sun(x => x.DateTime.Hour < 12, x => x.Sensor.Lux >= 50,true).DateTime.ToString("HH:mm"),
                SunsetTime = db.Sun(x => x.DateTime.Hour > 12, x => x.Sensor.Lux <= 50,false).DateTime.ToString("HH:mm")
            };



            return View(model);
        }
    }
}