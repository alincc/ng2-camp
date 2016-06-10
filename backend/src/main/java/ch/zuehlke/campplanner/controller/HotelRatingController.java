package ch.zuehlke.campplanner.controller;

import ch.zuehlke.campplanner.dao.RatingRepository;
import ch.zuehlke.campplanner.domain.Hotel;
import ch.zuehlke.campplanner.domain.Rating;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
		Integer ratingFrom1To5 = rating.getRatingFrom1To5();
		if (ratingFrom1To5 == null || ratingFrom1To5 > 5 || ratingFrom1To5 < 1) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		Hotel hotel = new Hotel();
		hotel.setId(hotelId);
		rating.setDate(new Date());
		rating.setHotel(hotel);
		rating.setPerson(getUserName());
		ratingRepository.save(rating);
		return new ResponseEntity<>(rating, HttpStatus.OK);
	}

	private String getUserName() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if (auth == null) {
			// Should not happen, except in development, when user doesn't has to be authenticated
			return "unknown";
		}
		return auth.getName();
	}
}
