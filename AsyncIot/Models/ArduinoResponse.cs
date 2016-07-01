using AsyncIot.Models;
using AsyncIot.Models.Database;

namespace AsyncIot.ViewModels
{
    public class ArduinoResponse
    {
        public Sensor Sensor { get; set; }
        public CentralHeating CentralHeating { get; set; }
        public Settings Settings { get; set; }
    }
}