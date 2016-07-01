using System.Collections.Generic;
using System.Web.Http;
using AsyncIot.Models.Database;
using AsyncIot.ViewModels;

namespace AsyncIot.Controllers
{
    public class ExtremesController : ApiController
    {
        private readonly List<ExtremeViewModel> _extremeSnaps = new List<ExtremeViewModel>();

        public IHttpActionResult GetExtremes()
        {
            using (var db = new DatabaseContext())
            {
                _extremeSnaps.Add(
                    new ExtremeViewModel
                    {
                        Id = "Outside Minimum",
                        Value =
                            db.ExtremeSnap(x => x.Sensor.Outside, DatabaseContext.ExtremeType.DayMinimum)
                                .Sensor.Outside,
                        Time =
                            db.ExtremeSnap(x => x.Sensor.Outside, DatabaseContext.ExtremeType.DayMinimum)
                                .DateTime.ToString("HH:mm")
                    });

                _extremeSnaps.Add(new ExtremeViewModel
                {
                    Id = "Outside Maximum",
                    Value =
                        db.ExtremeSnap(x => x.Sensor.Outside, DatabaseContext.ExtremeType.DayMaximum).Sensor.Outside,
                    Time =
                        db.ExtremeSnap(x => x.Sensor.Outside, DatabaseContext.ExtremeType.DayMaximum)
                            .DateTime.ToString("HH:mm")
                });

                _extremeSnaps.Add(new ExtremeViewModel
                {
                    Id = "Inside Minimum",
                    Value =
                        db.ExtremeSnap(x => x.Sensor.Inside, DatabaseContext.ExtremeType.DayMinimum).Sensor.Inside,
                    Time =
                        db.ExtremeSnap(x => x.Sensor.Inside, DatabaseContext.ExtremeType.DayMinimum)
                            .DateTime.ToString("HH:mm")
                });

                _extremeSnaps.Add(new ExtremeViewModel
                {
                    Id = "Inside Maximum",
                    Value =
                        db.ExtremeSnap(x => x.Sensor.Inside, DatabaseContext.ExtremeType.DayMaximum).Sensor.Inside,
                    Time =
                        db.ExtremeSnap(x => x.Sensor.Inside, DatabaseContext.ExtremeType.DayMaximum)
                            .DateTime.ToString("HH:mm")
                });

                _extremeSnaps.Add(new ExtremeViewModel
                {
                    Id = "Humidity Minimum",
                    Value =
                        db.ExtremeSnap(x => x.Sensor.Humidity, DatabaseContext.ExtremeType.DayMinimum)
                            .Sensor.Humidity,
                    Time =
                        db.ExtremeSnap(x => x.Sensor.Humidity, DatabaseContext.ExtremeType.DayMinimum)
                            .DateTime.ToString("HH:mm")
                });

                _extremeSnaps.Add(new ExtremeViewModel
                {
                    Id = "Humidity Maximum",
                    Value =
                        db.ExtremeSnap(x => x.Sensor.Humidity, DatabaseContext.ExtremeType.DayMaximum)
                            .Sensor.Humidity,
                    Time =
                        db.ExtremeSnap(x => x.Sensor.Humidity, DatabaseContext.ExtremeType.DayMaximum)
                            .DateTime.ToString("HH:mm")
                });
            }
            return Ok(_extremeSnaps);
        }

        public IHttpActionResult GetMonthExtremes(string id)
        {
            if (id != "month")
            {
                return BadRequest();
            }

            using (var db = new DatabaseContext())
            {
                _extremeSnaps.Add(
                    new ExtremeViewModel
                    {
                        Id = "Outside Minimum",
                        Value =
                            db.ExtremeSnap(x => x.Sensor.Outside, DatabaseContext.ExtremeType.MonthMinimum)
                                .Sensor.Outside,
                        Time =
                            db.ExtremeSnap(x => x.Sensor.Outside, DatabaseContext.ExtremeType.MonthMinimum)
                                .DateTime.ToString("HH:mm dd.MM.yyyy.")
                    });

                _extremeSnaps.Add(new ExtremeViewModel
                {
                    Id = "Outside Maximum",
                    Value =
                        db.ExtremeSnap(x => x.Sensor.Outside, DatabaseContext.ExtremeType.MonthMaximum).Sensor.Outside,
                    Time =
                        db.ExtremeSnap(x => x.Sensor.Outside, DatabaseContext.ExtremeType.MonthMaximum)
                            .DateTime.ToString("HH:mm dd.MM.yyyy.")
                });

                _extremeSnaps.Add(new ExtremeViewModel
                {
                    Id = "Inside Minimum",
                    Value =
                        db.ExtremeSnap(x => x.Sensor.Inside, DatabaseContext.ExtremeType.MonthMinimum).Sensor.Inside,
                    Time =
                        db.ExtremeSnap(x => x.Sensor.Inside, DatabaseContext.ExtremeType.MonthMinimum)
                            .DateTime.ToString("HH:mm dd.MM.yyyy.")
                });

                _extremeSnaps.Add(new ExtremeViewModel
                {
                    Id = "Inside Maximum",
                    Value =
                        db.ExtremeSnap(x => x.Sensor.Inside, DatabaseContext.ExtremeType.MonthMaximum).Sensor.Inside,
                    Time =
                        db.ExtremeSnap(x => x.Sensor.Inside, DatabaseContext.ExtremeType.MonthMaximum)
                            .DateTime.ToString("HH:mm dd.MM.yyyy.")
                });

                _extremeSnaps.Add(new ExtremeViewModel
                {
                    Id = "Humidity Minimum",
                    Value =
                        db.ExtremeSnap(x => x.Sensor.Humidity, DatabaseContext.ExtremeType.MonthMinimum)
                            .Sensor.Humidity,
                    Time =
                        db.ExtremeSnap(x => x.Sensor.Humidity, DatabaseContext.ExtremeType.MonthMinimum)
                            .DateTime.ToString("HH:mm dd.MM.yyyy.")
                });

                _extremeSnaps.Add(new ExtremeViewModel
                {
                    Id = "Humidity Maximum",
                    Value =
                        db.ExtremeSnap(x => x.Sensor.Humidity, DatabaseContext.ExtremeType.MonthMaximum)
                            .Sensor.Humidity,
                    Time =
                        db.ExtremeSnap(x => x.Sensor.Humidity, DatabaseContext.ExtremeType.MonthMaximum)
                            .DateTime.ToString("HH:mm dd.MM.yyyy.")
                });
            }

            return Ok(_extremeSnaps);
        }
    }
}