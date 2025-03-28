using Microsoft.AspNetCore.Mvc;
using SPC.Business.Interfaces;
using SPC.Data.Models;
namespace SPC.API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]

  public class UserController : ControllerBase
  {
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
      _userService = userService;
    }

    [HttpGet]
    [Route("GetAllUsers")]
    public async Task<IActionResult> GetAllUsers()
    {
      var users = await _userService.GetList();
      return Ok(users);
    }

    [HttpPost]
    [Route("AddUser")]
    public async Task<IActionResult> AddUser(RegisterModel user)
    {
      var result = await _userService.RegisterUser(user);
      return Ok(result);
    }

    [HttpGet]
    [Route("GetUserById/{id}")]
    public async Task<IActionResult> GetUserById(string id)
    {
      var result = await _userService.FindById(id);
      return Ok(result);
    }

    [HttpPut]
    [Route("UpdateUser")]
    public async Task<IActionResult> Update(ApplicationUser user)
    {
      var result = await _userService.UpdateUser(user);
      return Ok(result);
    }

    [HttpDelete]
    [Route("DeleteUser")]
    public async Task<IActionResult> DeleteUser(ApplicationUser user)
    {
      await _userService.DeleteUser(user);
      return Ok(user);
    }

    [HttpDelete]
    [Route("DeleteUserById/{id}")]
    public async Task<IActionResult> Delete(string id)
    {
      var result = await _userService.DeleteUserId(id);
      return Ok(result);
    }
    
  }
}