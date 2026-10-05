## 1. Localization

- [x] 1.1 Add `property` and `property_placeholder` keys to `"Form"` namespace in `messages/es.json` and verify valid JSON syntax.
- [x] 1.2 Add `property` and `property_placeholder` keys to `"Form"` namespace in `messages/en.json` and verify valid JSON syntax.

## 2. Components & API Client

- [x] 2.1 Update `components/ui/ContactForm.jsx` to accept `showPropertyInput = false` prop, render an optional `<Input>` for `property`, and verify component syntax.
- [x] 2.2 Update `components/layouts/Contact.jsx` to pass `showPropertyInput={true}` to `ContactForm` and forward `data.property` to `saveLead`.
- [x] 2.3 Update `libs/api/leads.js` `saveLead` function to accept `property = ""` and transmit `property` to `/api/leads/` endpoint.

## 3. Verification

- [x] 3.1 Run frontend build check (`pnpm run build`) in `itzimna` to verify clean compilation with no syntax or JSX errors.
- [x] 3.2 Verify footer contact form dispatches `property` field to backend API and handles successful submission.
