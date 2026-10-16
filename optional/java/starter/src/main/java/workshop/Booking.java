package workshop;

import java.math.BigDecimal;
import java.math.RoundingMode;

public final class Booking {
    public static BigDecimal quote(int nights, int guests) {
        if (nights < 1 || nights > 30 || guests < 1 || guests > 6) {
            throw new IllegalArgumentException("Nights must be 1..30 and guests 1..6");
        }
        BigDecimal subtotal = BigDecimal.valueOf(nights)
                .multiply(BigDecimal.valueOf(100L + guests * 10L));
        return subtotal.multiply(nights >= 7 ? new BigDecimal("0.90") : BigDecimal.ONE)
                .setScale(2, RoundingMode.HALF_UP);
    }

    public static void main(String[] args) {
        System.out.println("7 nights, 2 guests: USD " + quote(7, 2));
    }
}
