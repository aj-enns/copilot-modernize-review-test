using BookingLab;
using Xunit;

namespace BookingLab.Tests;

public sealed class QuoteCalculatorTests
{
    [Theory]
    [InlineData(1, 1, 110)]
    [InlineData(6, 2, 720)]
    [InlineData(7, 2, 756)]
    [InlineData(30, 6, 4320)]
    [InlineData(1, 6, 160)]
    public void Calculate_returns_expected_total(int nights, int guests, decimal expected)
    {
        Assert.Equal(expected, new QuoteCalculator().Calculate(nights, guests));
    }

    [Theory]
    [InlineData(0, 1, "nights")]
    [InlineData(-1, 1, "nights")]
    [InlineData(31, 1, "nights")]
    [InlineData(1, 0, "guests")]
    [InlineData(1, -1, "guests")]
    [InlineData(1, 7, "guests")]
    public void Calculate_rejects_invalid_inputs(int nights, int guests, string parameter)
    {
        var exception = Assert.Throws<ArgumentOutOfRangeException>(
            () => new QuoteCalculator().Calculate(nights, guests));
        Assert.Equal(parameter, exception.ParamName);
    }
}
