package ch.zuehlke.campplanner.domain;

import ch.zuehlke.campplanner.utils.HotelIdDeserializer;
import ch.zuehlke.campplanner.utils.HotelIdSerializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
public class Rating {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@NotNull
	private Integer ratingFrom1To5;
	private String description;
	@Temporal(TemporalType.TIMESTAMP)
	private Date date;
	private String person;

	@ManyToOne(optional = false)
	@JsonSerialize(using = HotelIdSerializer.class)
	@JsonDeserialize(using = HotelIdDeserializer.class)
	private Hotel hotel;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Integer getRatingFrom1To5() {
		return ratingFrom1To5;
	}

	public void setRatingFrom1To5(Integer ratingFrom1To5) {
		this.ratingFrom1To5 = ratingFrom1To5;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getPerson() {
		return person;
	}

	public void setPerson(String person) {
		this.person = person;
	}

	public Hotel getHotel() {
		return hotel;
	}

	public void setHotel(Hotel hotel) {
		this.hotel = hotel;
	}
}
