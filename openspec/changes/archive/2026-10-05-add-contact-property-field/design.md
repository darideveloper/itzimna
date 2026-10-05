## Context

The frontend is a Next.js application using Tailwind CSS, `react-hook-form` for form management, and `next-intl` for localization. The global contact form in the footer is rendered by `components/layouts/Contact.jsx`, which delegates form controls to `components/ui/ContactForm.jsx`. In turn, `ContactForm` is also utilized in `components/layouts/PropertySeller.jsx` on specific property pages.

The backend endpoint `POST /api/leads/` accepts an optional `property` text string directly stored in the `Lead` model.

See `proposal.md` for background and `specs/contact-property-interest/spec.md` for requirements.

## Goals / Non-Goals

**Goals:**
- Add an optional property text field in `components/ui/ContactForm.jsx`, visible when enabled via `showPropertyInput`.
- Enable the field specifically on the global footer contact form in `components/layouts/Contact.jsx`.
- Update `libs/api/leads.js` to send `property` in the payload dispatched to `/api/leads/`.
- Add localized text and placeholders in `messages/es.json` and `messages/en.json`.

**Non-Goals:**
- Showing the free-text property input inside `PropertySeller.jsx` (where the property is already fixed and contextual).
- Making the property field mandatory (it remains optional to allow general customer inquiries).

## Decisions

### Decision 1: Visibility prop `showPropertyInput = false` on `ContactForm`
- **Decision**: Introduce a prop `showPropertyInput = false` (defaulting to false) in `ContactForm.jsx`.
- **Rationale**: Preserves 100% backward compatibility for other places where `ContactForm` is reused (such as `PropertySeller.jsx`), while allowing `Contact.jsx` to pass `showPropertyInput={true}`.
- **Alternatives considered**:
  - *Create a second contact form component*: Increases code duplication and maintenance burden.
  - *Always show property input*: Clutters the property seller card on single property pages where the property is already fixed.

### Decision 2: Field validation (`required = false`)
- **Decision**: Keep the property of interest input optional without required validation rules.
- **Rationale**: General inquiries (e.g. asking about agency services, appointments, or general pricing) do not always target a specific property. Making it optional prevents submission abandonment.

### Decision 3: API client parameter naming
- **Decision**: In `libs/api/leads.js`, update `saveLead(name, email, phone, message, property = "")` and send `property: typeof property === 'string' ? property : (property?.name || "")` in the JSON request body.
- **Rationale**: Matches the backend DRF serializer attribute `property` directly while safely supporting either string values or property object references.

## Risks / Trade-offs

- **[Risk] Visual spacing in the footer form** → *Mitigation*: The field uses the existing `<Input>` design component with identical container classes and spacing, placed between phone and message.
- **[Risk] Missing translation key** → *Mitigation*: Define `property` and `property_placeholder` in both `es.json` and `en.json` simultaneously.
