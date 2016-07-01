using AsyncIot.Models.Database;

namespace AsyncIot.Migrations
{
    using System.Data.Entity.Migrations;

    internal sealed class Configuration : DbMigrationsConfiguration<DatabaseContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(DatabaseContext context)
        {
            //var db = new DatabaseContext();


            //var presentMonthSnaps = db.PresentMonthSnaps().ToList();

            //var firstDay = presentMonthSnaps.First().DateTime.Date.Day;
            //var lastDay = presentMonthSnaps.Last().DateTime.Date.Day;

            //for (var i = firstDay; i < lastDay + 1; i++)
            //{
            //    var daySnaps = presentMonthSnaps.FindAll(x => x.DateTime.Date.Day == i);

            //    var dayD = daySnaps.First().DateTime.Date;

            //    var model = new ExtremeViewModel
            //    {
            //        Outside = new List<EOutside>(),
            //        Inside = new List<EInside>(),
            //        Humdity = new List<Humidity>(),
            //        Date = new DateTime(dayD.Year, dayD.Month, dayD.Day)
            //    };


            //    double value = daySnaps.Min(x => x.Sensor.Outside);

            //    model.Outside.Add(new EOutside
            //    {
            //        ExtremeType = ExtremeType.Minimum,
            //        Value = value,
            //        Time = daySnaps.Find(x => Equals(x.Sensor.Outside, value))
            //                       .DateTime.ToString("HH:mm")
            //    });


            //    value = daySnaps.Max(x => x.Sensor.Outside);

            //    model.Outside.Add(new EOutside
            //    {
            //        ExtremeType = ExtremeType.Maximum,
            //        Value = value,
            //        Time = daySnaps.Find(x => Equals(x.Sensor.Outside, value))
            //                       .DateTime.ToString("HH:mm")
            //    });

            //    value = daySnaps.Min(x => x.Sensor.Inside);

            //    model.Inside.Add(new EInside
            //    {
            //        ExtremeType = ExtremeType.Minimum,
            //        Value = value,
            //        Time = daySnaps.Find(x => Equals(x.Sensor.Inside, value))
            //                       .DateTime.ToString("HH:mm")
            //    });


            //    value = daySnaps.Max(x => x.Sensor.Inside);

            //    model.Inside.Add(new EInside
            //    {
            //        ExtremeType = ExtremeType.Maximum,
            //        Value = value,
            //        Time = daySnaps.Find(x => Equals(x.Sensor.Inside, value))
            //                       .DateTime.ToString("HH:mm")
            //    });

            //    db.Extremes.Add(model);
            //    db.SaveChanges();

            //}

        }
    }
}
