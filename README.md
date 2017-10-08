# Firebase-Structure-Example
My site built using Polymer 3.0 (minimal) and Firebase

## Models
### Article
- articleId: primary key
- title: title of the article
- body: body text of the article
- summary: summary of the article
- datePublished: date of publication
- dateUpdated: date updated
- dateCreated: date of creation
- published: if article is published
- uid: author of the article
- comments: list of comments

### User
- uid: primary key
- displayName: The name of the user to be displayed
- firstName: User's firstname
- lastName: User's lastname
- email: email of user
- avatar: The image avatar of the user
- dateJoined: the date when the user first registered to the app
- dateBirth: the user's birth date
- articles: list of articles created by user
- threads: list of threads

### Comment
- commentId: primary key
- body: user comment
- dateCreated: Date of creation
- uid: author of comment
- articleId: the thread in which this article belongs to

### Thread
- threadId: primary key
- title: Title of thread
- dateLastMessage: date of last message
- messageIdLast: message id of last message
- members: list of users
- unread: list of users with number of unread messages
- lastRead: list of users with their last read message
- messages: list of messages

### Message
- messageId: primary key
- body: Body of message
- dateCreated: date of creation
- uid: author of message
- threadId: The thread in which this message belongs to

## Firebase Structure
```
- firebase-structure-example
  - article
    - source
      - $articleId
        - primary
          - title
          - body
          - summary
        - meta
          - datePublished
          - dateUpdated
          - dateCreated
          - published
        - cross
          - uid
          - comments
            - $commentId
              - value: true
    - query
      - published::datePublished
        - $articleId
          - value: $articleId.meta.datePublished
      - notPublished::dateUpdated
        - $articleId
          - value: $articleId.meta.dateUpdated
      - user:::{$uid}::published::datePublished
        - $articleId
          - value: $articleId.meta.datePublished
      - user:::{$uid}::notPublished::dateUpdated
        - $articleId
          - value: $articleId.meta.dateUpdated

  - user
    - source
      - $uid
        - primary
          - displayName
          - firstName
          - email
          - avatar
        - meta
          - lastName
          - dateJoined
          - dateBirth
        - cross
          - articles
            - $articleId
              - value: true
          - threads
            - $threadId
              - value: true
    -query
      - lastName
        - $uid
          - value: $uid.meta.lastName
      - dateJoined
        - $uid
          - value: $uid.meta.dateJoined
      - dateBirth
        - $uid
          - value: $uid.meta.dateBirth

  - comment
    - source
      - $commentId
        - primary
          - body
        - meta
          - dateCreated
        - cross
          - uid
          - articleId
    - query
      - article:::{$articleId}::dateCreated
        - $commentId
          - value: $commentId.meta.dateCreated

  - thread
    - source
      - $threadId
        - primary
          - title
        - meta
          - dateLastMessage
        - cross
          - messageIdLast: $messageId
          - members
            - $uid
              - value: true
          - unread
            - $uid
              - value: (value of unread messages)
          - lastRead
            - $uid
              - value: $messageId
          - messages
            - $messageId
              - value: true
    - query
      - user:::${uid}::dateLastMessage
        - value: $threadId.meta.dateLastMessage
      - user:::${uid}::unread
        - value: $threadId.cross.unread.$uid.value

  - message
    - source
      - $messageId
        - primary
          - body
        - meta
          - dateCreated
        - cross
          - uid
          - threadId
    query
      - thread:::{$threadId}::dateCreated
        - $messageId
          - value: $messageId.meta.dateCreated
```