package ch.zuehlke.campplanner.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Currency;
import java.util.Date;

/**
 * Grundsätzlich sind alle Felder optional.
 */
@Entity
public class Offer {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Temporal(TemporalType.DATE)
    private Date offerDate;

    @Temporal(TemporalType.DATE)
    private Date expirationDate;

    @Temporal(TemporalType.DATE)
    @NotNull
    private Date fromDate;

    @Temporal(TemporalType.DATE)
    @NotNull
    private Date toDate;

    @NotNull
    private Integer numberOfPeople;
    private Integer doubleRooms;
    private Integer singleRooms;
    private boolean accepted;

    private Double totalPrice;
    private Currency currency; // funktioniert das?

    private String description;

    // TODO wie werden user abgelegt und woher kommen sie?
    private String userId;

    @ManyToOne(optional = false)
    @JsonBackReference
    private Hotel hotel;

    @ManyToOne(optional = true)
    @JsonBackReference
    private Camp camp;

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Camp getCamp() {
        return camp;
    }

    public void setCamp(Camp camp) {
        this.camp = camp;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getOfferDate() {
        return offerDate;
    }

    public void setOfferDate(Date offerDate) {
        this.offerDate = offerDate;
    }

    public Date getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(Date expirationDate) {
        this.expirationDate = expirationDate;
    }

    public Date getFromDate() {
        return fromDate;
    }

    public void setFromDate(Date fromDate) {
        this.fromDate = fromDate;
    }

    public Date getToDate() {
        return toDate;
    }

    public void setToDate(Date toDate) {
        this.toDate = toDate;
    }

    public Integer getSingleRooms() {
        return singleRooms;
    }

    public void setSingleRooms(Integer singleRooms) {
        this.singleRooms = singleRooms;
    }

    public Integer getDoubleRooms() {
        return doubleRooms;
    }

    public void setDoubleRooms(Integer doubleRooms) {
        this.doubleRooms = doubleRooms;
    }

    public Currency getCurrency() {
        return currency;
    }

    public void setCurrency(Currency currency) {
        this.currency = currency;
    }

    public Integer getNumberOfPeople() {
        return numberOfPeople;
    }

    public void setNumberOfPeople(Integer numberOfPeople) {
        this.numberOfPeople = numberOfPeople;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Hotel getHotel() {
        return hotel;
    }

    public void setHotel(Hotel hotel) {
        this.hotel = hotel;
    }

    public boolean isAccepted() {
        return accepted;
    }

    public void setAccepted(boolean accepted) {
        this.accepted = accepted;
    }
}
