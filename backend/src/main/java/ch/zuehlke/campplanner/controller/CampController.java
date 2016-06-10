package ch.zuehlke.campplanner.controller;

import ch.zuehlke.campplanner.dao.CampRepository;
import ch.zuehlke.campplanner.dao.HotelRepository;
import ch.zuehlke.campplanner.dao.OfferRequestRepository;
import ch.zuehlke.campplanner.domain.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;
import java.util.List;

@RestController
@RequestMapping("/rest/camps")
public class CampController {

    @Autowired
    private CampRepository campRepository;

    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private OfferRequestRepository offerRequestRepository;

    @Transactional
    @RequestMapping
    public List<Camp> getAll() {
        List<Camp> camps = new LinkedList<>();
        campRepository.findAll().forEach(camps::add);
        return camps;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Camp get(@PathVariable("id") Long id) {
        return campRepository.findOne(id);
    }

    @Transactional
    @RequestMapping(method = RequestMethod.POST)
    public Camp addOrUpdate(@RequestBody Camp camp) {
        if(camp.getId() != null) {
            Camp oldCamp = campRepository.findOne(camp.getId());
            camp.setOfferRequests(oldCamp.getOfferRequests());
        }
        campRepository.save(camp);
        return camp;
    }

    @Transactional
    @RequestMapping(value = "/{id}/offerrequests",
            method = RequestMethod.POST)
    public OfferRequest addOfferRequest(@PathVariable("id") Long id, @RequestBody OfferRequestCreateDto offerRequestCreateDto) {
        Camp camp = campRepository.findOne(id);
        if (camp == null) {
            throw new IllegalArgumentException("Camp with the id " + id + " does not exist");
        }

        Long hotelId = offerRequestCreateDto.getHotelId();
        Hotel hotel = hotelRepository.findOne(hotelId);
        if (hotel == null) {
            throw new IllegalArgumentException("Hotel with the id " + hotelId + " does not exist");
        }

        Offer offer = new Offer();
        offer.setHotel(hotel);

        OfferRequest offerRequest = new OfferRequest();
        offerRequest.setDate(offerRequestCreateDto.getDate());
        offerRequest.setComment(offerRequestCreateDto.getComment());
        offerRequest.setStatus(offerRequestCreateDto.getStatus());
        offerRequest.setOffer(offer);
        offerRequestRepository.save(offerRequest);

        camp.getOfferRequests().add(offerRequest);
        campRepository.save(camp);

        return offerRequest;
    }
}
