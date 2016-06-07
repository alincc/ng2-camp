package ch.zuehlke.campplanner.domain;

import javax.persistence.*;
import java.util.Date;

@Entity
public class OfferRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    enum RequestStatus {
        REQUEST_SENT,
        OFFER_RECEIVED,
        WAITING_FOR_CLARIFCATION,
        OFFER_CONFIRMED,
        OFFER_DECLINED,
    }

    private Date date;

    @ManyToOne
    private Hotel hotel;

    @Enumerated(EnumType.STRING)
    private RequestStatus status;


    @Temporal(TemporalType.DATE)

    private Date lastStatusChange;

    private String comment;

    @OneToOne
    private Offer offer;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Hotel getHotel() {
        return hotel;
    }

    public void setHotel(Hotel hotel) {
        this.hotel = hotel;
    }

    public RequestStatus getStatus() {
        return status;
    }

    public void setStatus(RequestStatus status) {
        this.status = status;
    }

    public Date getLastStatusChange() {
        return lastStatusChange;
    }

    public void setLastStatusChange(Date lastStatusChange) {
        this.lastStatusChange = lastStatusChange;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Offer getOffer() {
        return offer;
    }

    public void setOffer(Offer offer) {
        this.offer = offer;
    }
}
