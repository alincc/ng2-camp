package ch.zuehlke.campplanner.dao;


import ch.zuehlke.campplanner.domain.Offer;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OfferRepository extends CrudRepository<Offer, Long> {
    List<Offer> findByHotelId(long hotelId);
}
