package ch.zuehlke.campplanner.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.LinkedList;
import java.util.List;

@Entity
public class Hotel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    private String name;

    @Column(columnDefinition = "text")
    private String description;
    private String zipCode;
    private String street;
    private String streetNumber;
    @NotNull
    private String city;
    @NotNull
    private String countryCode;
    private String website;
    private String contactEmail;

    private String pictureUrl;

    private String tripAdvisorUrl;
    private String holidayCheckUrl;
    private Integer rooms;

    @OneToMany(cascade = CascadeType.ALL)
    @JsonBackReference
    private List<Offer> offers;

    public List<Offer> getOffers() {
        if (offers == null) {
            offers = new LinkedList<>();
        }
        return offers;
    }

    public String getPictureUrl() {
        return pictureUrl;
    }

    public void setPictureUrl(String pictureUrl) {
        this.pictureUrl = pictureUrl;
    }

    public void setOffers(List<Offer> offers) {
        this.offers = offers;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getStreetNumber() {
        return streetNumber;
    }

    public void setStreetNumber(String streetNumber) {
        this.streetNumber = streetNumber;
    }

    public String getContactEmail() {
        return contactEmail;
    }

    public void setContactEmail(String contactEmail) {
        this.contactEmail = contactEmail;
    }

    public void setRooms(Integer rooms) {
        this.rooms = rooms;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountryCode() {
        return countryCode;
    }

    public void setCountryCode(String countryCode) {
        this.countryCode = countryCode;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public Integer getRooms() {
        return rooms;
    }

    public String getTripAdvisorUrl() {
        return tripAdvisorUrl;
    }

    public void setTripAdvisorUrl(String tripAdvisorUrl) {
        this.tripAdvisorUrl = tripAdvisorUrl;
    }

    public String getHolidayCheckUrl() {
        return holidayCheckUrl;
    }

    public void setHolidayCheckUrl(String holidayCheckUrl) {
        this.holidayCheckUrl = holidayCheckUrl;
    }

    public void addOffer(Offer offer) {
        getOffers().add(offer);
        offer.setHotel(this);
    }
}
