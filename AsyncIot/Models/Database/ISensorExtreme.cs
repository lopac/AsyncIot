namespace AsyncIot.Models.Database
{
    public interface ISensorExtreme
    {
        ExtremeType ExtremeType { get; set; }
        int Id { get; set; }
        string Time { get; set; }
        double Value { get; set; }
    }
}