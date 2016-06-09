package ch.zuehlke.campplanner.domain;

import javax.persistence.*;
import java.util.Date;

public class OfferRequestCreateDto {

    private Date date;

    private RequestStatus status;

    private String comment;

    private long hotelId;

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public RequestStatus getStatus() {
        return status;
    }

    public void setStatus(RequestStatus status) {
        this.status = status;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public long getHotelId() {
        return hotelId;
    }

    public void setHotelId(long hotelId) {
        this.hotelId = hotelId;
    }
}
