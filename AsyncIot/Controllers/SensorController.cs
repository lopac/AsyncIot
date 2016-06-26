using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AsyncIot.Models;
using AsyncIot.ViewModels;

namespace AsyncIot.Controllers
{
    public class SensorController : ApiController
    {
        private DatabaseContext db = new DatabaseContext();
        public IHttpActionResult Get()
        {
            var snapController = new SnapController();
            snapController.Get("b8ac3b5508740332bef1033b923425b2d1b7cedffb25d26b4eb8d9c0073c4e10");




            var model = new HomeModel
            {
                Sensor = db.Snaps.OrderByDescending(x => x.Id).First().Sensor,
                Time = db.Snaps.OrderByDescending(x => x.Id).First().DateTime.ToString("HH:mm"),
                SunriseTime = db.Sun(x => x.DateTime.Hour < 12, x => x.Sensor.Lux >= 50, true).DateTime.ToString("HH:mm"),
                SunsetTime = db.Sun(x => x.DateTime.Hour > 12, x => x.Sensor.Lux <= 50, false).DateTime.ToString("HH:mm")
            };



            return Ok(model);
        }
    }
}
