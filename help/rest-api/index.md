---
layout: help

---

# REST API

## Authentication

All files and folders are exposed via a simple REST API. The access may be restricted depending on the sharing preferences of the resource. For resources that requires a particular role, authentication is performed via [HTTP basic authentication](https://en.wikipedia.org/wiki/Basic_access_authentication). Provide your user ID as the username value and your API key as the password value.

## Files

### Retrieve a file

> `user` or `admin` role is required if the file is not shared publicly.

`GET /api/v1/files/{fileId}`
`GET /api/v1/files/{fileId}/fromRev/{fromRev}`
`GET /api/v1/files/{fileId}/fromRev/{fromRev}/toRev/{toRev}`

Parameter | Description
--------: | ---
**fileId** | The ID of the file resource.
**fromRev** | If provided, the result will contain the content of the specified revision and all the changes from the `fromRev` revision to the latest revision.
**toRev** | If provided, the result will only contain changes from the `fromRev` revision to the `toRev` revision.

