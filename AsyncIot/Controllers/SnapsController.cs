using System;
using System.Linq;
using System.Web.Http;
using AsyncIot.Models;

namespace AsyncIot.Controllers
{
    public class SnapsController : ApiController
    {
        private DatabaseContext db = new DatabaseContext();
        private readonly TimeZoneInfo _hrTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Central Europe Standard Time");

        // GET: api/Snaps
        public IHttpActionResult GetSnaps()
        {
            return Ok(db.Snaps.ToList());
        }

     

        public IHttpActionResult GetSnap(string id)
        {

            switch (id)
            {
                case "today":
                    var td = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, _hrTimeZone).Date;


                    return Ok(db.Snaps.Where(x => (x.DateTime.Day == td.Day && x.DateTime.Month == td.Month && x.DateTime.Year == td.Year)).ToList());
                default:
                    return InternalServerError();
            }

            
        }

    }
}