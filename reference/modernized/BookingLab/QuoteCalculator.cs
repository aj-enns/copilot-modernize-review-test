namespace BookingLab;

public sealed class QuoteCalculator
{
    public decimal Calculate(int nights, int guests)
    {
        if (nights is < 1 or > 30)
            throw new ArgumentOutOfRangeException(nameof(nights), "Nights must be between 1 and 30.");
        if (guests is < 1 or > 6)
            throw new ArgumentOutOfRangeException(nameof(guests), "Guests must be between 1 and 6.");

        decimal subtotal = nights * (100m + guests * 10m);
        decimal discount = nights >= 7 ? 0.10m : 0m;
        return decimal.Round(subtotal * (1m - discount), 2, MidpointRounding.AwayFromZero);
    }
}
