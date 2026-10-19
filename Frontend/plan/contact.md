# Contact Spec

## Current State
`components/Contact.js` — form (name, email, message), POST to `http://localhost:5000/api/contact`, status message. Section id="contact", bg-white.

## Target
`components/Contact.tsx` — typed, validation, loading state, error handling, success message.

## Props
```ts
interface ContactProps {
  apiUrl?: string; // override for testing
}
```

## Form State
```ts
interface ContactForm {
  name: string;
  email: string;
  message: string;
}
```

## Behavior
- Fields: name (text), email (email), message (textarea rows=5)
- Validation: required, email format (regex)
- Submit: disabled during request, show "Mengirim..."
- Success: clear form, show "✅ Pesan dikirim!"
- Error: show "❌ " + message
- Backend down: show "❌ Gagal mengirim pesan"

## Implementation Plan
1. `useState` for form, status, loading
2. `handleSubmit` with validation
3. Email regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
4. Disable submit button during request
5. Fetch with `NEXT_PUBLIC_API_URL` fallback
6. Success: auto-hide status after 5s (optional)

## Tasks
- [ ] Convert Contact.js → Contact.tsx
- [ ] Add ContactForm type
- [ ] Add email validation
- [ ] Add loading state
- [ ] Test submit success + error

## Verification
- Fill form → submit → success message
- Backend down → error message
- Invalid email → validation error