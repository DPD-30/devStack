DECLARE @COLUMN_NAME varchar(50), @ORDINAL_POSITION int, @DATA_TYPE varchar(50);
DECLARE @TABLE_NAME VARCHAR(50);

SET @TABLE_NAME ='mnist_test';

DECLARE col_cursor CURSOR
FOR 
SELECT
        COLUMN_NAME, ORDINAL_POSITION, 
		CASE DATA_TYPE
			WHEN 'int' THEN 'Numeric'
			WHEN 'tinyint' THEN 'Numeric'
			WHEN 'varchar' THEN 'String'
			WHEN 'nvarchar' THEN 'String'
			WHEN 'bit' THEN 'BOOLEAN'
			WHEN 'datetime' THEN 'Datetime'
			ELSE DATA_TYPE
		END
    FROM
        INFORMATION_SCHEMA.COLUMNS
    WHERE
        TABLE_NAME = @TABLE_NAME
    ORDER BY 2;

PRINT 'databaseChangeLog:'
PRINT '-  changeSet:'
PRINT '     id:  loadData-'+@TABLE_NAME
PRINT '     author:  Ananda'
PRINT '     changes:'
PRINT '     -  loadData:'
PRINT '          catalogName:'
PRINT '          columns:'

OPEN col_cursor;

FETCH NEXT FROM col_cursor
INTO @COLUMN_NAME, @ORDINAL_POSITION, @DATA_TYPE;

WHILE @@FETCH_STATUS =0
BEGIN

	PRINT '            -  column:'
	PRINT '                 header: ' + @COLUMN_NAME 
	PRINT '                 name: ' + @COLUMN_NAME
	PRINT '                 type: ' + @DATA_TYPE
	FETCH NEXT FROM col_cursor INTO @COLUMN_NAME, @ORDINAL_POSITION, @DATA_TYPE;
END
    Print '          commentLineStartsWith:   //'
	PRINT '          encoding:  UTF-8'
	PRINT '          file: '
	PRINT '          quotchar:  '''''
	PRINT '          relativeToChangelogFile:  false'
	PRINT '          schemaName:  dbo'
	PRINT '          separator:  '','''
	PRINT '          tableName:  ' + @TABLE_NAME 
	PRINT '          usePreparedStatements:  true'

CLOSE col_cursor;
DEALLOCATE col_cursor;
