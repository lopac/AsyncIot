using System.Collections.Generic;

namespace AsyncIot.ViewModels
{
    public class Chart<T>
    {
        public string Title { get; set; }
        public ICollection<Serie<T>> Series { get; set; }
    }
}