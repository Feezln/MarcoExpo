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
    app.UseSwaggerUI();

    //Al abrir http://localhost:5156 nos manda a Swagger
    app.MapGet("/", () => Results.Redirect("/swagger")).ExcludeFromDescription();
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