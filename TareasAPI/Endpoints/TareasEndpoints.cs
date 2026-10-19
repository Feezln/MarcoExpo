using TareasAPI.Models;
using TareasAPI.Services;

namespace TareasAPI.Endpoints;

public static class TareasEndpoints{
    public static void MapTareaEndpoints(this WebApplication app)
    {
        //Get /api/tareas
        var group = app.MapGroup("/api/tareas").WithTags("Tareas");
        group.MapGet("/", (ITareaService service) => Results.Ok(service.ObtenerTodas()));

        //Get /tareas/{id}
        group.MapGet("/{id}", (ITareaService service, int id) =>
        {
            var tarea = service.ObtenerPorId(id);
            return tarea is null
                ? Results.NotFound(new {mensaje = "Tarea no encontrada"})
                : Results.Ok(tarea);
        });

        //Post /tareas
        group.MapPost("/", (ITareaService service, Tarea nuevaTarea) =>
        {
           var creada = service.Crear(nuevaTarea);
           return Results.Created($"/api/tareas/{creada.Id}", creada); //201
        });

        //Delete /tareas/{id}
        group.MapDelete("/{id}", (ITareaService service, int id) =>
        {
            return service.Eliminar(id)
                ? Results.NoContent()//204
                : Results.NotFound(new {mensaje = "Tarea no encontrada"}); //404
        });
    }
}
