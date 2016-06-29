using System.Collections.Generic;
using System.Linq;

namespace AsyncIot.ViewModels
{
    public class ChartView
    {
        public ICollection<object> Charts { get; set; }
        public ICollection<string> Labels { get; set; }
    }
}