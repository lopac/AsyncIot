namespace AsyncIot.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class ISensorAdd : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Humidities",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ExtremeType = c.Int(nullable: false),
                        Time = c.String(),
                        Value = c.Double(nullable: false),
                        Extreme_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Extremes", t => t.Extreme_Id)
                .Index(t => t.Extreme_Id);
            
            CreateTable(
                "dbo.Extremes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Date = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Insides",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ExtremeType = c.Int(nullable: false),
                        Time = c.String(),
                        Value = c.Double(nullable: false),
                        Extreme_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Extremes", t => t.Extreme_Id)
                .Index(t => t.Extreme_Id);
            
            CreateTable(
                "dbo.Outsides",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ExtremeType = c.Int(nullable: false),
                        Value = c.Double(nullable: false),
                        Time = c.String(),
                        Extreme_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Extremes", t => t.Extreme_Id)
                .Index(t => t.Extreme_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Outsides", "Extreme_Id", "dbo.Extremes");
            DropForeignKey("dbo.Insides", "Extreme_Id", "dbo.Extremes");
            DropForeignKey("dbo.Humidities", "Extreme_Id", "dbo.Extremes");
            DropIndex("dbo.Outsides", new[] { "Extreme_Id" });
            DropIndex("dbo.Insides", new[] { "Extreme_Id" });
            DropIndex("dbo.Humidities", new[] { "Extreme_Id" });
            DropTable("dbo.Outsides");
            DropTable("dbo.Insides");
            DropTable("dbo.Extremes");
            DropTable("dbo.Humidities");
        }
    }
}
