using TareasAPI.Services;

namespace TareasAPI.Endpoints;

public static class LicenciaEndpoints{
    public static void MapLicenciaEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/licencia").WithTags("Licencia");

        //Get /licencia
        group.MapGet("/", (ILicenciaService service) => Results.Ok(service.Obtener()));
    }
}
