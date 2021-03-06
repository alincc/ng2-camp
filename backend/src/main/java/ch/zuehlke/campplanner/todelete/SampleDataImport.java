package ch.zuehlke.campplanner.todelete;

import ch.zuehlke.campplanner.dao.*;
import ch.zuehlke.campplanner.domain.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Currency;
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

    @Autowired
    private RatingRepository ratingRepository;

    @Autowired
    private MailTemplateRepository mailTemplateRepository;


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
        Offer offerWartegg1 = createOffer1();
        Offer offerWartegg2 = createOffer2();
        Offer offerVierJahreszeiten = createOffer2();
        hotelWartegg.addOffer(offerWartegg1);
        hotelWartegg.addOffer(offerWartegg2);
        hotelVierJahreszeiten.addOffer(offerVierJahreszeiten);
        OfferRequest offerRequestWartegg1 = createOfferRequest(offerWartegg1);
        OfferRequest offerRequestWartegg2 = createOfferRequest(offerWartegg2);
        OfferRequest offerRequestVierJahreszeiten = createOfferRequest(offerVierJahreszeiten);
        Camp campVierJahreszeiten = createCamp(offerRequestVierJahreszeiten);
        hotelRepository.save(hotelWartegg);
        hotelRepository.save(hotelVierJahreszeiten);
        offerRequestRepository.save(offerRequestWartegg1);
        offerRequestRepository.save(offerRequestWartegg2);
        offerRequestRepository.save(offerRequestVierJahreszeiten);
        campRepository.save(campVierJahreszeiten);
        ratingRepository.save(createRating(3, "Internet didn't work", "saka", hotelVierJahreszeiten));
        ratingRepository.save(createRating(5, null, null, hotelVierJahreszeiten));

        mailTemplateRepository.save(createMailTemplate());


    }

    private MailTemplate createMailTemplate() {
        MailTemplate mailTemplate = new MailTemplate();
        mailTemplate.setLanguage("DE");
        mailTemplate.setName("JSO / JES 2016");
        mailTemplate.setText("### Subject\n" +
                "\n" +
                "Offerte für Seminarwoche, @CAMP_FROM@ - @CAMP_TO@\n" +
                "\n" +
                "### Text\n" +
                "\n" +
                "Sehr geehrte Damen und Herren\n" +
                " \n" +
                "Für eine Seminarwoche mit gesamthaft @NUMBER_OF_PEOPLE@ Teilnehmenden sind wir momentan auf der Suche nach einer geeigneten Unterkunft vom @CAMP_FROM@ bis zum @CAMP_TO@.  \n" +
                "Es würde mich sehr freuen, wenn Sie mir eine entsprechende Offerte zustellen würden.\n" +
                " \n" +
                "**Die Eckdaten:**   \n" +
                "Zeitraum: Sonntag, den @CAMP_FROM@ ca. 17:00 Uhr bis Freitag. den @CAMP_TO@ ca. 15:00 Uhr\n" +
                "Anzahl Teilnehmer: 10\n" +
                " \n" +
                "Folgende Kriterien sind uns wichtig:  \n" +
                "- Unterbringung in Einzel- oder Doppelzimmern (min. 2 Einzelzimmer)\n" +
                "- Ein oder mehrere Seminarräume\n" +
                "·         Schneller Internetzugang in den Seminarräumen\n" +
                " \n" +
                " \n" +
                "**Verpflegung:**\n" +
                "- Kaffeepausen morgens und nachmittags (Montag - Freitag)\n" +
                "- 5 Mal Frühstück (Montag - Freitag)\n" +
                "- 5 Mal Mittagessen (Montag - Freitag)\n" +
                "- 4 Mal Abendessen (Sonntag - Donnerstag, Mittwoch ohne Abendessen)\n" +
                " \n" +
                " \n" +
                "Sollten Sie weitere Fragen haben, zögern Sie bitte nicht mich zu kontaktieren.\n" +
                "\n" +
                "\n" +
                "Ich freue mich auf Ihre Offerte!\n" +
                " \n" +
                "Meine Kontaktdaten wie folgt:\n" +
                "\n" +
                "E-Mail: @CONTACT_EMAIL@  \n" +
                "Telefon: @CONTACT_PHONE@");
        return mailTemplate;
    }

    private Camp createCamp(OfferRequest offerRequest) {
        Camp camp = new Camp();
        camp.setName("JSO / JES - Vier Jahreszeiten 2016");
        camp.setNumberOfPeople(30);
        camp.setStatus(CampStatus.CREATED_CAMP);
        camp.setTeam("JSO & JES");
        camp.setOfferRequests(Arrays.asList(offerRequest));
        camp.setFromDate(new Date());
        camp.setToDate(new Date());
        camp.setOrganizer("Johny");
        return camp;
    }

    private Offer createOffer1() {
        Offer offer = new Offer();
        offer.setOfferDate(new Date(1451640442000L));
        offer.setFromDate(new Date(1454923642000L));
        offer.setToDate(new Date(1455355642000L));
        offer.setDoubleRooms(34);
        offer.setSingleRooms(10);
        offer.setTotalPrice(36000d);
        offer.setCurrency(Currency.getInstance("CHF"));
        offer.setNumberOfPeople(30);
        offer.setAccepted(true);
        return offer;
    }

    private Offer createOffer2() {
        Offer offer = new Offer();
        offer.setOfferDate(new Date());
        offer.setFromDate(new Date());
        offer.setToDate(new Date());
        offer.setDoubleRooms(5);
        offer.setSingleRooms(0);
        offer.setTotalPrice(15000d);
        offer.setCurrency(Currency.getInstance("CHF"));
        offer.setNumberOfPeople(5);
        offer.setAccepted(false);
        return offer;
    }

    private OfferRequest createOfferRequest(Offer offer) {
        OfferRequest offerRequest = new OfferRequest();
        offerRequest.setComment("comment");
        offerRequest.setDate(new Date());
        offerRequest.setLastStatusChange(new Date());
        offerRequest.setOffer(offer);
        offerRequest.setHotel(offer.getHotel());
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

    private Rating createRating(Integer ratingFrom1to5, String description, String person, Hotel hotel) {
        Rating rating = new Rating();
        rating.setRatingFrom1To5(ratingFrom1to5);
        rating.setDescription(description);
        rating.setPerson(person);
        rating.setHotel(hotel);
        rating.setDate(new Date());
        return rating;
    }
}
