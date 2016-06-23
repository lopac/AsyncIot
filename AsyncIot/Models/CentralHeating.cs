using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace AsyncIot.Models
{
    public class CentralHeating
    {

        [Key,JsonIgnore]
        public int Id { get; set; }
        public double Water { get; set; }
        public double Dayset { get; set; }
        public double Nightset { get; set; }
        [JsonIgnore]
        public virtual Snap Snap { get; set; }

    }
}