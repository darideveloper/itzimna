## Why

Currently, the global contact form located in the footer captures general contact details (name, email, phone, message) but lacks an input field for users to indicate which real estate property they are inquiring about. To allow visitors to specify the property they are interested in as a free-text input and have it recorded directly into the dashboard lead record, an input field must be added to the footer contact form and transmitted in the API payload, while preserving backward compatibility for other forms such as property detail page contacts.

## What Changes

- Add an optional text input field for property of interest to `components/ui/ContactForm.jsx` (`name="property"`), controlled by prop `showPropertyInput = false` (default false) so component reuse in `PropertySeller.jsx` remains unaffected.
- Pass `showPropertyInput={true}` on the footer contact form in `components/layouts/Contact.jsx` and forward `data.property` to `saveLead`.
- Update `libs/api/leads.js` to accept `property = ""` and transmit `property` directly in the payload sent to `POST /api/leads/`.
- Add localized placeholder and label keys (`property` and `property_placeholder`) under the `"Form"` namespace in `messages/es.json` and `messages/en.json`.

## Capabilities

### New Capabilities
- `contact-property-interest`: Allows users to submit a free-text property of interest in the global contact form and sends it to the leads API.

### Modified Capabilities
<!-- No existing capabilities under openspec/specs/ are being modified -->

## Impact

- Affected components: `components/ui/ContactForm.jsx`, `components/layouts/Contact.jsx`.
- Affected API client: `libs/api/leads.js`.
- Affected translations: `messages/es.json`, `messages/en.json`.
- Downstream systems: Backend endpoint `POST /api/leads/` receives the `property` parameter.
