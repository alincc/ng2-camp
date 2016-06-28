export enum RequestStatusEnum {
  REQUEST_SENT = "REQUEST_SENT",
  OFFER_RECEIVED = "OFFER_RECEIVED",
  WAITING_FOR_CLARIFCATION = "WAITING_FOR_CLARIFCATION",
  OFFER_CONFIRMED = "OFFER_CONFIRMED",
  OFFER_DECLINED = "OFFER_DECLINED"
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
