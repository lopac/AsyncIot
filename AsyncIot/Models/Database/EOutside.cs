using System.ComponentModel.DataAnnotations;

namespace AsyncIot.Models.Database
{
    public enum ExtremeType { Minimum, Maximum}
    public class EOutside : ISensorExtreme
    {
        [Key]
        public int Id { get; set; }
        public ExtremeType ExtremeType { get; set; }
        public double Value { get; set; }
        public string Time { get; set; }
        public virtual Extreme Extreme { get; set; }
    }
}