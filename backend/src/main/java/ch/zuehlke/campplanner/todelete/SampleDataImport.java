package ch.zuehlke.campplanner.todelete;

import ch.zuehlke.campplanner.dao.CampRepository;
import ch.zuehlke.campplanner.dao.HotelRepository;
import ch.zuehlke.campplanner.dao.OfferRequestRepository;
import ch.zuehlke.campplanner.domain.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Date;

/**
 * Initial data which should be imported by an sql script later on.
 */
@Component
public class SampleDataImport implements ApplicationListener<ContextRefreshedEvent> {

    @Autowired
    private HotelRepository hotelRepository;
    @Autowired
    private OfferRequestRepository offerRequestRepository;
    @Autowired
    private CampRepository campRepository;

    /**
     * Source https://docs.google.com/spreadsheets/d/1OtLHjQg6SycAdK7YWI1GOUhmDIQsO-jOavjV6k704kM/edit#gid=0.
     */
    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        offerRequestRepository.deleteAll();
        hotelRepository.deleteAll();
        campRepository.deleteAll();

        hotelRepository.save(create("Schloss Münchenweiler", "Münchenweiler", "CH", "http://www.schloss-muenchenwiler.ch/home.html"));
        hotelRepository.save(create("Hotel Moosegg", "Moosegg", "CH", "http://www.moosegg.ch/v2/"));
        hotelRepository.save(create("Hotel Seeblick", "Emmetten", "CH", "http://www.seminarhotelseeblick.ch/de/"));
        hotelRepository.save(create("Hotel Rigi", "Weggis", "CH", "http://www.hotelrigi.ch/hotel.html"));
        hotelRepository.save(create("Hotel Stoos", "Stoos", "CH", "http://www.hotel-stoos.ch/"));
        hotelRepository.save(create("Parkhotel Adler", "Hinterzarten", "DE", "http://www.parkhoteladler.de/de/"));
        hotelRepository.save(create("Hotel Helvetia", "Lindau", "DE", "http://www.hotel-helvetia.com/"));
        hotelRepository.save(create("Steigenberger Inselhotel", "Konstanz", "DE", "http://de.steigenberger.com/Konstanz/Steigenberger-Inselhotel"));
        Hotel hotelWartegg = create("Schloss Wartegg", "Rohrschacherberg", "CH", "http://wartegg.ch/");
        Hotel hotelVierJahreszeiten = createCompleteHotel();
        Offer offerWartegg = createOffer();
        Offer offerVierJahreszeiten = createOffer();
        hotelWartegg.addOffer(offerWartegg);
        hotelVierJahreszeiten.addOffer(offerVierJahreszeiten);
        OfferRequest offerRequestWartegg = createOfferRequest(hotelWartegg, offerWartegg);
        OfferRequest offerRequestVierJahreszeiten = createOfferRequest(hotelVierJahreszeiten, offerVierJahreszeiten);
        Camp campVierJahreszeiten = createCamp(offerVierJahreszeiten);
        hotelRepository.save(hotelWartegg);
        hotelRepository.save(hotelVierJahreszeiten);
        offerRequestRepository.save(offerRequestWartegg);
        offerRequestRepository.save(offerRequestVierJahreszeiten);
        campRepository.save(campVierJahreszeiten);
    }

    private Camp createCamp(Offer offer) {
        Camp camp = new Camp();
        camp.setName("JSO / JES - Vier Jahreszeiten 2016");
        camp.setNumberOfPeople(offer.getNumberOfPeople());
        camp.setStatus("Planning");
        camp.setTeam("JSO & JES");
        camp.setOffers(Arrays.asList(offer));
        camp.setFromDate(new Date());
        camp.setToDate(new Date());
        return camp;
    }


    private Offer createOffer() {
        Offer offer = new Offer();
        offer.setFromDate(new Date());
        offer.setToDate(new Date());
        offer.setDoubleRooms(34);
        offer.setSingleRooms(10);
        offer.setTotalPrice(36000d);
        offer.setNumberOfPeople(30);
        return offer;
    }
    private OfferRequest createOfferRequest(Hotel hotel, Offer offer) {
        OfferRequest offerRequest = new OfferRequest();
        offerRequest.setComment("comment");
        offerRequest.setDate(new Date());
        offerRequest.setHotel(hotel);
        offerRequest.setLastStatusChange(new Date());
        offerRequest.setOffer(offer);
        offerRequest.setStatus(RequestStatus.OFFER_RECEIVED);
        return offerRequest;
    }

    private Hotel create(String name, String city, String country, String website) {
        Hotel hotel = new Hotel();
        hotel.setName(name);
        hotel.setCity(city);
        hotel.setCountryCode(country);
        hotel.setWebsite(website);
        hotel.setRooms(100);
        return hotel;
    }

    private Hotel createCompleteHotel() {
        Hotel hotel = new Hotel();
        hotel.setName("Vier Jahreszeiten am Schluchsee");
        hotel.setDescription("Das Vier Jahreszeiten am Schluchsee liegt im bezaubernden Kurort Schluchsee auf knapp 1.000 m Höhe, im Herzen des einzigartigen Naturparks Südschwarzwald...");
        hotel.setStreet("Am Riesenbühl");
        hotel.setZipCode("79859");
        hotel.setCity("Schluchsee");
        hotel.setCountryCode("DE");
        hotel.setWebsite("http://www.vjz.de/");
        hotel.setContactEmail("info@vjz.de");
        hotel.setTripAdvisorUrl("https://www.tripadvisor.de/Hotel_Review-g198500-d291940-Reviews-Vier_Jahreszeiten_am_Schluchsee-Schluchsee_Baden_Wurttemberg.html");
        hotel.setHolidayCheckUrl("https://www.holidaycheck.de/hi/hotel-vier-jahreszeiten-am-schluchsee/63a55868-abe6-343c-93c4-c177cbb01e94?q=Hotel+Vier+Jahreszeiten+am+Schluchsee+%2F+Schluchsee+%28Hotel%29");
        hotel.setRooms(111);
        hotel.setPictureUrl("http://vjz.werbstatt.info/uploads/pics/aussicht_wald_see.jpg");
        return hotel;
    }
}
