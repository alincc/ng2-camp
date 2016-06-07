package ch.zuehlke.campplanner.dao;


import ch.zuehlke.campplanner.domain.OfferRequest;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OfferRequestRepository extends CrudRepository<OfferRequest, Long> {
}
