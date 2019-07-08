1. Download and Install Northwind Sample Database
---------------------------------------------------
Northwind.bak



2. Create and Configure a new ASP.NET Web API Application
---------------------------------------------------------


Create a new WebApi
====================
dotnet new WebApi -o NorthWind.API -n NorthWind.API


Run the necesary Packages (taking the latest packages)
========================================================
dotnet add package Microsoft.EntityFrameworkCore.Tools
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.SqlServer.Design
dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design
dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Tools
dotnet add package AutoMapper.Extensions.Microsoft.DependencyInjection

Build Application
=================
dotnet build

configure connections to Microsoft SQL Database
===============================================
"ConnectionStrings": {
  "SqlConnection": "Server=BREFTLPT008\\SQLEXPRESS; Database=NORTHWND;Trusted_Connection=True;User Id=realm;Password=friend;Integrated Security=false;MultipleActiveResultSets=true"
}

ConfigureServices in Startup.cs
===============================
services.AddDbContext<NORTHWNDContext>(options => options.UseSqlServer(Configuration.GetConnectionString("SqlConnection")));

Enable CORS (after above line)
=============================
services.AddCors();

Add below line of code under Configure method
=============================================
app.UseCors(x => x.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());



3. Generate Models from Microsoft SQL Server Database
-----------------------------------------------------

Use the Code Generation Tools package to generate all models that represent all tables in the Northwind Database
=================================================================================================================
dotnet ef dbcontext scaffold "Server=.\SQLEXPRESS;Database=NORTHWND;Trusted_Connection=True;User Id=xxxx;Password=xxxx;Integrated Security=false;" Microsoft.EntityFrameworkCore.SqlServer -o Models

Specific Tables
Scaffold-DbContext 'Server=.\SQLEXPRESS;Database=AuditDB;Trusted_Connection=True;User Id=xxxx;Password=xxxx;Integrated Security=false;' Microsoft.EntityFrameworkCore.SqlServer -o Models -Tables Audits, Books, Users

Specific Tables and Specific DbContext Folder
Scaffold-DbContext 'Server=.\SQLEXPRESS;Database=AuditDB;Trusted_Connection=True;User Id=xxxx;Password=xxxx;Integrated Security=false;' Microsoft.EntityFrameworkCore.SqlServer -ContextDir DataContext -OutputDir Models -Tables Audits, Books, Users

4. Create DTO (Data Transfer Object) for Request Body and Response
------------------------------------------------------------------
Create a DTOs folder and add the following classes
AddSupplierDTO
EditSupplierDTO
SupplierResponseDTO

5. Create Helpers Class for Mapping DTO with Model Classes
---------------------------------------------------------
create the folder `Helpers` in the root of the project folder then create the below file 
========================================================================================
AutoMapperProfile.cs

Add the below to Startup.cs under ConfigureServices
===================================================
services.AddAutoMapper();


6. Create Repositories for CRUD (Create, Read, Update Delete) Operations
------------------------------------------------------------------------

Create Repository folder then add interface and Implementation below
===================================================================
IDataRepository
DataRepository 

add below in the Startup.cs
==============================
services.AddScoped(typeof(IDataRepository <> ), typeof(DataRepository <> ));


7. Create Controller for CRUD Operations
----------------------------------------


Create Supplier API Controller before that install the below command
====================================================================
dotnet tool install --global dotnet-aspnet-codegenerator --version 2.2.1

Just run this command to generate it
====================================
dotnet aspnet-codegenerator controller -name SupplierController -api -async -m NorthWind.API.Models.Suppliers -dc NORTHWNDContext -namespace NorthWind.API.Controllers -outDir Controllers

we will use our previous created DTO for custom Object save, edit and their response
====================================================================================


