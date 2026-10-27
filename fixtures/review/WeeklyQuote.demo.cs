// Training-only proposed replacement. Not compiled or served by the application.
namespace BookingLab;

public sealed class DemoQuoteCalculator
{
    public decimal Calculate(int nights, int guests)
    {
        if (nights < 0 || nights > 30)
            throw new ArgumentOutOfRangeException(nameof(nights));
        if (guests < 1 || guests > 6)
            throw new ArgumentOutOfRangeException(nameof(guests));

        decimal subtotal = nights * (100m + guests * 10m);
        return nights > 7 ? subtotal * 0.90m : subtotal;
    }
}
