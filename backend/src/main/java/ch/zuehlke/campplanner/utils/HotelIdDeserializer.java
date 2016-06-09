package ch.zuehlke.campplanner.utils;

import ch.zuehlke.campplanner.domain.Hotel;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;

import java.io.IOException;

public class HotelIdDeserializer extends JsonDeserializer<Hotel> {
	@Override
	public Hotel deserialize(JsonParser p, DeserializationContext ctxt
	) throws IOException {
		JsonNode node = p.readValueAsTree();
		Hotel hotel = new Hotel();
		hotel.setId(node.get("id").asLong());
		return hotel;
	}
}
