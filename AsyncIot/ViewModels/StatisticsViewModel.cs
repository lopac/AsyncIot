using System.Collections.Generic;
using AsyncIot.Models.Database;

namespace AsyncIot.ViewModels
{
    public sealed class StatisticsViewModel
    {
        public string Date { get; set; }
        public ICollection<string> Sunrises { get; set; }
        public ICollection<string> Sunsets { get; set; }
        public ICollection<EOutside> EOutsides  { get; set; }
        public ICollection<EInside> EInsides { get; set; }

        public StatisticsViewModel()
        {
            Sunrises = new List<string>();
            Sunsets = new List<string>();
            EOutsides = new List<EOutside>();
            EInsides = new List<EInside>();
        }

    }
}