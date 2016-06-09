package ch.zuehlke.campplanner.controller;

import ch.zuehlke.campplanner.dao.RatingRepository;
import ch.zuehlke.campplanner.domain.Rating;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

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
}
