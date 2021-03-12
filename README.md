# Jr Dev Flashcards (API)

### React flashcard app to assist first time job seekers

For more info, please visit the [frontend repo](https://github.com/benhammondmusic/jr-dev-flashcards-client)

## API Endpoints:

- /topics to get list of available topics
- /topics/`topicString` (where `topicString` is a string from the topic array). Returns an array containing all of that topic's question/answer objects.
- /topics/`topicString`/`questionanswerIndex` (where `questionanswerIndex` is an integer index value from the topics question/answer array). Returns a single question/answer object.

## Contributing

Pull requests and issues are encouraged! Both repos are public on GitHub:

- [Frontend Repo](https://github.com/benhammondmusic/jr-dev-flashcards-client)
- [Backend Repo](https://github.com/benhammondmusic/flashcards)

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Deployments

- [Frontend Client](https://jr-dev-flashcards.netlify.app/) - Use this to view the flashcards app.
- [Backend - API](http://jr-dev-flashcards.herokuapp.com/api)
