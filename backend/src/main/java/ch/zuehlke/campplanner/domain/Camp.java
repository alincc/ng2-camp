package ch.zuehlke.campplanner.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

@Entity
public class Camp {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
    // TODO will probably be deleted
    private String team;

    @Temporal(TemporalType.DATE)
    private Date fromDate;

	@Temporal(TemporalType.DATE)
    private Date toDate;
    private Integer numberOfPeople;

    @OneToMany(cascade = CascadeType.MERGE)
    @JsonManagedReference("camp-offer-requests")
    private List<OfferRequest> offerRequests;

//	@OneToMany
//	private List<OfferRequest> offerRequests;

    // derzeitge stand (doodle erstellt, datum fixiert, offerte angenommen, hotels abgesagt, ...)
    private String status;

    public Date getToDate() {
        return toDate;
    }

    public void setToDate(Date toDate) {
        this.toDate = toDate;
    }

    public Date getFromDate() {
        return fromDate;
    }

    public void setFromDate(Date fromDate) {
        this.fromDate = fromDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTeam() {
        return team;
    }

    public void setTeam(String team) {
        this.team = team;
    }

    public Integer getNumberOfPeople() {
        return numberOfPeople;
    }

    public void setNumberOfPeople(Integer numberOfPeople) {
        this.numberOfPeople = numberOfPeople;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<OfferRequest> getOfferRequests() {
        if(offerRequests == null) {
            offerRequests = new LinkedList<>();
        }
        return offerRequests;
    }

    public void setOfferRequests(List<OfferRequest> offerRequests) {
        this.offerRequests = offerRequests;
    }
}
