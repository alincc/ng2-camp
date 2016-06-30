package ch.zuehlke.campplanner.domain;

import com.fasterxml.jackson.annotation.JsonProperty;

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

    private String organizer;

    @Column(columnDefinition = "text")
    private String notes;

    @Temporal(TemporalType.TIMESTAMP)
    private Date fromDate;

	@Temporal(TemporalType.TIMESTAMP)
    private Date toDate;
    private Integer numberOfPeople;

    @OneToMany
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private List<OfferRequest> offerRequests;

    @Enumerated(EnumType.STRING)
    private CampStatus status;

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

    public String getOrganizer() {
        return organizer;
    }

    public void setOrganizer(String organizer) {
        this.organizer = organizer;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Integer getNumberOfPeople() {
        return numberOfPeople;
    }

    public void setNumberOfPeople(Integer numberOfPeople) {
        this.numberOfPeople = numberOfPeople;
    }

    public CampStatus getStatus() {
        return status;
    }

    public void setStatus(CampStatus status) {
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
