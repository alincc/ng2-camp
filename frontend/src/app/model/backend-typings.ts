
export interface Camp {
    fromDate?: Date;
    id?: number;
    name?: string;
    numberOfPeople?: number;
    offerRequests?: OfferRequest[];
    status?: string;
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
    name?: string;
    offers?: Offer[];
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

export type RequestStatus = "REQUEST_SENT" | "OFFER_RECEIVED" | "WAITING_FOR_CLARIFCATION" | "OFFER_CONFIRMED" | "OFFER_DECLINED";
