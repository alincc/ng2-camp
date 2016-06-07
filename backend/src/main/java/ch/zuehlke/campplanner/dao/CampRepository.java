package ch.zuehlke.campplanner.dao;


import ch.zuehlke.campplanner.domain.Camp;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CampRepository extends CrudRepository<Camp, Long> {
}
