using AsyncIot.Models;

namespace AsyncIot.ViewModel
{
    public class ArduinoResponse
    {
        public Sensor Sensor { get; set; }
        public CentralHeating CentralHeating { get; set; }
        public Settings Settings { get; set; }

    }
}