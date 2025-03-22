using Microsoft.AspNetCore.Mvc;
using SPC.Business.Dtos;
using SPC.Business.Interfaces;
using SPC.Data.Models;

namespace SCP.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BookController : ControllerBase
{
    private readonly IBookService _bookService;

    public BookController(IBookService bookService) 
    {
        _bookService = bookService;
    }

    [HttpGet("search")]
    public async Task<ActionResult<IEnumerable<Book>>> SearchBooks([FromQuery] BookSearchDto searchDto)
    {
        try
        {
            var books = await _bookService.SearchBooksAsync(searchDto);
            return Ok(books);
        }
        catch (Exception exception)
        {
            return StatusCode(500, $"Internal server error: {exception.Message}");
        }
    }
}


