
export interface Camp {
    fromDate?: Date;
    id?: number;
    name?: string;
    notes?: string;
    numberOfPeople?: number;
    offerRequests?: OfferRequest[];
    organizer?: string;
    status?: CampStatus;
    team?: string;
    toDate?: Date;
}

export interface Currency {
}

export interface Hotel {
    city?: string;
    contactEmail?: string;
    countryCode?: string;
    description?: string;
    holidayCheckUrl?: string;
    id?: number;
    latitude?: number;
    longitude?: number;
    name?: string;
    pictureUrl?: string;
    rooms?: number;
    street?: string;
    streetNumber?: string;
    tripAdvisorUrl?: string;
    website?: string;
    zipCode?: string;
}

export interface MailTemplate {
    id?: number;
    language?: string;
    name?: string;
    text?: string;
}

export interface Offer {
    accepted?: boolean;
    currency?: Currency;
    description?: string;
    doubleRooms?: number;
    expirationDate?: Date;
    fromDate?: Date;
    hotel?: Hotel;
    id?: number;
    numberOfPeople?: number;
    offerDate?: Date;
    singleRooms?: number;
    toDate?: Date;
    totalPrice?: number;
    userId?: string;
}

export interface OfferRequest {
    comment?: string;
    date?: Date;
    hotel?: Hotel;
    id?: number;
    lastStatusChange?: Date;
    offer?: Offer;
    status?: RequestStatus;
}

export interface Rating {
    date?: Date;
    description?: string;
    hotel?: Hotel;
    id?: number;
    person?: string;
    ratingFrom1To5?: number;
}

export type CampStatus = "CREATED_CAMP" | "CREATED_DOODLE" | "FIXED_DATE" | "GETTING_HOTEL_OFFERS" | "ACCEPTED_HOTEL_OFFER" | "DECLINED_REMAINING_OFFERS" | "READY" | "OTHER" | "FURTHER_CLARIFICATION_NEEDED" | "CANCELLED";

export type RequestStatus = "REQUEST_SENT" | "OFFER_RECEIVED" | "WAITING_FOR_CLARIFCATION" | "OFFER_CONFIRMED" | "OFFER_DECLINED";
