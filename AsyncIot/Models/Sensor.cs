using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace AsyncIot.Models
{
    public class Sensor
    {
        [Key,JsonIgnore]
        public int Id { get; set; }
        public double Inside { get; set; }
        public double Outside { get; set; }
        public double Humidity { get; set; }
        public short Lux { get; set; }
        public short Smoke { get; set; }
        [JsonIgnore]
        public virtual Snap Snap{ get; set; }
    }
}