package ch.zuehlke.campplanner.controller;

import ch.zuehlke.campplanner.dao.MailTemplateRepository;
import ch.zuehlke.campplanner.domain.MailTemplate;
import org.pegdown.PegDownProcessor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;
import java.util.List;

@RestController
@RequestMapping("/rest/mailtemplates")
public class MailTemplateController {

    @Autowired
    private MailTemplateRepository mailTemplateRepository;

    @Transactional
    @RequestMapping
    public List<MailTemplate> getAll() {
        List<MailTemplate> mailTemplates = new LinkedList<>();
        mailTemplateRepository.findAll().forEach(mailTemplates::add);
        return mailTemplates;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public MailTemplate get(@PathVariable("id") Long id) {
        return mailTemplateRepository.findOne(id);
    }

    @Transactional
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<MailTemplate> addOrUpdate(@RequestBody MailTemplate mailTemplate) {
        mailTemplateRepository.save(mailTemplate);
        return new ResponseEntity<>(mailTemplate, HttpStatus.OK);
    }


    @Transactional
    @RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Long id) {
        mailTemplateRepository.delete(id);
    }

    @RequestMapping(path = "/markdown", method = RequestMethod.POST)
    public String generateHtml(@RequestBody MarkdownDto markdownDto) {
        PegDownProcessor pegDownProcessor = new PegDownProcessor();
        return pegDownProcessor.markdownToHtml(markdownDto.getTemplateText());
    }
}
