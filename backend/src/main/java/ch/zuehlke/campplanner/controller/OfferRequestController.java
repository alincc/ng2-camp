package ch.zuehlke.campplanner.controller;

import ch.zuehlke.campplanner.dao.OfferRequestRepository;
import ch.zuehlke.campplanner.domain.OfferRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedList;
import java.util.List;

@RestController
@RequestMapping("/rest/offerrequests")
public class OfferRequestController {

    @Autowired
    private OfferRequestRepository offerRequestRepository;

    @Transactional
    @RequestMapping
    public List<OfferRequest> getAll() {
        List<OfferRequest> offerRequests = new LinkedList<>();
        offerRequestRepository.findAll().forEach(offerRequests::add);
        return offerRequests;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public OfferRequest get(@PathVariable("id") Long id) {
        return offerRequestRepository.findOne(id);
    }

}
