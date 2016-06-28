export enum RequestStatusEnum {
  REQUEST_SENT = <any>"REQUEST_SENT",
  OFFER_RECEIVED = <any>"OFFER_RECEIVED",
  WAITING_FOR_CLARIFCATION = <any>"WAITING_FOR_CLARIFCATION",
  OFFER_CONFIRMED = <any>"OFFER_CONFIRMED",
  OFFER_DECLINED = <any>"OFFER_DECLINED"
}
export function getRequestStatusValues() {
  return [
    RequestStatusEnum.OFFER_CONFIRMED,
    RequestStatusEnum.OFFER_DECLINED,
    RequestStatusEnum.OFFER_RECEIVED,
    RequestStatusEnum.REQUEST_SENT,
    RequestStatusEnum.WAITING_FOR_CLARIFCATION
  ];
}
