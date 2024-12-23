const random_EO_DATA = [
  {
    account_id: "a3b4c9e1-25b1-4f9b-9ef0-5b2347b1a527",
    account_name: "dummy 2",
    customer_code: "10002",
    status: "A",
    created_date: "2024-01-11T10:15:00.137000Z",
    modified_date: "2024-09-01T12:32:45.827000Z",
    vat_number: "DE234567891234",
    account_type: "B",
    start_date: "2023-03-18T00:00:00Z",
    address_line1: "Hauptstrasse 24",
    address_line2: null,
    city: "Berlin",
    country: "DE",
    email: "dummy2@example.com",
    phone_number: "+49 30 12345678",
    website: "http://dummy2.com",
    is_supplier: true,
    is_customer: false,
    payment_term: 5,
    latest_invoice_date: "2024-07-22T00:00:00Z",
    latest_due_date: "2024-08-22T00:00:00Z",
    latest_invoice_number: "23012345",
    total_outstanding: 8900.75,
    oldest_invoice_date: "2022-02-28T00:00:00Z",
    oldest_invoice_number: "202300123",
    total_nr_of_outstanding_invoices: 5,
    last_payment_date: "2024-08-30",
    blocked: false,
    credit_line_purchase: 5000,
    credit_line_sales: 10000,
    discount_purchase: 2,
    discount_sales: 3,
    customer_since: "2023-07-14T00:00:00Z",
  },
  {
    account_id: "f6d3e4a7-7861-4bfc-9fa1-cfbc1271e924",
    account_name: "dummy 3",
    customer_code: "10003",
    status: "B",
    created_date: "2023-08-23T08:45:22.137000Z",
    modified_date: "2024-07-15T14:27:59.827000Z",
    vat_number: "FR345678912345",
    account_type: "A",
    start_date: "2023-05-01T00:00:00Z",
    address_line1: "Rue de Rivoli 47",
    address_line2: "Apt 5",
    city: "Paris",
    country: "FR",
    email: "dummy3@example.com",
    phone_number: "+33 1 23456789",
    website: null,
    is_supplier: false,
    is_customer: true,
    payment_term: 7,
    latest_invoice_date: "2024-08-01T00:00:00Z",
    latest_due_date: "2024-08-15T00:00:00Z",
    latest_invoice_number: "23098765",
    total_outstanding: 6500.9,
    oldest_invoice_date: "2021-11-10T00:00:00Z",
    oldest_invoice_number: "202100789",
    total_nr_of_outstanding_invoices: 12,
    last_payment_date: "2024-08-20",
    blocked: false,
    credit_line_purchase: 7500,
    credit_line_sales: 8000,
    discount_purchase: 1,
    discount_sales: 2,
    customer_since: "2023-05-01T00:00:00Z",
  },
  {
    account_id: "c7e1f9b8-25b2-4d9f-b7b5-124e56a9c793",
    account_name: "dummy 4",
    customer_code: "10004",
    status: "C",
    created_date: "2023-12-15T16:45:30.137000Z",
    modified_date: "2024-05-25T10:20:59.827000Z",
    vat_number: "NL456789123456",
    account_type: "C",
    start_date: "2022-11-10T00:00:00Z",
    address_line1: "Damrak 35",
    address_line2: null,
    city: "Amsterdam",
    country: "NL",
    email: "dummy4@example.com",
    phone_number: "+31 20 12345678",
    website: "http://dummy4.nl",
    is_supplier: false,
    is_customer: true,
    payment_term: 10,
    latest_invoice_date: "2024-06-30T00:00:00Z",
    latest_due_date: "2024-07-30T00:00:00Z",
    latest_invoice_number: "23123456",
    total_outstanding: 15200.6,
    oldest_invoice_date: "2020-12-01T00:00:00Z",
    oldest_invoice_number: "202001234",
    total_nr_of_outstanding_invoices: 8,
    last_payment_date: "2024-07-01",
    blocked: true,
    credit_line_purchase: 0,
    credit_line_sales: 12000,
    discount_purchase: 0,
    discount_sales: 4,
    customer_since: "2022-11-10T00:00:00Z",
  },
  {
    account_id: "e2a7b813-144c-4237-8c9a-41c97473c784",
    account_name: "dummy 1",
    customer_code: "10001",
    status: "C",
    created_date: "2024-05-12T23:36:07.137000Z",
    modified_date: "2024-08-25T17:45:59.827000Z",
    vat_number: "BE123456789123",
    account_type: "A",
    start_date: "2023-07-14T00:00:00Z",
    address_line1: "somestraat 92",
    address_line2: null,
    city: "Bornem",
    country: "BE",
    email: "example@gmail.com",
    phone_number: "",
    website: null,
    is_supplier: false,
    is_customer: false,
    payment_term: 3,
    latest_invoice_date: "2024-07-31T00:00:00Z",
    latest_due_date: "2024-08-03T00:00:00Z",
    latest_invoice_number: "23008519",
    total_outstanding: 123456.15,
    oldest_invoice_date: "2022-03-31T00:00:00Z",
    oldest_invoice_number: "202400704",
    total_nr_of_outstanding_invoices: 27,
    last_payment_date: "2024-09-05",
    blocked: false,
    credit_line_purchase: 0,
    credit_line_sales: 0,
    discount_purchase: 0,
    discount_sales: 0,
    customer_since: "2024-05-12T00:00:00Z",
  },
  {
    account_id: "b6d2e3f7-1234-5678-9abc-dfe9abcd5678",
    account_name: "dummy 5",
    customer_code: "10005",
    status: "B",
    created_date: "2023-05-18T14:12:45.137000Z",
    modified_date: "2024-07-19T11:45:00.827000Z",
    vat_number: "ES987654321000",
    account_type: "B",
    start_date: "2022-09-07T00:00:00Z",
    address_line1: "Calle Mayor 10",
    address_line2: "Suite 2B",
    city: "Madrid",
    country: "ES",
    email: "dummy5@example.com",
    phone_number: "+34 91 2345678",
    website: "http://dummy5.es",
    is_supplier: true,
    is_customer: true,
    payment_term: 7,
    latest_invoice_date: "2024-07-01T00:00:00Z",
    latest_due_date: "2024-07-14T00:00:00Z",
    latest_invoice_number: "23045678",
    total_outstanding: 17500.3,
    oldest_invoice_date: "2021-05-12T00:00:00Z",
    oldest_invoice_number: "202101234",
    total_nr_of_outstanding_invoices: 10,
    last_payment_date: "2024-08-22",
    blocked: false,
    credit_line_purchase: 15000,
    credit_line_sales: 20000,
    discount_purchase: 5,
    discount_sales: 7,
    customer_since: "2022-09-07T00:00:00Z",
  },
  {
    account_id: "d7e4f6a8-6547-4329-8d1b-124f9cbd4567",
    account_name: "dummy 6",
    customer_code: "10006",
    status: "C",
    created_date: "2024-01-01T09:10:50.137000Z",
    modified_date: "2024-07-12T18:10:59.827000Z",
    vat_number: "PT098765432100",
    account_type: "A",
    start_date: "2023-11-20T00:00:00Z",
    address_line1: "Avenida da Liberdade 123",
    address_line2: "Floor 5",
    city: "Lisbon",
    country: "PT",
    email: "dummy6@example.com",
    phone_number: "+351 21 2345678",
    website: null,
    is_supplier: false,
    is_customer: true,
    payment_term: 10,
    latest_invoice_date: "2024-06-15T00:00:00Z",
    latest_due_date: "2024-06-30T00:00:00Z",
    latest_invoice_number: "23123457",
    total_outstanding: 11200.8,
    oldest_invoice_date: "2022-08-19T00:00:00Z",
    oldest_invoice_number: "202201234",
    total_nr_of_outstanding_invoices: 6,
    last_payment_date: "2024-07-01",
    blocked: true,
    credit_line_purchase: 0,
    credit_line_sales: 15000,
    discount_purchase: 2,
    discount_sales: 5,
    customer_since: "2023-11-20T00:00:00Z",
  },
  {
    account_id: "f7d3e6b9-4325-4f6d-8c9a-61f97478c794",
    account_name: "dummy 7",
    customer_code: "10007",
    status: "A",
    created_date: "2024-02-14T11:00:20.137000Z",
    modified_date: "2024-08-25T13:55:59.827000Z",
    vat_number: "IT876543210987",
    account_type: "C",
    start_date: "2023-09-15T00:00:00Z",
    address_line1: "Via Roma 22",
    address_line2: null,
    city: "Milan",
    country: "IT",
    email: "dummy7@example.com",
    phone_number: "+39 02 12345678",
    website: "http://dummy7.it",
    is_supplier: true,
    is_customer: true,
    payment_term: 14,
    latest_invoice_date: "2024-05-30T00:00:00Z",
    latest_due_date: "2024-06-30T00:00:00Z",
    latest_invoice_number: "23134567",
    total_outstanding: 9000.6,
    oldest_invoice_date: "2021-09-01T00:00:00Z",
    oldest_invoice_number: "202101345",
    total_nr_of_outstanding_invoices: 14,
    last_payment_date: "2024-06-01",
    blocked: false,
    credit_line_purchase: 5000,
    credit_line_sales: 8000,
    discount_purchase: 3,
    discount_sales: 6,
    customer_since: "2023-09-15T00:00:00Z",
  },
  {
    account_id: "g7f4e7c1-4327-4a6e-8d5b-21e97478e894",
    account_name: "dummy 8",
    customer_code: "10008",
    status: "B",
    created_date: "2023-11-12T15:10:45.137000Z",
    modified_date: "2024-08-20T11:25:59.827000Z",
    vat_number: "SE543210987654",
    account_type: "B",
    start_date: "2023-02-12T00:00:00Z",
    address_line1: "Drottninggatan 10",
    address_line2: "Box 123",
    city: "Stockholm",
    country: "SE",
    email: "dummy8@example.com",
    phone_number: "+46 8 12345678",
    website: null,
    is_supplier: true,
    is_customer: false,
    payment_term: 5,
    latest_invoice_date: "2024-04-10T00:00:00Z",
    latest_due_date: "2024-04-25T00:00:00Z",
    latest_invoice_number: "23198765",
    total_outstanding: 6000.45,
    oldest_invoice_date: "2021-08-22T00:00:00Z",
    oldest_invoice_number: "202100987",
    total_nr_of_outstanding_invoices: 7,
    last_payment_date: "2024-04-22",
    blocked: false,
    credit_line_purchase: 3000,
    credit_line_sales: 4000,
    discount_purchase: 2,
    discount_sales: 3,
    customer_since: "2023-02-12T00:00:00Z",
  },
  {
    account_id: "h7g5f8d2-5329-4f8f-9b1b-23f97478e495",
    account_name: "dummy 9",
    customer_code: "10009",
    status: "C",
    created_date: "2024-03-10T14:15:40.137000Z",
    modified_date: "2024-07-20T10:10:59.827000Z",
    vat_number: "NO321098765432",
    account_type: "A",
    start_date: "2022-06-30T00:00:00Z",
    address_line1: "Karl Johans gate 5",
    address_line2: null,
    city: "Oslo",
    country: "NO",
    email: "dummy9@example.com",
    phone_number: "+47 22 1234567",
    website: "http://dummy9.no",
    is_supplier: true,
    is_customer: true,
    payment_term: 8,
    latest_invoice_date: "2024-05-15T00:00:00Z",
    latest_due_date: "2024-06-15T00:00:00Z",
    latest_invoice_number: "23212345",
    total_outstanding: 14500.8,
    oldest_invoice_date: "2021-12-05T00:00:00Z",
    oldest_invoice_number: "202101456",
    total_nr_of_outstanding_invoices: 9,
    last_payment_date: "2024-06-12",
    blocked: false,
    credit_line_purchase: 2000,
    credit_line_sales: 5000,
    discount_purchase: 1,
    discount_sales: 4,
    customer_since: "2022-06-30T00:00:00Z",
  },
  {
    account_id: "i8h6g9e3-6328-4g9g-8e7b-33f97479e696",
    account_name: "dummy 10",
    customer_code: "10010",
    status: "B",
    created_date: "2024-02-25T12:22:55.137000Z",
    modified_date: "2024-08-05T09:50:59.827000Z",
    vat_number: "FI654321098765",
    account_type: "C",
    start_date: "2023-04-20T00:00:00Z",
    address_line1: "Esplanadi 15",
    address_line2: "Suite 200",
    city: "Helsinki",
    country: "FI",
    email: "dummy10@example.com",
    phone_number: "+358 9 12345678",
    website: null,
    is_supplier: true,
    is_customer: false,
    payment_term: 9,
    latest_invoice_date: "2024-07-05T00:00:00Z",
    latest_due_date: "2024-08-05T00:00:00Z",
    latest_invoice_number: "23312345",
    total_outstanding: 17500.55,
    oldest_invoice_date: "2020-05-15T00:00:00Z",
    oldest_invoice_number: "202000123",
    total_nr_of_outstanding_invoices: 11,
    last_payment_date: "2024-08-02",
    blocked: false,
    credit_line_purchase: 6000,
    credit_line_sales: 7000,
    discount_purchase: 2,
    discount_sales: 5,
    customer_since: "2023-04-20T00:00:00Z",
  },
];

