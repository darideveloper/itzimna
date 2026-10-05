# contact-property-interest Specification

## Purpose
Enables website visitors to specify a property of interest within the footer contact form and submits it to the backend leads endpoint.

## Requirements

### Requirement: Property Input Field in Contact Form
The system SHALL provide an optional text input for specifying a property of interest on the contact form, with configurable visibility so that it is enabled on the footer contact section while remaining suppressed on individual property seller pages.

#### Scenario: Footer contact form displays property input
- **WHEN** a visitor views the global footer contact section
- **THEN** the contact form renders a free-text input field for property of interest with localized placeholder

#### Scenario: Property seller card suppresses property input
- **WHEN** the contact form is rendered on an individual property page
- **THEN** the form does not render the redundant property text input

### Requirement: Lead Submission with Property of Interest
The system SHALL include the user-entered property text in the payload dispatched to the backend leads API endpoint upon form submission.

#### Scenario: Form submitted with property text
- **WHEN** a user fills out contact details and enters a property name in the property input field and submits
- **THEN** the frontend client sends a `POST` request to `/api/leads/` containing the entered string in `property`

#### Scenario: Form submitted without property text
- **WHEN** a user fills out contact details leaving the property field blank and submits
- **THEN** the frontend client sends a `POST` request to `/api/leads/` with an empty string or omitted `property`

### Requirement: Localization of Contact Form Property Field
The system SHALL provide Spanish and English localization entries for the property field placeholder and label.

#### Scenario: Spanish locale rendered
- **WHEN** the visitor navigates the site under the Spanish (`es`) locale
- **THEN** the property field placeholder displays the Spanish translated message

#### Scenario: English locale rendered
- **WHEN** the visitor navigates the site under the English (`en`) locale
- **THEN** the property field placeholder displays the English translated message
