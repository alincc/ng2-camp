import {CrudService} from './crud.service';
import {HotelService} from './hotel.service';
import {CountryService} from './country.service';
import {CampService} from './camp.service';
import {AuthService} from './auth.service';
import {RatingService} from './rating.service';
import {OfferRequestService} from './offer-request.service';
import {MailTemplateService} from './mailtemplate.service';
import {CachedCrudService} from './cached-crud.service';
import {MapService} from './map.service';
import {OfferService} from './offer.service';

export default [
  CrudService,
  HotelService,
  CountryService,
  CampService,
  AuthService,
  RatingService,
  OfferRequestService,
  MapService,
  MailTemplateService,
  CachedCrudService,
  OfferService
];

