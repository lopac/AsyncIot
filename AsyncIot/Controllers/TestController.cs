using System.Linq;
using System.Web.Http;
using AsyncIot.Models;

namespace AsyncIot.Controllers
{
    public class TestController : ApiController
    {
        public IHttpActionResult Get()
        {
            using (var db = new DatabaseContext())
            {
                return Ok(db.Snaps.OrderByDescending(x => x.Sensor.Lux).First().Sensor);
            }
        }
    }
}