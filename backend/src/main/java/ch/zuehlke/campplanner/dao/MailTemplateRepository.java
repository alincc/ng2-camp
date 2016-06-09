package ch.zuehlke.campplanner.dao;

import ch.zuehlke.campplanner.domain.MailTemplate;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MailTemplateRepository extends CrudRepository<MailTemplate, Long> {
}
