using Xunit;

namespace BookingLab.Tests;

public sealed class QuoteCalculatorTests
{
    public static TheoryData<int, int, decimal> ValidQuotes => new()
    {
        { 1, 1, 110.00m },
        { 1, 6, 160.00m },
        { 30, 1, 2970.00m },
        { 30, 6, 4320.00m },
        { 6, 1, 660.00m },
        { 7, 1, 693.00m },
        { 6, 2, 720.00m },
        { 7, 2, 756.00m },
        { 6, 6, 960.00m },
        { 7, 6, 1008.00m }
    };

    [Theory]
    [MemberData(nameof(ValidQuotes))]
    public void Calculate_ValidInputs_ReturnsExactTotal(int nights, int guests, decimal expected)
    {
        var calculator = new QuoteCalculator();

        decimal actual = calculator.Calculate(nights, guests);

        Assert.Equal(expected, actual);
    }

    [Theory]
    [InlineData(int.MinValue)]
    [InlineData(0)]
    [InlineData(31)]
    [InlineData(int.MaxValue)]
    public void Calculate_InvalidNights_ThrowsWithNightsParameter(int nights)
    {
        var calculator = new QuoteCalculator();

        var exception = Assert.Throws<ArgumentOutOfRangeException>(() => calculator.Calculate(nights, 2));

        Assert.Equal("nights", exception.ParamName);
    }

    [Theory]
    [InlineData(int.MinValue)]
    [InlineData(0)]
    [InlineData(7)]
    [InlineData(int.MaxValue)]
    public void Calculate_InvalidGuests_ThrowsWithGuestsParameter(int guests)
    {
        var calculator = new QuoteCalculator();

        var exception = Assert.Throws<ArgumentOutOfRangeException>(() => calculator.Calculate(7, guests));

        Assert.Equal("guests", exception.ParamName);
    }
}
