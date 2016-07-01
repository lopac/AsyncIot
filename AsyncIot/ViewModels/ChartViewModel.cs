using System.Collections.Generic;

namespace AsyncIot.ViewModels
{
    public class ChartViewModel
    {
        public ICollection<object> Charts { get; set; }
        public ICollection<string> Labels { get; set; }
    }
}