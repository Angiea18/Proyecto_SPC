using SPC.Business.Dtos;
using SPC.Business.Interfaces;
using SPC.Data;
using SPC.Data.Models;

namespace SPC.Business.Services;

public class BookService: IBookService
{
    private readonly IUnitOfWork _unitOfWork;
    public BookService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<IEnumerable<Book>> SearchBooksAsync(BookSearchDto searchDto)
    {
        return await _unitOfWork.BookRepository.GetAllAsync(
            filter: book => 
                (!searchDto.AuthorId.HasValue || book.AuthorId == searchDto.AuthorId) &&
                (string.IsNullOrEmpty(searchDto.AuthorName) || 
                    (book.Author.Name + " " + book.Author.Surname).Contains(searchDto.AuthorName)) &&
                (!searchDto.Genrre.HasValue || book.Genrre == searchDto.Genrre) &&
                (string.IsNullOrEmpty(searchDto.Language) || book.Language.Contains(searchDto.Language)) &&
                (!searchDto.Format.HasValue || book.Format == searchDto.Format) &&
                (!searchDto.YearOfPublication.HasValue || book.YearOfPubliction == searchDto.YearOfPublication) &&
                (string.IsNullOrEmpty(searchDto.Editorial) || book.Editorial.Contains(searchDto.Editorial)) &&
                (string.IsNullOrEmpty(searchDto.ISBN13) || book.ISBN13.Contains(searchDto.ISBN13)) &&
                (string.IsNullOrEmpty(searchDto.Name) || book.Name.Contains(searchDto.Name)) &&
                (!searchDto.IsAuthorAlive.HasValue || book.Author.IsAlive == searchDto.IsAuthorAlive) &&
                !book.Deleted,
            includeProperties: "Author"
        );
    }
}