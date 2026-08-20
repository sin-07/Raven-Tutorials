# Institutional Security Policy

## Student Credentials
- Registration IDs are generated with an atomic checksum sequence to prevent collision.
- Student verification QR encodes HMAC-signed identification tokens to prevent forgery.
- Admission uploads are validated strictly for MIME types and file size boundaries before Cloudinary dispatch.

## Session Management
- Admin sessions expire after 24 hours of inactivity.
- Cross-Site Request Forgery (CSRF) tokens protect all state-mutating tuition endpoints.
