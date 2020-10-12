comment out

```app.UseHttpsRedirection();```

from CACI.Web/Startup.cs

set

```sslPort 0```

and remove

```https://localhost:5001/```

from CACI.Web/Properties/launchSettings.json


to start the api, navigate to the root api folder in terminal and

```dotnet run --project CACI.Web```
