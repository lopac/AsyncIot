using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AsyncIot.Models;
using AsyncIot.ViewModel;

namespace AsyncIot.Controllers
{
    public class HomeController : Controller
    {
        private DatabaseContext db = new DatabaseContext();
        private readonly TimeZoneInfo _hrTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Central Europe Standard Time");
        public ActionResult Index()
        {
            var td = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, _hrTimeZone).Date;

            var todaySnaps =
                db.Snaps.Where(
                    x => (x.DateTime.Day == td.Day && x.DateTime.Month == td.Month && x.DateTime.Year == td.Year));


            var maxSnap = todaySnaps.OrderByDescending(x => x.Sensor.Outside).First();
            var minSnap = todaySnaps.OrderBy(x => x.Sensor.Outside).First();

            var model = new HomeViewModel
            {
                Sensor = db.Snaps.OrderByDescending(x=> x.Id).First().Sensor,
                OutsideMax = maxSnap.Sensor.Outside,
                OutsideMin = minSnap.Sensor.Outside,
                OutsideMinTime = minSnap.DateTime.ToString("HH:mm"),
                OutsideMaxTime = maxSnap.DateTime.ToString("HH:mm"),
                Time = db.Snaps.ToList().Last().DateTime.ToString("HH:mm")
            };




            return View(model);
        }
    }
}