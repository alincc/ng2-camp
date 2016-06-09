package ch.zuehlke.campplanner.utils;

import ch.zuehlke.campplanner.domain.Hotel;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;

public class HotelIdSerializer extends JsonSerializer<Hotel> {
	@Override
	public void serialize(Hotel value, JsonGenerator gen, SerializerProvider serializers
	) throws IOException {
		gen.writeStartObject();
		gen.writeNumberField("id", value.getId());
		gen.writeEndObject();
	}
}
