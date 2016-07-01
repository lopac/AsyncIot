using System.Linq;
using System.Web.Mvc;
using AsyncIot.Models.Database;
using AsyncIot.ViewModels;

namespace AsyncIot.Controllers
{
    public class StatisticsController : Controller
    {
        public ActionResult Index()
        {
            var model = new StatisticsViewModel();

            using (var db = new DatabaseContext())
            {
                model.Date = db.Extremes.First(x => x.Date.Month == 6).Date.ToString("Y");

                foreach (var extreme in db.Extremes.Where(x => x.Date.Month == 6))
                {
                    foreach (var eOutside in extreme.Outside)
                    {
                        model.EOutsides.Add(eOutside);
                    }

                    foreach (var eInside in extreme.Inside)
                    {
                        model.EInsides.Add(eInside);
                    }

                }


            }

            return View(model);
        }
    }
}