const RANDOM_ROPP_DATA = [
  {
    code: 10001,
    representative: {},
    name: "dummy 1",
    remarks: null,
    external_id: "79e0ba04-eca7-434c-8ca2-0c1006d717b5",
    website: null,
    chamber_of_commerce_number: null,
    vat_number: "BE123456789",
    row_version: 16705184,
    id: "300e6167-dae8-46ed-b60c-4e26a53b0899",
    "main_address-city": "Bornem",
    "main_address-country-name": "BelgiÃ«",
    "main_address-country-isoCode2": "BE",
    "main_address-country-operations": [],
    "main_address-operations": [],
    "main_address-postalCode": "2178",
    "main_address-phoneNumber": "048909589 5",
    "main_address-addressLine1": "somestreet 92",
    "email-1-id": "5550b3a1-1b88-40c7-91d2-1e7c1a560634",
    "email-1-description": "General",
    "email-1-mailAddress": "example1@gmail.com",
    "email-2-id": "d82a9322-f8ad-4722-8c63-577c1a94eaa8",
    "email-2-description": "Invocie",
    "email-2-mailAddress": "example2@gmail.com",
    "email-3-id": "0dd669f7-9148-4e36-b937-bd6c4ed228d1",
    "email-3-description": "PRIJSLIJST ALGEMEEN",
    "email-3-mailAddress": "bibitkarki@gmail.com",
    "email-4-id": "3fbd6618-3922-4fca-a9bd-39208fa78ea2",
    "email-4-description": "General",
    "email-4-mailAddress": "bibitkarki@gmail.com",
    "email-5-id": "32900d2a-1244-4c76-943b-f2bcdf837fdd",
    "email-5-description": "PROMO PRIJS LIJST  (TOEGANG)",
    "email-5-mailAddress": "bibitkarki@gmail.com",
    "email-6-id": "f19b914b-4026-49f3-b9ff-ad90e4bfb6b4",
    "email-6-description": "DeliveryNote",
    "email-6-mailAddress": "bibitkarki@gmail.com",
  },
  {
    code: 10001,
    representative: {},
    name: "dummy 1",
    remarks: null,
    external_id: "79e0ba04-eca7-434c-8ca2-0c1006d717b5",
    website: null,
    chamber_of_commerce_number: null,
    vat_number: "BE123456789",
    row_version: 16705184,
    id: "300e6167-dae8-46ed-b60c-4e26a53b0899",
    "main_address-city": "Bornem",
    "main_address-country-name": "BelgiÃ«",
    "main_address-country-isoCode2": "BE",
    "main_address-country-operations": [],
    "main_address-operations": [],
    "main_address-postalCode": "2178",
    "main_address-phoneNumber": "048909589 5",
    "main_address-addressLine1": "somestreet 92",
    "email-1-id": "5550b3a1-1b88-40c7-91d2-1e7c1a560634",
    "email-1-description": "General",
    "email-1-mailAddress": "example1@gmail.com",
    "email-2-id": "d82a9322-f8ad-4722-8c63-577c1a94eaa8",
    "email-2-description": "Invocie",
    "email-2-mailAddress": "example2@gmail.com",
    "email-3-id": "0dd669f7-9148-4e36-b937-bd6c4ed228d1",
    "email-3-description": "PRIJSLIJST ALGEMEEN",
    "email-3-mailAddress": "bibitkarki@gmail.com",
    "email-4-id": "3fbd6618-3922-4fca-a9bd-39208fa78ea2",
    "email-4-description": "General",
    "email-4-mailAddress": "bibitkarki@gmail.com",
    "email-5-id": "32900d2a-1244-4c76-943b-f2bcdf837fdd",
    "email-5-description": "PROMO PRIJS LIJST  (TOEGANG)",
    "email-5-mailAddress": "bibitkarki@gmail.com",
    "email-6-id": "f19b914b-4026-49f3-b9ff-ad90e4bfb6b4",
    "email-6-description": "DeliveryNote",
    "email-6-mailAddress": "bibitkarki@gmail.com",
  },
  {
    code: 10001,
    representative: {},
    name: "dummy 1",
    remarks: null,
    external_id: "79e0ba04-eca7-434c-8ca2-0c1006d717b5",
    website: null,
    chamber_of_commerce_number: null,
    vat_number: "BE123456789",
    row_version: 16705184,
    id: "300e6167-dae8-46ed-b60c-4e26a53b0899",
    "main_address-city": "Bornem",
    "main_address-country-name": "BelgiÃ«",
    "main_address-country-isoCode2": "BE",
    "main_address-country-operations": [],
    "main_address-operations": [],
    "main_address-postalCode": "2178",
    "main_address-phoneNumber": "048909589 5",
    "main_address-addressLine1": "somestreet 92",
    "email-1-id": "5550b3a1-1b88-40c7-91d2-1e7c1a560634",
    "email-1-description": "General",
    "email-1-mailAddress": "example1@gmail.com",
    "email-2-id": "d82a9322-f8ad-4722-8c63-577c1a94eaa8",
    "email-2-description": "Invocie",
    "email-2-mailAddress": "example2@gmail.com",
    "email-3-id": "0dd669f7-9148-4e36-b937-bd6c4ed228d1",
    "email-3-description": "PRIJSLIJST ALGEMEEN",
    "email-3-mailAddress": "bibitkarki@gmail.com",
    "email-4-id": "3fbd6618-3922-4fca-a9bd-39208fa78ea2",
    "email-4-description": "General",
    "email-4-mailAddress": "bibitkarki@gmail.com",
    "email-5-id": "32900d2a-1244-4c76-943b-f2bcdf837fdd",
    "email-5-description": "PROMO PRIJS LIJST  (TOEGANG)",
    "email-5-mailAddress": "bibitkarki@gmail.com",
    "email-6-id": "f19b914b-4026-49f3-b9ff-ad90e4bfb6b4",
    "email-6-description": "DeliveryNote",
    "email-6-mailAddress": "bibitkarki@gmail.com",
  },
  {
    code: 10001,
    representative: {},
    name: "dummy 1",
    remarks: null,
    external_id: "79e0ba04-eca7-434c-8ca2-0c1006d717b5",
    website: null,
    chamber_of_commerce_number: null,
    vat_number: "BE123456789",
    row_version: 16705184,
    id: "300e6167-dae8-46ed-b60c-4e26a53b0899",
    "main_address-city": "Bornem",
    "main_address-country-name": "BelgiÃ«",
    "main_address-country-isoCode2": "BE",
    "main_address-country-operations": [],
    "main_address-operations": [],
    "main_address-postalCode": "2178",
    "main_address-phoneNumber": "048909589 5",
    "main_address-addressLine1": "somestreet 92",
    "email-1-id": "5550b3a1-1b88-40c7-91d2-1e7c1a560634",
    "email-1-description": "General",
    "email-1-mailAddress": "example1@gmail.com",
    "email-2-id": "d82a9322-f8ad-4722-8c63-577c1a94eaa8",
    "email-2-description": "Invocie",
    "email-2-mailAddress": "example2@gmail.com",
    "email-3-id": "0dd669f7-9148-4e36-b937-bd6c4ed228d1",
    "email-3-description": "PRIJSLIJST ALGEMEEN",
    "email-3-mailAddress": "bibitkarki@gmail.com",
    "email-4-id": "3fbd6618-3922-4fca-a9bd-39208fa78ea2",
    "email-4-description": "General",
    "email-4-mailAddress": "bibitkarki@gmail.com",
    "email-5-id": "32900d2a-1244-4c76-943b-f2bcdf837fdd",
    "email-5-description": "PROMO PRIJS LIJST  (TOEGANG)",
    "email-5-mailAddress": "bibitkarki@gmail.com",
    "email-6-id": "f19b914b-4026-49f3-b9ff-ad90e4bfb6b4",
    "email-6-description": "DeliveryNote",
    "email-6-mailAddress": "bibitkarki@gmail.com",
  },
  {
    code: 10001,
    representative: {},
    name: "dummy 1",
    remarks: null,
    external_id: "79e0ba04-eca7-434c-8ca2-0c1006d717b5",
    website: null,
    chamber_of_commerce_number: null,
    vat_number: "BE123456789",
    row_version: 16705184,
    id: "300e6167-dae8-46ed-b60c-4e26a53b0899",
    "main_address-city": "Bornem",
    "main_address-country-name": "BelgiÃ«",
    "main_address-country-isoCode2": "BE",
    "main_address-country-operations": [],
    "main_address-operations": [],
    "main_address-postalCode": "2178",
    "main_address-phoneNumber": "048909589 5",
    "main_address-addressLine1": "somestreet 92",
    "email-1-id": "5550b3a1-1b88-40c7-91d2-1e7c1a560634",
    "email-1-description": "General",
    "email-1-mailAddress": "example1@gmail.com",
    "email-2-id": "d82a9322-f8ad-4722-8c63-577c1a94eaa8",
    "email-2-description": "Invocie",
    "email-2-mailAddress": "example2@gmail.com",
    "email-3-id": "0dd669f7-9148-4e36-b937-bd6c4ed228d1",
    "email-3-description": "PRIJSLIJST ALGEMEEN",
    "email-3-mailAddress": "bibitkarki@gmail.com",
    "email-4-id": "3fbd6618-3922-4fca-a9bd-39208fa78ea2",
    "email-4-description": "General",
    "email-4-mailAddress": "bibitkarki@gmail.com",
    "email-5-id": "32900d2a-1244-4c76-943b-f2bcdf837fdd",
    "email-5-description": "PROMO PRIJS LIJST  (TOEGANG)",
    "email-5-mailAddress": "bibitkarki@gmail.com",
    "email-6-id": "f19b914b-4026-49f3-b9ff-ad90e4bfb6b4",
    "email-6-description": "DeliveryNote",
    "email-6-mailAddress": "bibitkarki@gmail.com",
  },
  {
    code: 10001,
    representative: {},
    name: "dummy 1",
    remarks: null,
    external_id: "79e0ba04-eca7-434c-8ca2-0c1006d717b5",
    website: null,
    chamber_of_commerce_number: null,
    vat_number: "BE123456789",
    row_version: 16705184,
    id: "300e6167-dae8-46ed-b60c-4e26a53b0899",
    "main_address-city": "Bornem",
    "main_address-country-name": "BelgiÃ«",
    "main_address-country-isoCode2": "BE",
    "main_address-country-operations": [],
    "main_address-operations": [],
    "main_address-postalCode": "2178",
    "main_address-phoneNumber": "048909589 5",
    "main_address-addressLine1": "somestreet 92",
    "email-1-id": "5550b3a1-1b88-40c7-91d2-1e7c1a560634",
    "email-1-description": "General",
    "email-1-mailAddress": "example1@gmail.com",
    "email-2-id": "d82a9322-f8ad-4722-8c63-577c1a94eaa8",
    "email-2-description": "Invocie",
    "email-2-mailAddress": "example2@gmail.com",
    "email-3-id": "0dd669f7-9148-4e36-b937-bd6c4ed228d1",
    "email-3-description": "PRIJSLIJST ALGEMEEN",
    "email-3-mailAddress": "bibitkarki@gmail.com",
    "email-4-id": "3fbd6618-3922-4fca-a9bd-39208fa78ea2",
    "email-4-description": "General",
    "email-4-mailAddress": "bibitkarki@gmail.com",
    "email-5-id": "32900d2a-1244-4c76-943b-f2bcdf837fdd",
    "email-5-description": "PROMO PRIJS LIJST  (TOEGANG)",
    "email-5-mailAddress": "bibitkarki@gmail.com",
    "email-6-id": "f19b914b-4026-49f3-b9ff-ad90e4bfb6b4",
    "email-6-description": "DeliveryNote",
    "email-6-mailAddress": "bibitkarki@gmail.com",
  },
];

export { random_EO_DATA, RANDOM_ROPP_DATA };
