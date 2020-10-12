using CACI.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace CACI.DAL
{
	public partial class CacidbContext : DbContext
    {
        public CacidbContext()
        {
        }

        public CacidbContext(DbContextOptions<CacidbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Action> Action { get; set; }
        public virtual DbSet<Application> Application { get; set; }
        public virtual DbSet<AppSettings> AppSettings { get; set; }
        public virtual DbSet<Case> Case { get; set; }
        public virtual DbSet<CaseHistory> CaseHistory { get; set; }
        public virtual DbSet<CaseOffice> CaseOffice { get; set; }
        public virtual DbSet<CaseSubject> CaseSubject { get; set; }
        public virtual DbSet<Claim> Claim { get; set; }
        public virtual DbSet<Databasechangelog> Databasechangelog { get; set; }
        public virtual DbSet<Databasechangeloglock> Databasechangeloglock { get; set; }
        public virtual DbSet<Location> Location { get; set; }
        public virtual DbSet<LocationCertification> LocationCertification { get; set; }
        public virtual DbSet<LocationPlan> LocationPlan { get; set; }
        public virtual DbSet<Notification> Notification { get; set; }
        public virtual DbSet<NotificationType> NotificationType { get; set; }
        public virtual DbSet<Office> Office { get; set; } 
        public virtual DbSet<Role> Role { get; set; }
        public virtual DbSet<RoleClaim> RoleClaim { get; set; }
        public virtual DbSet<Section> Section { get; set; }
        public virtual DbSet<Subject> Subject { get; set; }
        public virtual DbSet<SubjectIdentification> SubjectIdentification { get; set; }
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<UserRole> UserRole { get; set; }
       
        public virtual DbSet<ATemplate> ATemplate { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //Method not implemented
        }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Action>(entity =>
            {
                entity.ToTable("Action", "inv");

                entity.HasComment("A String");

                entity.Property(e => e.ActionId).HasColumnName("ActionID");

                entity.Property(e => e.ActionName)
                    .IsRequired()
                    .HasColumnName("Action")
                    .HasMaxLength(50);

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(200);
            });

            modelBuilder.Entity<AppSettings>(entity =>
            {
                entity.HasKey(e => e.AppSettingId)
                    .HasName("PK_AppSetting");

                entity.HasComment("AppSettings");

                entity.Property(e => e.AppSettingName).HasMaxLength(200);

                entity.Property(e => e.AppSettingValue).HasMaxLength(500);
            });

            modelBuilder.Entity<Case>(entity =>
            {
                entity.ToTable("Case", "inv");

                entity.HasComment("A String");

                entity.Property(e => e.CaseId).HasColumnName("CaseID");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.Description).HasMaxLength(200);

                entity.Property(e => e.LastModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.StatusId).HasColumnName("StatusID");

                entity.Property(e => e.Title).HasMaxLength(100);
            });

            modelBuilder.Entity<CaseHistory>(entity =>
            {
                entity.ToTable("CaseHistory", "inv");

                entity.HasComment("A String");

                entity.Property(e => e.CaseHistoryId).HasColumnName("CaseHistoryID");

                entity.Property(e => e.ActionId).HasColumnName("ActionID");

                entity.Property(e => e.CaseId).HasColumnName("CaseID");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.HasOne(d => d.Action)
                    .WithMany(p => p.CaseHistory)
                    .HasForeignKey(d => d.ActionId)
                    .HasConstraintName("fk_CaseHistory_Action");

                entity.HasOne(d => d.Case)
                    .WithMany(p => p.CaseHistory)
                    .HasForeignKey(d => d.CaseId)
                    .HasConstraintName("FK_CaseHistory_Case");
            });

            modelBuilder.Entity<CaseOffice>(entity =>
            {
                entity.ToTable("CaseOffice", "inv");

                entity.HasComment("Case Office");

                entity.Property(e => e.CaseOfficeId).HasColumnName("CaseOfficeID");

                entity.Property(e => e.CaseId).HasColumnName("CaseID");

                entity.Property(e => e.OfficeId).HasColumnName("OfficeID");

                entity.HasOne(d => d.Case)
                    .WithMany(p => p.CaseOffice)
                    .HasForeignKey(d => d.CaseId)
                    .HasConstraintName("FK_CaseOffice_Office");
            });

            modelBuilder.Entity<CaseSubject>(entity =>
            {
                entity.ToTable("CaseSubject", "inv");

                entity.HasComment("Case Subject");

                entity.Property(e => e.CaseSubjectId).HasColumnName("CaseSubjectID");

                entity.Property(e => e.CaseId).HasColumnName("CaseID");

                entity.Property(e => e.SubjectId).HasColumnName("SubjectID");

                entity.HasOne(d => d.Subject)
                    .WithMany(p => p.CaseSubject)
                    .HasForeignKey(d => d.SubjectId)
                    .HasConstraintName("FK_CaseSubject_Subject");
            });

            modelBuilder.Entity<Claim>(entity =>
            {
                entity.HasComment("Claim");

                entity.Property(e => e.ClaimCode).HasMaxLength(50);

                entity.Property(e => e.Description).HasMaxLength(200);

                entity.Property(e => e.Title).HasMaxLength(50);
            });



            modelBuilder.Entity<Role>(entity =>
            {
                entity.HasComment("Role");

                entity.Property(e => e.RoleTitle).HasMaxLength(50);

                entity.Property(e => e.Description).HasMaxLength(200);
                 
            });


            modelBuilder.Entity<Databasechangelog>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("DATABASECHANGELOG");

                entity.Property(e => e.Author)
                    .IsRequired()
                    .HasColumnName("AUTHOR")
                    .HasMaxLength(255);

                entity.Property(e => e.Comments)
                    .HasColumnName("COMMENTS")
                    .HasMaxLength(255);

                entity.Property(e => e.Contexts)
                    .HasColumnName("CONTEXTS")
                    .HasMaxLength(255);

                entity.Property(e => e.Dateexecuted)
                    .HasColumnName("DATEEXECUTED")
                    .HasColumnType("datetime2(3)");

                entity.Property(e => e.DeploymentId)
                    .HasColumnName("DEPLOYMENT_ID")
                    .HasMaxLength(10);

                entity.Property(e => e.Description)
                    .HasColumnName("DESCRIPTION")
                    .HasMaxLength(255);

                entity.Property(e => e.Exectype)
                    .IsRequired()
                    .HasColumnName("EXECTYPE")
                    .HasMaxLength(10);

                entity.Property(e => e.Filename)
                    .IsRequired()
                    .HasColumnName("FILENAME")
                    .HasMaxLength(255);

                entity.Property(e => e.Id)
                    .IsRequired()
                    .HasColumnName("ID")
                    .HasMaxLength(255);

                entity.Property(e => e.Labels)
                    .HasColumnName("LABELS")
                    .HasMaxLength(255);

                entity.Property(e => e.Liquibase)
                    .HasColumnName("LIQUIBASE")
                    .HasMaxLength(20);

                entity.Property(e => e.Md5sum)
                    .HasColumnName("MD5SUM")
                    .HasMaxLength(35);

                entity.Property(e => e.Orderexecuted).HasColumnName("ORDEREXECUTED");

                entity.Property(e => e.Tag)
                    .HasColumnName("TAG")
                    .HasMaxLength(255);
            });

            modelBuilder.Entity<Databasechangeloglock>(entity =>
            {
                entity.ToTable("DATABASECHANGELOGLOCK");

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.Locked).HasColumnName("LOCKED");

                entity.Property(e => e.Lockedby)
                    .HasColumnName("LOCKEDBY")
                    .HasMaxLength(255);

                entity.Property(e => e.Lockgranted)
                    .HasColumnName("LOCKGRANTED")
                    .HasColumnType("datetime2(3)");
            });


            modelBuilder.Entity<Location>(entity =>
            {
                entity.ToTable("Location", "plans");

                entity.HasComment("Location");

                entity.Property(e => e.LocationId).HasColumnName("LocationID");

                entity.Property(e => e.Address1).HasMaxLength(200);

                entity.Property(e => e.Address2).HasMaxLength(200);

                entity.Property(e => e.Address3).HasMaxLength(200);

                entity.Property(e => e.City).HasMaxLength(200);

                entity.Property(e => e.Country).HasMaxLength(200);

                entity.Property(e => e.Critical)
                    .HasMaxLength(10)
                    .IsFixedLength();

                entity.Property(e => e.Latitude).HasMaxLength(50);

                entity.Property(e => e.Longitude).HasMaxLength(50);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.Property(e => e.State).HasMaxLength(200);
            });

            modelBuilder.Entity<LocationCertification>(entity =>
            {
                entity.ToTable("LocationCertification", "plans");

                entity.HasComment("LocationCertification");

                entity.Property(e => e.LocationCertificationId)
                    .HasColumnName("LocationCertificationID")
                    .ValueGeneratedNever();

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.CreatedUser)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.LocationId).HasColumnName("LocationID");

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.ModifiedUser)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.StatusId).HasColumnName("StatusID");

                entity.HasOne(d => d.Location)
                    .WithMany(p => p.LocationCertification)
                    .HasForeignKey(d => d.LocationId)
                    .HasConstraintName("FK_LocationCertification_Location");
            });

            modelBuilder.Entity<LocationPlan>(entity =>
            {
                entity.ToTable("LocationPlan", "plans");

                entity.HasComment("LocationPlan");

                entity.Property(e => e.LocationPlanId).HasColumnName("LocationPlanID");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.CreatedUser).HasMaxLength(50);

                entity.Property(e => e.LocationId).HasColumnName("LocationID");

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.SectionId).HasColumnName("SectionID");

                entity.Property(e => e.StatusId).HasColumnName("StatusID");

                entity.HasOne(d => d.Location)
                    .WithMany(p => p.LocationPlan)
                    .HasForeignKey(d => d.LocationId)
                    .HasConstraintName("FK_LocationPlan_Location");
            });

            modelBuilder.Entity<Notification>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("Notification", "notices");

                entity.HasComment("Notification");

                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Message).HasMaxLength(200);

                entity.Property(e => e.ModifiedBy).HasMaxLength(50);

                entity.Property(e => e.ModifiedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.NotificationId)
                    .HasColumnName("NotificationID")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.NotificationTypeId).HasColumnName("NotificationTypeID");

                entity.HasOne(d => d.NotificationType)
                    .WithMany()
                    .HasForeignKey(d => d.NotificationTypeId)
                    .HasConstraintName("FK_Notification_NotificationType");
            });

            modelBuilder.Entity<NotificationType>(entity =>
            {
                entity.ToTable("NotificationType", "notices");

                entity.HasComment("NotificationType");

                entity.Property(e => e.NotificationTypeId).HasColumnName("NotificationTypeID");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(150);
            });

            modelBuilder.Entity<Office>(entity =>
            {
                entity.ToTable("Office", "inv");

                entity.HasComment("Office");

                entity.Property(e => e.OfficeId).HasColumnName("OfficeID");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Section>(entity =>
            {
                entity.ToTable("Section", "plans");

                entity.HasComment("Section");

                entity.Property(e => e.SectionId).HasColumnName("SectionID");

                entity.Property(e => e.Title).HasMaxLength(100);
            });

            modelBuilder.Entity<Subject>(entity =>
            {
                entity.ToTable("Subject", "inv");

                entity.HasComment("Subject");

                entity.Property(e => e.SubjectId).HasColumnName("SubjectID");

                entity.Property(e => e.Description).HasMaxLength(200);

                entity.Property(e => e.Dob)
                    .HasColumnName("DOB")
                    .HasMaxLength(200);

                entity.Property(e => e.FirstName).HasMaxLength(200);

                entity.Property(e => e.LastName).HasMaxLength(200);

                entity.Property(e => e.MiddleName).HasMaxLength(200);
            });

            modelBuilder.Entity<SubjectIdentification>(entity =>
            {
                entity.ToTable("SubjectIdentification", "inv");

                entity.HasComment("SubjectIdentification");

                entity.Property(e => e.SubjectIdentificationId).HasColumnName("SubjectIdentificationID");

                entity.Property(e => e.Description).HasMaxLength(200);

                entity.Property(e => e.FirstName).HasMaxLength(200);

                entity.Property(e => e.Identification).HasMaxLength(200);

                entity.Property(e => e.IdentificationId).HasColumnName("IdentificationID");

                entity.Property(e => e.SubjectId).HasColumnName("SubjectID");

                entity.HasOne(d => d.Subject)
                    .WithMany(p => p.SubjectIdentification)
                    .HasForeignKey(d => d.SubjectId)
                    .HasConstraintName("FK_SubjectIdentification_Identification");
            });


 

            modelBuilder.Entity<ATemplate>(entity =>
            {
                entity.HasKey("Id");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);


    }
}
