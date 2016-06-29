namespace AsyncIot.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.CentralHeatings",
                c => new
                    {
                        Id = c.Int(nullable: false),
                        Water = c.Double(nullable: false),
                        Dayset = c.Double(nullable: false),
                        Nightset = c.Double(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Snaps", t => t.Id)
                .Index(t => t.Id);
            
            CreateTable(
                "dbo.Snaps",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        DateTime = c.DateTimeOffset(nullable: false, precision: 7),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Sensors",
                c => new
                    {
                        Id = c.Int(nullable: false),
                        Inside = c.Double(nullable: false),
                        Outside = c.Double(nullable: false),
                        Humidity = c.Double(nullable: false),
                        Lux = c.Short(nullable: false),
                        AirQuality = c.Short(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Snaps", t => t.Id)
                .Index(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Sensors", "Id", "dbo.Snaps");
            DropForeignKey("dbo.CentralHeatings", "Id", "dbo.Snaps");
            DropIndex("dbo.Sensors", new[] { "Id" });
            DropIndex("dbo.CentralHeatings", new[] { "Id" });
            DropTable("dbo.Sensors");
            DropTable("dbo.Snaps");
            DropTable("dbo.CentralHeatings");
        }
    }
}
