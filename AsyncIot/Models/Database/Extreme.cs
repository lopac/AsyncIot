using System;
using System.Collections.Generic;

namespace AsyncIot.Models.Database
{
    public class Extreme
    {
        public int Id { get; set; }
        public virtual ICollection<EOutside> Outside { get; set; }
        public virtual ICollection<EInside> Inside { get; set; }
        public virtual ICollection<EHumidity> Humdity { get; set; }
        public DateTime Date { get; set; }
    }
}