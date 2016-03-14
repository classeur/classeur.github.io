---
layout: help
title: REST API

---


# Overview

This describes the resources that make up the official Classeur API v2. If you have any problems or requests please [contact us](support@classeur.io).


## Schema

- All data is sent and received as JSON.
- Blank fields are omitted.
- All timestamps are milliseconds elapsed since 1 January 1970 00:00:00 UTC.


## Authentication

Access to some resources require user authentication.

User authentication can be performed via [HTTP basic auth](https://en.wikipedia.org/wiki/Basic_access_authentication). Provide a user ID as the username and an API key as the password:

```
curl https://app.classeur.io/api/v2/files/F5QZgtHR1CCEgRN8p5Xc \
   -u vlFEOQ8ILrWspd9et2tA:TzghPtMs5yOW0aTOG1uK9lASRzAKFMgZ
```


## Pagination

Requests that return multiple items will be limited to 20 items by default. For most resources, you can retrieve up to 200 items.

Specify a range of items to retrieve using the `range` header with unit `items`. For example, to retrieve page #2:

```
Range: items=30-59
```

To retrieve the last page:

```
Range: items=-30
```

## Conditional updates

Most responses return an `ETag` header. You can use the value of this header to make conditional updates to those resources using the `If-Match` header. If the resource has changed, the server will not update it and will return a `412 Precondition Failed`.

Note that the ETag for a single entity usually consists of a field value like `updated` or `rev`.





# Users



## The user resource

```
{
  "created": 1453552264623,
  "gravatarHash": "6a5fbbf318d32e435355df83952e8a49",
  "id": "S3377cf9jC8wWiNZdNZh",
  "name": "Benoit",
  "updated": 1453552264623
}
```

#### Attributes

|Name          |Type       |Description                                                             |
|--------------|-----------|------------------------------------------------------------------------|
|`created`     |`timestamp`|The date the user registered.                                           |
|`gravatarHash`|`string`   |The [Gravatar email hash](https://en.gravatar.com/site/implement/hash/).|
|`id`          |`string`   |The ID of the user.                                                     |
|`name`        |`string`   |The name of the user.                                                   |
|`updated`     |`timestamp`|The date the user was last modified.                                    |



## List all users


```
GET /api/v2/users
```

> Admin only.


#### Parameters

|Name       |Type    |Description                                                              |
|-----------|--------|-------------------------------------------------------------------------|
|`direction`|`string`|The direction of the sort. Can be either `asc` or `desc`. Default: `asc`.|



## Retrieve a user

```
GET /api/v2/users/:userId
GET /api/v2/users/me
```

> Owner and admin only.



## Delete a user

```
DELETE /api/v2/users/:userId
```

> Admin only.









# Classeurs



## The classeur resource

```
{
  "id": "05oj7JMkMza4dxDI53N9",
  "name": "Classeur name",
  "updated": 1453552264623,
  "userId": "RZVjfkbZx2AoBVfv7w0r"
}
```

#### Attributes

|Name     |Type       |Description                                       |
|---------|-----------|--------------------------------------------------|
|`id`     |`string`   |The ID of the classeur.                           |
|`name`   |`string`   |The name of the classeur.                         |
|`updated`|`timestamp`|The date the file was last modified.              |
|`userId` |`string`   |The ID of the owner. `null` for a public classeur.|



## List classeurs


### List all classeurs

```
GET /api/v2/classeurs
```

> Admin only.


#### Parameters

|Name       |Type    |Description                                                              |
|-----------|--------|-------------------------------------------------------------------------|
|`direction`|`string`|The direction of the sort. Can be either `asc` or `desc`. Default: `asc`.|


### List user classeurs

```
GET /api/v2/users/:userId/classeurs
```

> Owner and admin only.


#### Parameters

|Name       |Type    |Description                                                                    |
|-----------|--------|-------------------------------------------------------------------------------|
|`sort`     |`string`|What to sort results by. Can be either `updated` or `name`. Default: `updated`.|
|`direction`|`string`|The direction of the sort. Can be either `asc` or `desc`. Default: `asc`.      |



## Retrieve a classeur

```
GET /api/v2/classeurs/:classeurId
```

> Owner and admin only, if classeur is private.



## Modify a classeur


### Upsert a classeur

```
PUT /api/v2/classeurs/:classeurId
```

> Owner only, if classeur is private.


### Upsert / attach a classeur to a user

```
PUT /api/v2/users/:userId/classeurs/:classeurId
```

> Affected user or admin only. Pass an empty body to avoid updating the classeur.


### Detach a classeur from a user

```
DELETE /api/v2/users/:userId/classeurs/:classeurId
```

> Affected user or admin only. Public classeur only.


### Delete a classeur permanently

```
DELETE /api/v2/classeurs/:classeurId
```

> Owner and admin only, or admin only if classeur is public.







# Folders



## The folder resource

```
{
  "id": "05oj7JMkMza4dxDI53N9",
  "name": "Folder name",
  "sharing": "rw",
  "updated": 1453552264623,
  "userId": "RZVjfkbZx2AoBVfv7w0r"
}
```

#### Attributes

|Name     |Type       |Description                                                               |
|---------|-----------|--------------------------------------------------------------------------|
|`id`     |`string`   |The ID of the folder.                                                     |
|`name`   |`string`   |The name of the folder.                                                   |
|`sharing`|`string`   |The sharing preference of the folder. Can be either `r` or `rw`. Optional.|
|`updated`|`timestamp`|The date the file was last modified.                                      |
|`userId` |`string`   |The ID of the owner.                                                      |



## List folders


### List all folders

```
GET /api/v2/folders
```

> Admin only.


#### Parameters

|Name       |Type    |Description                                                              |
|-----------|--------|-------------------------------------------------------------------------|
|`direction`|`string`|The direction of the sort. Can be either `asc` or `desc`. Default: `asc`.|


### List user folders

```
GET /api/v2/users/:userId/folders
```

> Owner and admin only.


#### Parameters

|Name       |Type    |Description                                                                    |
|-----------|--------|-------------------------------------------------------------------------------|
|`sort`     |`string`|What to sort results by. Can be either `updated` or `name`. Default: `updated`.|
|`direction`|`string`|The direction of the sort. Can be either `asc` or `desc`. Default: `asc`.      |



### List classeur folders

```
GET /api/v2/classeurs/:classeurId/folders
```

> Owner and admin only, if classeur is private.


#### Parameters

|Name       |Type    |Description                                                                    |
|-----------|--------|-------------------------------------------------------------------------------|
|`sort`     |`string`|What to sort results by. Can be either `updated` or `name`. Default: `updated`.|
|`direction`|`string`|The direction of the sort. Can be either `asc` or `desc`. Default: `asc`.      |



## Retrieve a folder

```
GET /api/v2/folders/:folderId
```

> Owner and admin only, if folder is private.



## Modify a folder


### Upsert a folder

```
PUT /api/v2/folders/:folderId
```

> Owner only, if folder doesn't exist or is private or read-only.


### Upsert / add a folder to a classeur

```
PUT /api/v2/classeurs/:classeurId/folders/:folderId
```

> Owner only, if classeur is private. Pass an empty body to avoid updating the folder.


### Remove a folder from a classeur

```
DELETE /api/v2/classeurs/:classeurId/folders/:folderId
```

> Owner only, if classeur is private.


### Delete a folder permanently

```
DELETE /api/v2/folders/:folderId
```

> Owner and admin only.






# Files



## The file resource

```
{
  "deleted": 1453552264623,
  "id": "05oj7JMkMza4dxDI53N9",
  "name": "File name",
  "sharing": "rw",
  "updated": 1453552264623,
  "userId": "RZVjfkbZx2AoBVfv7w0r"
}
```

#### Attributes

|Name     |Type       |Description                                                             |
|---------|-----------|------------------------------------------------------------------------|
|`deleted`|`timestamp`|The date the file was placed in the trash. Optional.                    |
|`id`     |`string`   |The ID of the file.                                                     |
|`name`   |`string`   |The name of the file.                                                   |
|`sharing`|`string`   |The sharing preference of the file. Can be either `r` or `rw`. Optional.|
|`updated`|`timestamp`|The date the file was last modified.                                    |
|`userId` |`string`   |The ID of the owner.                                                    |



## List files


### List all files

```
GET /api/v2/files
```

> Admin only.


#### Parameters

|Name       |Type    |Description                                                              |
|-----------|--------|-------------------------------------------------------------------------|
|`direction`|`string`|The direction of the sort. Can be either `asc` or `desc`. Default: `asc`.|


### List user files

```
GET /api/v2/users/:userId/files
```

> Owner and admin only.


#### Parameters

|Name       |Type     |Description                                                                    |
|-----------|---------|-------------------------------------------------------------------------------|
|`deleted`  |`boolean`|Whether or not to retrieve deleted files. Default: `false`.                    |
|`sort`     |`string` |What to sort results by. Can be either `updated` or `name`. Default: `updated`.|
|`direction`|`string` |The direction of the sort. Can be either `asc` or `desc`. Default: `asc`.     |


### List folder files

```
GET /api/v2/folders/:folderId/files
```

> Owner and admin only, if folder is private.


#### Parameters

|Name       |Type    |Description                                                                    |
|-----------|--------|-------------------------------------------------------------------------------|
|`sort`     |`string`|What to sort results by. Can be either `updated` or `name`. Default: `updated`.|
|`direction`|`string`|The direction of the sort. Can be either `asc` or `desc`. Default: `asc`.     |



## Retrieve a file

```
GET /api/v2/files/:fileId
```

> Owner and admin only, if file is private.



## Modify a file


### Upsert a file

```
PUT /api/v2/files/:fileId
```

> Owner only, if file doesn't exist or is private or read-only.


### Upsert a folder file / move a file

```
PUT /api/v2/folders/:folderId/files/:fileId
```

> Owner only, if folder is private or read-only. Use `null` as `folderId` to remove a file from its folder.


### Delete a file permanently

```
DELETE /api/v2/files/:fileId
```

> Owner and admin only.





# Content revisions



## The content revision resource

```
{
  "comments": {},
  "conflicts": {},
  "discussions": {},
  "properties": {
    "key": "value"
  },
  "rev": 4793,
  "text": "Text content."
}
```

#### Attributes

|Name         |Type     |Description                              |
|-------------|---------|-----------------------------------------|
|`comments`   |`object` |An object containing discussion comments.|
|`conflicts`  |`object` |An object containing conflicts.          |
|`discussions`|`object` |An object containing discussions.        |
|`properties` |`object` |An object containing properties.         |
|`rev`        |`integer`|The revision number.                     |
|`text`       |`string` |The text content of the file revision.   |





## Retrieve a content revision

```
GET /api/v2/files/:fileId/contentRevs/last
GET /api/v2/files/:fileId/contentRevs/:rev
```

> Owner and admin only, if file is private.



## Create a content revision

```
PATCH /api/v2/files/:fileId/contentRevs/last
PATCH /api/v2/files/:fileId/contentRevs/:rev
```

> Owner and admin only, if file is not writable. Specify an old revision to perform a merge using `:rev` as the origin.





# Content changes



## The content change resource

```
{
  "comments": [],
  "conflicts": [],
  "created": 1453552264623,
  "discussions": [],
  "properties": [],
  "rev": 4793,
  "text": [],
  "userId": "RZVjfkbZx2AoBVfv7w0r"
}
```

#### Attributes

|Name         |Type       |Description                                    |
|-------------|-----------|-----------------------------------------------|
|`comments`   |`array`    |A list of discussion comment changes. Optional.|
|`conflicts`  |`array`    |A list of conflict changes. Optional.          |
|`created`    |`timestamp`|The date the change was made.                  |
|`discussions`|`array`    |A list of discussion changes. Optional.        |
|`properties` |`array`    |A list of property changes. Optional.          |
|`rev`        |`integer`  |The revision number after the content change.  |
|`text`       |`array`    |A list of text changes. Optional.              |
|`userId`     |`string`   |The ID of the user who made the change.        |

> A list of changes consists of objects containing:
>  - `k`, the key that has changed, for objects like `comments`, `conflicts`, `discussions` and `properties`, or `o`, the offset of the change, for `text`.
>  - `a`, the added value/text, or `d`, the deleted value/text.



## List content changes

```
GET /api/v2/files/:fileId/contentChanges
```

> Owner and admin only, if file is private.





# Content change groups



## The content change group resource

```
{
  "created": 1453552264623,
  "fromRev": 4793,
  "toRev": 5534,
  "userIds": [ "RZVjfkbZx2AoBVfv7w0r" ]
}
```

#### Attributes

|Name     |Type       |Description                                 |
|---------|-----------|--------------------------------------------|
|`created`|`timestamp`|The date the change group was made.         |
|`fromRev`|`integer`  |The revision number before the change group.|
|`toRev`  |`integer`  |The revision number before the change group.|
|`userIds`|`array`    |The ID list of users who made the changes.  |



## List content change groups

```
GET /api/v2/files/:fileId/contentChangeGroups
```

> Owner and admin only, if file is private.



