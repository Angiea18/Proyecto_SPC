using System.IdentityModel.Tokens.Jwt;
using System.Runtime.CompilerServices;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using SPC.Business.Interfaces;
using SPC.Data.Models;
using System.Net;
using SPC.Business.Dtos;


public class UserService : IUserService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private IConfiguration _configuration;
    public UserService(
        UserManager<ApplicationUser> userManager,
        RoleManager<IdentityRole> roleManager,
        IConfiguration configuration
    )
    {
        _userManager = userManager;
        _roleManager = roleManager;
        _configuration = configuration;
    }

    public async Task<TokenResponse> Login(LoginModel loginModel)
    {
        var user = await _userManager.FindByEmailAsync(loginModel.Email);
        if (user != null && await _userManager.CheckPasswordAsync(user, loginModel.Password))
        {
            var userRoles = await _userManager.GetRolesAsync(user);
            var authClaims = new List<Claim>
          {
              new Claim(ClaimTypes.Email, user.Email),
              new Claim(ClaimTypes.Name,user.Name),
              new Claim(ClaimTypes.Surname, user.Surname),
              new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
          };

            foreach (var userRole in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, userRole));
            }

            var authSignkey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:SecretKey"]));
            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.UtcNow.AddDays(7),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSignkey, SecurityAlgorithms.HmacSha256)
            );
            return new TokenResponse()
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Expiration = token.ValidTo,
                Email = user.Email
            };
        }
        return new TokenResponse();
    }

    public async Task<BaseMessage<UserDetail>> GetList()
    {
        var users = await _userManager.Users.ToListAsync();

        List<UserDetail> userResponse = users.Select(user => new UserDetail
        {
            Name = user.Name,
            Surname = user.Surname,
            Email = user.Email,
            DocumentType = user.DocumentType,
            DocumentNumber = user.DocumentNumber,
            TermsAceptance = user.TermsAceptance,
            UserType = user.UserType,
            Id = user.Id,

        }).ToList();
        //var list = await _unitOfWork.UserRepository.GetAllAsync();
        return userResponse.Any() ? BuildResponse(userResponse, "", HttpStatusCode.OK, users.Count) : BuildResponse(userResponse, "", HttpStatusCode.NotFound, 0);
    }

    public async Task<BaseMessage<UserDetail>> FindById(string id)
    {
        ApplicationUser? user = new();
        //user = await _unitOfWork.UserRepository.FindAsync(id);
        user = await _userManager.FindByIdAsync(id);

        UserDetail userDetail = new UserDetail
        {
            Name = user.Name,
            Surname = user.Surname,
            Email = user.Email,
            DocumentType = user.DocumentType,
            DocumentNumber = user.DocumentNumber,
            TermsAceptance = user.TermsAceptance,
            UserType = user.UserType,
            Id = user.Id,
        };

        return user != null ?
            BuildResponse(new List<UserDetail>() { userDetail }, "", HttpStatusCode.OK, 1) :
            BuildResponse(new List<UserDetail>(), "", HttpStatusCode.NotFound, 0);
    }

    public async Task<BaseMessage<ApplicationUser>> UpdateUser(ApplicationUser user)
    {
        var userExist = await _userManager.FindByEmailAsync(user.Email);
        if (userExist == null)
        {
            return new BaseMessage<ApplicationUser>()
            {
                Message = "Usuario no encontrado.",
                StatusCode = HttpStatusCode.NotFound,
                TotalElements = 0,
                ResponseElements = new()
            };
        }
        try
        {
            userExist.Name = user.Name;
            userExist.Surname = user.Surname;
            userExist.Email = user.Email;
            userExist.DocumentType = user.DocumentType;
            userExist.DocumentNumber = user.DocumentNumber;
            userExist.UserType = user.UserType;

            var result = await _userManager.UpdateAsync(userExist);
            if (!result.Succeeded)
            {
                return new BaseMessage<ApplicationUser>()
                {
                    Message = $"Error al actualizar usuario: {string.Join(", ", result.Errors.Select(e => e.Description))}",
                    StatusCode = HttpStatusCode.BadRequest,
                    TotalElements = 0,
                    ResponseElements = new()
                };
            }
        }
        catch (Exception ex)
        {
            return new BaseMessage<ApplicationUser>()
            {
                Message = $"[Exception]: {ex.Message}",
                StatusCode = HttpStatusCode.InternalServerError,
                TotalElements = 0,
                ResponseElements = new()
            };
        }

        return new BaseMessage<ApplicationUser>()
        {
            Message = "",
            StatusCode = HttpStatusCode.OK,
            TotalElements = 1,
            ResponseElements = new List<ApplicationUser> { userExist }
        };
    }

    public async Task<BaseMessage<ApplicationUser>> DeleteUser(ApplicationUser user)
    {
        var userExist = await _userManager.FindByEmailAsync(user.Email);
        if (userExist == null)
        {
            return new BaseMessage<ApplicationUser>()
            {
                Message = "Usuario no encontrado.",
                StatusCode = HttpStatusCode.NotFound,
                TotalElements = 0,
                ResponseElements = new()
            };
        }
        try
        {
            await _userManager.DeleteAsync(userExist);
        }
        catch (Exception ex)
        {
            return new BaseMessage<ApplicationUser>()
            {
                Message = $"[Exception]: {ex.Message}",
                StatusCode = HttpStatusCode.InternalServerError,
                TotalElements = 0,
                ResponseElements = new()
            };
        }

        return new BaseMessage<ApplicationUser>()
        {
            Message = "",
            StatusCode = HttpStatusCode.OK,
            TotalElements = 1,
            ResponseElements = new List<ApplicationUser> { user }
        };
    }

    public async Task<BaseMessage<ApplicationUser>> DeleteUserId(string id)
    {
        ApplicationUser? user = new();
        try
        {
            user = await _userManager.FindByIdAsync(id);
            if(user == null){
                return new BaseMessage<ApplicationUser>()
                {
                    Message = "Usuario no encontrado.",
                    StatusCode = HttpStatusCode.NotFound,
                    TotalElements = 0,
                    ResponseElements = new()
                };
            }
            await _userManager.DeleteAsync(user);
        }
        catch (Exception ex)
        {
            return new BaseMessage<ApplicationUser>()
            {
                Message = $"[Exception]: {ex.Message}",
                StatusCode = HttpStatusCode.InternalServerError,
                TotalElements = 0,
                ResponseElements = new()
            };
        }

        return new BaseMessage<ApplicationUser>()
        {
            Message = "",
            StatusCode = HttpStatusCode.OK,
            TotalElements = 1,
            ResponseElements = new List<ApplicationUser> { user }
        };
    }

    private BaseMessage<T> BuildResponse<T>(List<T> lista, string message = "", HttpStatusCode status = HttpStatusCode.OK, int totalElements = 0)
    where T : class
    {
        return new BaseMessage<T>()
        {
            Message = message,
            StatusCode = status,
            TotalElements = totalElements,
            ResponseElements = lista
        };
    }

    public async Task<bool> RegisterAdmin(RegisterModel userModel)
    {
        var userExist = await _userManager.FindByEmailAsync(userModel.Email);
        if (userExist != null)
        {
            return false;
        }

        ApplicationUser user = new ApplicationUser()
        {
            Email = userModel.Email,
            SecurityStamp = Guid.NewGuid().ToString(),
            UserName = userModel.Email.Split('@')[0],
            Name = userModel.Name,
            Surname = userModel.Surname,
            DocumentType = userModel.DocumentType,
            DocumentNumber = userModel.DocumentNumber,
            UserType = userModel.UserType,
            TermsAceptance = userModel.TermsAceptance,
        };
        var result = await _userManager.CreateAsync(user, userModel.Password);
        if (!result.Succeeded)
        {
            return false;
        }
        if (!await _roleManager.RoleExistsAsync(UserRoles.Admin))
        {
            await _roleManager.CreateAsync(new IdentityRole(UserRoles.Admin));
        }
        if (!await _roleManager.RoleExistsAsync(UserRoles.Users))
        {
            await _roleManager.CreateAsync(new IdentityRole(UserRoles.Users));
        }
        if (await _roleManager.RoleExistsAsync(UserRoles.Admin))
        {
            await _userManager.AddToRoleAsync(user, UserRoles.Admin);
        }
        return true;
    }

    public async Task<bool> RegisterUser(RegisterModel userModel)
    {
        var userExist = await _userManager.FindByEmailAsync(userModel.Email);
        if (userExist != null)
        {
            return false;
        }

        ApplicationUser user = new ApplicationUser()
        {
            Email = userModel.Email,
            SecurityStamp = Guid.NewGuid().ToString(),
            UserName = userModel.Email.Split('@')[0],
            Name = userModel.Name,
            Surname = userModel.Surname,
            DocumentType = userModel.DocumentType,
            DocumentNumber = userModel.DocumentNumber,
            UserType = userModel.UserType,
            TermsAceptance = userModel.TermsAceptance,
        };
        var result = await _userManager.CreateAsync(user, userModel.Password);
        if (!result.Succeeded)
        {
        Console.WriteLine("Error al crear el usuario:");
        foreach (var error in result.Errors)
        {
            Console.WriteLine($"{error.Description}");
        }
        return false;
    }
        if (!await _roleManager.RoleExistsAsync(UserRoles.Admin))
        {
            await _roleManager.CreateAsync(new IdentityRole(UserRoles.Admin));
        }
        if (!await _roleManager.RoleExistsAsync(UserRoles.Users))
        {
            await _roleManager.CreateAsync(new IdentityRole(UserRoles.Users));
        }
        if (await _roleManager.RoleExistsAsync(UserRoles.Users))
        {
            await _userManager.AddToRoleAsync(user, UserRoles.Users);
        }
        return true;
    }

    public async Task<bool> UpdateUserRol(string userId, string roleName)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
        {
            return false;
        }

        var currentRoles = await _userManager.GetRolesAsync(user);
        if (currentRoles.Any())
        {
            await _userManager.RemoveFromRolesAsync(user, currentRoles);
        }

        if (!await _userManager.IsInRoleAsync(user, roleName))
        {
            if (!await _roleManager.RoleExistsAsync(roleName))
            {
                await _roleManager.CreateAsync(new IdentityRole(roleName));
            }

            var result = await _userManager.AddToRoleAsync(user, roleName);
            return result.Succeeded;
        }
        return true;
    }

    public async Task SeedAdmin()
    {
        await RegisterAdmin(new RegisterModel()
        {
            Email = "admin@eafit.edu.co",
            Password = "fdkreeArd24%",
            //UserName = "admin"
        });
    }
}