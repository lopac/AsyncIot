using System.ComponentModel.DataAnnotations;

namespace AsyncIot.Models.Database
{
    public class EInside : ISensorExtreme
    {
        [Key]
        public int Id { get; set; }
        public ExtremeType ExtremeType { get; set; }
        public string Time { get; set; }
        public double Value { get; set; }
        public virtual Extreme Extreme { get; set; }

    }
}