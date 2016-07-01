using AsyncIot.Models.Database;

namespace AsyncIot.ViewModels
{
    public class HomeViewModel
    {
        public string Time { get; set; }
        public Sensor Sensor { get; set; }
        public string SunriseTime { get; set; }
        public string SunsetTime { get; set; }
    }
}