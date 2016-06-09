package ch.zuehlke.campplanner.controller;

import ch.zuehlke.campplanner.dao.HotelRepository;
import ch.zuehlke.campplanner.dao.OfferRepository;
import ch.zuehlke.campplanner.domain.Hotel;
import ch.zuehlke.campplanner.domain.Offer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;
import java.util.List;

@RestController
@RequestMapping("/rest/offers")
public class OfferController {

    @Autowired
    private OfferRepository offerRepository;

    @Autowired
    private HotelRepository hotelRepository;

    @Transactional
    @RequestMapping
    public List<Offer> getAll() {
        List<Offer> offers = new LinkedList<>();
        offerRepository.findAll().forEach(offers::add);
        return offers;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Offer get(@PathVariable("id") Long id) {
        return offerRepository.findOne(id);
    }

    @RequestMapping(value = "/byhotel/{hotelId}", method = RequestMethod.GET)
    public List<Offer> getByHotelId(@PathVariable("hotelId") long hotelId) {
        return offerRepository.findByHotelId(hotelId);
    }

    @Transactional
    @RequestMapping(value = "/byhotel/{hotelId}", method = RequestMethod.POST)
    public Offer addOrUpdate(@PathVariable("hotelId") long hotelId, @RequestBody Offer offer) {
        Hotel hotel = hotelRepository.findOne(hotelId);
        offer.setHotel(hotel);
        offerRepository.save(offer);
        return offer;
    }
}
