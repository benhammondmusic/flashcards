# Jr Dev Flashcards (API)

### React flashcard app to assist first time job seekers


API Endpoints:
* /topics to get list of available topics
* /topics/```topicString``` (where ```topicString``` is a string from the topic array). Returns an array containing all of that topic's question/answer objects.
* /topics/```topicString```/```questionanswerIndex``` (where ```questionanswerIndex``` is an integer index value from the topics question/answer array). Returns a single question/answer object.

Deployed API (Heroku):
[Jr Dev Flashcards API](http://jr-dev-flashcards.herokuapp.com/api)
