using SPC.Business.Dtos;
using SPC.Data.Models;

namespace SPC.Business.Interfaces;

public interface IBookService
{
    Task<IEnumerable<Book>> SearchBooksAsync (BookSearchDto searchDto);
    //para agregar mas metodos aqui
}