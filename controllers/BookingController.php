
<?php

class BookingController {
    private $booking;

    public function __construct(Booking $booking) {
        $this->booking = $booking;
    }

    public function index() {
        // if (!TokenMiddleware::checkToken()) return;
        $bookings = $this->booking->all();
        echo json_encode($bookings);
    }

    public function create() {
        $data = $_POST;
        echo json_encode($this->booking->create($data));
    }

    public function show($id) {
        $booking = $this->booking->show($id);
        echo json_encode($booking);
    }

    public function update($id) {
        $data = $_POST;
        $this->booking->update($id, $data);
    }

    public function destroy($id) {
        $this->booking->destroy($id);
    }
}
?>
