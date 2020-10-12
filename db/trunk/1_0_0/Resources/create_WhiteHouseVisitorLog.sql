CREATE TABLE [dbo].[WhiteHouseVisitorLog](
    [VisitorId] int NULL,
	[UIN] [nvarchar](50) NULL,
	[BDGNBR] [int] NULL,
	[ACCESS_TYPE] [nvarchar](50) NULL,
	[TOA] [datetime2](7) NULL,
	[POA] [nvarchar](50) NULL,
	[TOD] [datetime2](7) NULL,
	[POD] [int] NULL,
	[APPT_MADE_DATE] [datetime2](7) NULL,
	[APPT_START_DATE] [datetime2](7) NULL,
	[APPT_END_DATE] [datetime2](7) NULL,
	[APPT_CANCEL_DATE] [datetime2](7) NULL,
	[Total_People] [int] NULL,
	[LAST_UPDATEDBY] [nvarchar](50) NULL,
	[POST] [nvarchar](50) NULL,
	[LastEntryDate] [datetime2](7) NULL,
	[TERMINAL_SUFFIX] [nvarchar](50) NULL,
	[visitee_namelast] [nvarchar](50) NULL,
	[visitee_namefirst] [nvarchar](50) NULL,
	[MEETING_LOC] [nvarchar](50) NULL,
	[MEETING_ROOM] [nvarchar](50) NULL,
	[CALLER_NAME_LAST] [nvarchar](50) NULL,
	[CALLER_NAME_FIRST] [nvarchar](50) NULL,
	[CALLER_ROOM] [nvarchar](1) NULL,
	[Description] [nvarchar](1000) NULL,
	[Release_Date] [datetime2](7) NULL
) ON [PRIMARY];

ALTER TABLE [dbo].[WhiteHouseVisitorLog]  WITH CHECK ADD  CONSTRAINT [FK_Visitor_Id] FOREIGN KEY([VisitorId])
REFERENCES [dbo].[Visitor] ([VisitorId])


