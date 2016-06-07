ALTER TABLE offer_request ADD COLUMN comment varchar(255);
ALTER TABLE offer_request ADD COLUMN offer_id int8;
alter table offer_request
  add constraint FK_5tdvpuno0gs8wmxp5m6alxy9j
foreign key (offer_id)
references offer;