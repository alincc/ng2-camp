package ch.zuehlke.campplanner.controller;

import ch.zuehlke.campplanner.dao.RatingRepository;
import ch.zuehlke.campplanner.domain.Rating;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.LinkedList;
import java.util.List;

@RestController
@RequestMapping("/rest/ratings")
public class RatingController {
	@Autowired
	private RatingRepository ratingRepository;

	@Transactional
	@RequestMapping
	public List<Rating> getAll() {
		List<Rating> ratings = new LinkedList<>();
		ratingRepository.findAll().forEach(ratings::add);
		return ratings;
	}

	@Transactional
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public Rating get(@PathVariable("id") Long id) {
		return ratingRepository.findOne(id);
	}

	@Transactional
	@RequestMapping(value = "/byhotel/{hotelId}", method = RequestMethod.GET)
	public List<Rating> findByHotelId(@PathVariable("hotelId") Long hotelId) {
		return ratingRepository.findByHotelId(hotelId);
	}

	@Transactional
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<Rating> addOrUpdate(@RequestBody Rating rating) {
		if (rating.getRatingFrom1To5() == null || rating.getHotel() == null || rating.getHotel().getId() == null) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		rating.setDate(new Date());
		ratingRepository.save(rating);
		return new ResponseEntity<>(rating, HttpStatus.OK);
	}
}
