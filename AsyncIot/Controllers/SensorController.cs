using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AsyncIot.Models;
using AsyncIot.ViewModel;

namespace AsyncIot.Controllers
{
    public class SensorController : ApiController
    {
        private DatabaseContext db = new DatabaseContext();
        private readonly TimeZoneInfo _hrTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Central Europe Standard Time");
        public IHttpActionResult Get()
        {
            var snapController = new SnapController();
            snapController.Get("b8ac3b5508740332bef1033b923425b2d1b7cedffb25d26b4eb8d9c0073c4e10");

            var td = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, _hrTimeZone).Date;

            var todaySnaps = db.Snaps.Where(x => x.DateTime.Day == td.Day && x.DateTime.Month == td.Month && x.DateTime.Year == td.Year);

            var maxSnap = todaySnaps.OrderByDescending(x => x.Sensor.Outside).First();
            var minSnap = todaySnaps.OrderBy(x => x.Sensor.Outside).First();

            var homeViewModel = new HomeViewModel
            {
                Sensor = db.Snaps.OrderByDescending(x => x.Id).First().Sensor,
                OutsideMax = maxSnap.Sensor.Outside,
                OutsideMin = minSnap.Sensor.Outside,
                OutsideMinTime = minSnap.DateTime.ToString("HH:mm"),
                OutsideMaxTime = maxSnap.DateTime.ToString("HH:mm"),
                Time = db.Snaps.ToList().Last().DateTime.ToString("HH:mm")
            };


            return Ok(homeViewModel);
        }
    }
}
