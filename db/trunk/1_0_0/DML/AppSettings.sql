USE [CACIDB]
GO

TRUNCATE TABLE [dbo].[AppSettings]

INSERT INTO [dbo].[AppSettings]
           ([AppSettingName]
	   ,[AppSettingValue] )
     VALUES
           ('SMTP'
	 ,'127.0.0.1' )



INSERT INTO [dbo].[AppSettings]
           ([AppSettingName]
	   ,[AppSettingValue] )
     VALUES
           ('EmailFromAccount'
	 ,'Martinnnnn@Martinnnnn.com' )
