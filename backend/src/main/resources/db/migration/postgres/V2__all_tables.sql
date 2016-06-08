
    create table camp (
        id int8 not null,
        from_date date,
        name varchar(255),
        number_of_people int4,
        status varchar(255),
        team varchar(255),
        to_date date,
        primary key (id)
    );

    create table camp_offer_requests (
        camp_id int8 not null,
        offer_requests_id int8 not null
    );

    create table hotel (
        id int8 not null,
        city varchar(255),
        contact_email varchar(255),
        country_code varchar(255),
        description text,
        holiday_check_url varchar(255),
        name varchar(255),
        picture_url varchar(255),
        rooms int4,
        street varchar(255),
        street_number varchar(255),
        trip_advisor_url varchar(255),
        website varchar(255),
        zip_code varchar(255),
        primary key (id)
    );

    create table hotel_offers (
        hotel_id int8 not null,
        offers_id int8 not null
    );

    create table mail_template (
        id int8 not null,
        language varchar(255),
        name varchar(255),
        text text,
        primary key (id)
    );

    create table offer (
        id int8 not null,
        accepted boolean not null,
        currency varchar(255),
        description text,
        double_rooms int4,
        expiration_date timestamp,
        from_date timestamp,
        number_of_people int4,
        offer_date timestamp,
        single_rooms int4,
        to_date timestamp,
        total_price float8,
        user_id varchar(255),
        hotel_id int8 not null,
        primary key (id)
    );

    create table offer_request (
        id int8 not null,
        comment text,
        date timestamp,
        last_status_change date,
        status varchar(255),
        offer_id int8,
        primary key (id)
    );

    create table rating (
        id int8 not null,
        date date,
        description varchar(255),
        person varchar(255),
        rating_from1to5 int4 not null,
        hotel_id int8 not null,
        primary key (id)
    );

    alter table camp_offer_requests 
        add constraint UK_2yn7b27it2b93w9y756y0g7y7 unique (offer_requests_id);

    alter table hotel_offers 
        add constraint UK_jq8c8kaurrm3g4fryiqpgpl0s unique (offers_id);

    alter table camp_offer_requests 
        add constraint FK_2yn7b27it2b93w9y756y0g7y7 
        foreign key (offer_requests_id) 
        references offer_request;

    alter table camp_offer_requests 
        add constraint FK_1jrfhen8y0oqmgspi5aotbfsb 
        foreign key (camp_id) 
        references camp;

    alter table hotel_offers 
        add constraint FK_jq8c8kaurrm3g4fryiqpgpl0s 
        foreign key (offers_id) 
        references offer;

    alter table hotel_offers 
        add constraint FK_qlnlnl66170wfie02qlbipi13 
        foreign key (hotel_id) 
        references hotel;

    alter table offer 
        add constraint FK_7w0lpk0dph8bfchqetb2x2qna 
        foreign key (hotel_id) 
        references hotel;

    alter table offer_request 
        add constraint FK_5tdvpuno0gs8wmxp5m6alxy9j 
        foreign key (offer_id) 
        references offer;

    alter table rating 
        add constraint FK_ns8b94vlj2d1ply4qa5dblcbm 
        foreign key (hotel_id) 
        references hotel;

    create sequence hibernate_sequence;