package ch.zuehlke.campplanner.dao;

import ch.zuehlke.campplanner.domain.Rating;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RatingRepository extends CrudRepository<Rating, Long> {
	List<Rating> findByHotelId(Long hotelId);
}
