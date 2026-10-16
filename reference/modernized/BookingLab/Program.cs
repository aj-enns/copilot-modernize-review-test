using BookingLab;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<QuoteCalculator>();
var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();
app.MapGet("/health", () => Results.Ok(new { status = "healthy" }));
app.MapPost("/api/quote", (QuoteRequest request, QuoteCalculator calculator) =>
{
    try
    {
        return Results.Ok(new { total = calculator.Calculate(request.Nights, request.Guests) });
    }
    catch (ArgumentOutOfRangeException exception)
    {
        return Results.ValidationProblem(new Dictionary<string, string[]>
        {
            [exception.ParamName!] = [exception.Message]
        });
    }
});

app.Run();

public sealed record QuoteRequest(int Nights, int Guests);
