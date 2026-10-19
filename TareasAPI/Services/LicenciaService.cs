using TareasAPI.Models;

namespace TareasAPI.Services;

public class LicenciaService : ILicenciaService
{
    private readonly Licencia _licencia = new Licencia
    {
        Nombre = "Juan Pérez López",
        NumeroLicencia = "AGS-2026-001234",
        FechaNacimiento = "15/03/2000",
        FechaVencimiento = "15/03/2029",
        TipoLicencia = "Automovilista",
        Direccion = "Av. Universidad 940, Aguascalientes",
        Estado = "Vigente",
        Foto = "https://i.pravatar.cc/300?img=12"
    };

    public Licencia Obtener() => _licencia;
}
