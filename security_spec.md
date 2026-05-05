# Security Specification - LexCLAT

## Data Invariants
1. **User Ownership**: All user-related data (profiles, chats, mocks, plans) must strictly belong to the authenticated user identified by `userId` in the path.
2. **Identity Integrity**: The `userId` in the document path must match `request.auth.uid`.
3. **Immutability**: `createdAt` and `email` fields in the User profile are immutable after creation.
4. **Validation**: All writes must pass schema validation (correct types, non-empty strings, size limits).

## The Dirty Dozen Payloads (Rejection Tests)
1. **Identity Spoofing**: Attempt to write to `/users/other_user_id` while authenticated as `user_A`.
2. **Shadow Field Injection**: Attempt to create a user profile with an extra `isAdmin: true` field.
3. **ID Poisoning**: Attempt to create a mock result with a 2KB junk string as the `mockId`.
4. **Email Modification**: Attempt to update the `email` field in a user profile.
5. **Score Overload**: Attempt to set a `diagnosticScore` to `999999` (exceeding 0-100 range).
6. **Negative Time**: Attempt to set `timeSpent` in a mock to `-500`.
7. **Cross-User Chat**: Attempt to read `/users/user_B/chats/chat_123` as `user_A`.
8. **Invalid Enum**: Attempt to set `studentStatus` to `alien` (must be `dropper` or `school`).
9. **Timestamp Spoofing**: Attempt to provide a client-side `updatedAt` string instead of `serverTimestamp()`.
10. **Huge String**: Attempt to write a `displayName` that is 50,000 characters long.
11. **Orphaned Mock**: Attempt to create a mock without a `totalScore`.
12. **Public User List**: Attempt to list ALL users in the `/users` collection without a specific filter.

## Test Runner (Logic Check)
The `firestore.rules.test.ts` will verify these rejections.
