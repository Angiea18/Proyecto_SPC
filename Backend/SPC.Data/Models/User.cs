using SPC.Data.Models;

namespace SPC.Data.Models;

public class User : BaseEntity<int>
{
    public required string Name { get; set; }   
    public required string Surname { get; set; }  
    public required string Email { get; set; } 
    public Role Role { get; set; }  // Tipo de usuario (Estudiante, Docente, etc.)  
    public required string DocumentType { get; set; }  // CC, TI, CE, NIT, etc.  
    public required string DocumentNumber { get; set; }    
    public required string PasswordHash { get; set; }  // Contraseña (encriptada)  
    public bool AceptoTerminos { get; set; }  // Checkbox de términos y condiciones  
    public required string UserType { get; set; }

}

public enum Role
{
    Estudiante,
    Docente,
    Fundacion_Administracion, 
    Otro_Externo
}
