---
layout: help

---

# REST API

## Authentication

Files and folders are exposed via a simple REST API. The access may be restricted depending on the sharing preferences of the resource. For resources that requires a particular role, authentication is performed via [HTTP basic authentication](https://en.wikipedia.org/wiki/Basic_access_authentication). Provide your user ID as the username value and your API key as the password value.

Example:

```
curl https://app.classeur.io/api/v1/files/F5QZgtHR1CCEgRN8p5Xc \
   -u vlFEOQ8ILrWspd9et2tA:TzghPtMs5yOW0aTOG1uK9lASRzAKFMgZ
```


## Files


### Retrieve a file

```
GET /api/v1/files/{fileId}
GET /api/v1/files/{fileId}/fromRev/{fromRev}
GET /api/v1/files/{fileId}/fromRev/{fromRev}/toRev/{toRev}
```

Parameter | Description
--------: | ---
**fileId** *String* | The file ID.
**fromRev** *Integer* | If provided, the result will contain the content of the specified revision and all the changes from the `fromRev` revision to the latest revision.
**toRev** *Integer* | If provided, the result will only contain the changes from the `fromRev` revision to the `toRev` revision.

> **Note:** `user` or `admin` role is required for files that are not shared publicly.


### Retrieve files metadata

```
GET /api/v1/metadata/files?id=id1,id2...
```

Parameter | Description
--------: | ---
**id** *String* | A comma separated list of file IDs.

> **Note:** `user` or `admin` role is required for files that are not shared publicly.



