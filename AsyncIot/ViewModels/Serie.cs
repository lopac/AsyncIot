using System.Collections.Generic;

namespace AsyncIot.ViewModels
{
    public class Serie<T>
    {
        // ReSharper disable InconsistentNaming - cause of Typescript
        public string name { get; set; }
        public IEnumerable<T> data{ get; set; }
    }
}