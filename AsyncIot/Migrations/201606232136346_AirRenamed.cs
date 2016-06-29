namespace AsyncIot.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class AirRenamed : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Sensors", "Smoke", c => c.Short(nullable: false));
            DropColumn("dbo.Sensors", "AirQuality");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Sensors", "AirQuality", c => c.Short(nullable: false));
            DropColumn("dbo.Sensors", "Smoke");
        }
    }
}
