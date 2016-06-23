using System;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace AsyncIot.Models
{
    public class Snap
    {
        [Key,JsonIgnore]
        public int Id { get; set; }
        public DateTimeOffset DateTime { get; set; }
        public virtual Sensor Sensor{ get; set; }
        public virtual CentralHeating CentralHeating { get; set; }
    }
}