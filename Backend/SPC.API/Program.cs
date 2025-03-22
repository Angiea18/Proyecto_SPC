using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using SPC.Data;
using SPC.Business.Interfaces;
using SPC.Business.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddScoped<IBookService, BookService>();



builder.Services.AddDbContext<NikolaContext>(
    opt => opt.UseNpgsql(builder.Configuration.GetConnectionString("NikolaDatabase"))
);

// Inyección de dependecias
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IAuthorService,AuthorService>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.MapControllers();
app.Run();


