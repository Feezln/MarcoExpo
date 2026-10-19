using TareasAPI.Endpoints;
using TareasAPI.Services;




var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddCors(options =>
{
    //En memoria
    options.AddPolicy("AllowAll", policy =>
    {
        policy
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

//Nuestros Servicios 

builder.Services.AddSingleton<ITareaService, TareaService>();
builder.Services.AddSingleton<ILicenciaService, LicenciaService>();


var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();

    app.UseSwagger();
    //Swagger se muestra directo en http://localhost:5156
    app.UseSwaggerUI(options => options.RoutePrefix = string.Empty);
}


app.UseCors("AllowAll");

//En desarrollo usamos solo http para que la app de Expo pueda conectarse
if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

//Endpoints
app.MapTareaEndpoints();
app.MapLicenciaEndpoints();


app.Run();