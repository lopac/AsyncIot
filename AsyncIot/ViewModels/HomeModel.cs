using AsyncIot.Models;

namespace AsyncIot.ViewModels
{
    public class HomeModel
    {
        public string Time { get; set; }
        public Sensor Sensor { get; set; }
        public string SunriseTime { get; set; }
        public string SunsetTime { get; set; }
    }
}