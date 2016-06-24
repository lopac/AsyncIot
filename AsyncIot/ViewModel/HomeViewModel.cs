using AsyncIot.Models;

namespace AsyncIot.ViewModel
{
    public class HomeViewModel
    {
        public string Time { get; set; }
        public Sensor Sensor { get; set; }
        public double OutsideMin { get; set; }
        public double OutsideMax { get; set; }

        public string OutsideMinTime { get; set; }
        public string OutsideMaxTime { get; set; }
    }
}