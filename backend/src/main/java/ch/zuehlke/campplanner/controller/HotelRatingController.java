package ch.zuehlke.campplanner.controller;

import ch.zuehlke.campplanner.dao.RatingRepository;
import ch.zuehlke.campplanner.domain.Hotel;
import ch.zuehlke.campplanner.domain.Rating;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/rest/hotels/{hotelId}/ratings")
public class HotelRatingController {
	@Autowired
	private RatingRepository ratingRepository;

	@Transactional
	@RequestMapping(method = RequestMethod.GET)
	public List<Rating> getAll(@PathVariable("hotelId") long hotelId) {
		return ratingRepository.findByHotelId(hotelId);
	}

	@Transactional
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<Rating> addOrUpdate(@PathVariable("hotelId") long hotelId, @RequestBody Rating rating) {
		if (rating.getRatingFrom1To5() == null) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		Hotel hotel = new Hotel();
		hotel.setId(hotelId);
		rating.setDate(new Date());
		rating.setHotel(hotel);
		ratingRepository.save(rating);
		return new ResponseEntity<>(rating, HttpStatus.OK);
	}
}