package workshop;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import java.math.BigDecimal;
import org.junit.jupiter.api.Test;

class BookingTest {
    @Test void weeklyBoundary() {
        assertEquals(new BigDecimal("720.00"), Booking.quote(6, 2));
        assertEquals(new BigDecimal("756.00"), Booking.quote(7, 2));
    }

    @Test void limits() {
        assertEquals(new BigDecimal("110.00"), Booking.quote(1, 1));
        assertEquals(new BigDecimal("4320.00"), Booking.quote(30, 6));
        assertThrows(IllegalArgumentException.class, () -> Booking.quote(0, 1));
        assertThrows(IllegalArgumentException.class, () -> Booking.quote(31, 1));
        assertThrows(IllegalArgumentException.class, () -> Booking.quote(1, 0));
        assertThrows(IllegalArgumentException.class, () -> Booking.quote(1, 7));
    }
}
