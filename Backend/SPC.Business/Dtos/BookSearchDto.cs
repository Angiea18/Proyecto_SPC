using SPC.Data.Models;

namespace SPC.Business.Dtos;

public class BookSearchDto
{
    public int? AuthorId { get; set; }
    public string? AuthorName { get; set; }
    public Genrre? Genrre { get; set; }
    public string? Name { get; set; }
    public string? Language { get; set; }
    public Format? Format { get; set; }
    public int? YearOfPublication { get; set; }
    public string? Editorial { get; set; }
    public string? ISBN13 { get; set; }
    public bool? IsAuthorAlive { get; set; }
}