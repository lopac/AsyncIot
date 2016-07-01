using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using AsyncIot.Models.Database;
using AsyncIot.ViewModels;

namespace AsyncIot.Controllers
{
    public class ChartController : ApiController
    {
        private DatabaseContext db = new DatabaseContext();

        public IHttpActionResult Get()
        {

            var labels = new List<string>();
            var presentSnaps = db.PresentSnaps();

            foreach (var snap in db.PresentSnaps())
            {
                labels.Add(snap.DateTime.ToString("HH:mm"));
            }


            var model = new ChartViewModel
            {
                Labels = labels,
                Charts = new List<object>
                {
                    new Chart<double>
                    {
                        Title = "Temperatures",
                        Series = new List<Serie<double>>
                        {
                            new Serie<double>
                            {
                                name = "Outside",
                                data = presentSnaps.Select(x => x.Sensor.Outside)
                            },
                            new Serie<double>
                            {
                                name = "Inside",
                                data = presentSnaps.Select(x => x.Sensor.Inside)
                            }
                        }
                    },
                    new Chart<double>
                    {
                        Title = "Humidity",
                        Series = new List<Serie<double>>
                        {
                            new Serie<double>
                            {
                                name = "Humidity",
                                data = presentSnaps.Select(x => x.Sensor.Humidity)
                            }
                        }
                    },
                    new Chart<short>
                    {
                        Title = "Illuminance",
                        Series = new List<Serie<short>>
                        {
                            new Serie<short>
                            {
                                name = "Illuminance",
                                data = presentSnaps.Select(x => x.Sensor.Lux)
                            }
                        }
                    }
                }
            };

            return Ok(model);

        }

    }
}
