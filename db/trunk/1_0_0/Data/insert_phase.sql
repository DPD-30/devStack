INSERT INTO [dbo].[Phase]
           ([Name])
     VALUES
           ('Phase 1');

INSERT INTO [dbo].[Phase]
           ([Name])
     VALUES
           ('Phase 2');
--liquibase formatted sql
--changeSet Ananda:Claim.sql
INSERT INTO [dbo].[Phase]
           ([Name])
     VALUES
           ('Phase 3');
INSERT INTO [dbo].[Phase]
           ([Name])
     VALUES
           ('Phase 4');
INSERT INTO [dbo].[Phase]
           ([Name])
     VALUES
           ('Phase 5');
INSERT INTO [dbo].[Phase]
           ([Name])
     VALUES
           ('Phase 6');

--rollback truncate table [dbo].[Phase]


