// create and use mongo_exercise db

// Insert documents into a movie collection:
db.movies.insert({ "title": "Star Wars", "writer": "George Lucus", "year": 1977, "actors": ["Mark Hamill", "Harrison Ford", "Carrie Fisher", "Peter Cushing", "James Earl Jones"]})
db.movies.insert({ "title": "Raiders of the Lost Ark", "writer": "George Lucus", "year": 1981, "actors": ["Harrison Ford"]})
db.movies.insert({ "title": "Fight Club", "writer": "Chuck Palahniuk", "year": 1999, "actors": ["Brad Pitt", "Edward Norton"]})
db.movies.insert({ "title": "Inglorious Bastards", "writer": "Quentin Tarantino", "year": 2009, "actors": ["Brad Pitt", "Diane Kruger", "Eli Roth"]})
db.movies.insert({ "title": "Hobbit: An Unexpected Journey", "writer": "J.R.R Tolkien", "year": 2012, "francise": "The Hobbit"})
db.movies.insert({ "title": "Hobbit: The Desolution of Smug", "writer": "J.R.R Tolkien", "year": 2013, "francise": "The Hobbit"})
db.movies.insert({ "title": "Hobbit: The Battle of the Five Armies", "writer": "J.R.R Tolkien", "year": 2012, "francise": "The Hobbit", "synopsis": "Bilbo and Company are forced to engage in a war against an array of combatants and keep the Lonely Mountain from falling into the hands of a rising darkness."})
db.movies.insert({ "title": "Pee Wee Herman's Big Adventure", "writer": "Phil Hartman", "year": 1985 })
db.movies.insert({ "title": "Avatar" })

// Query / Find Documents
// get all the documnets
db.movies.find({})
// get all documents with writer set to "Quentin Tarantino"
db.movies.find({"writer": "Quentin Tarantino"})
// get all documents where actors include "Brad Pitt"
db.movies.find({"actors": "Brad Pitt"})
// get all documents with francise set to "The Hobbit"
db.movies.find({"franchise": "The Hobbit"})
// get all movies release in the '90s
db.movies.find({"year": {$gt: 1990, $lt: 2000}})
// get all movies released before the year 2000 or after 2010
db.movies.find({"$nor": [{"year": {$lt: 2000}}, {"year": {$gt: 2010}}]})

// Update Documents
// add a synopsis to "The Hobbit: An unexpected Journey"...
db.movies.updateOne({ "title": "Hobbit: An Unexpected Journey"}, { $set: {"synopsis": "A reluctant hobbit, Bilbo Baggins, sets out to the Lonely Mountain with a spirited group of dwarves to reclaim their mountain home - and the gold within it - from the dragon Smaug." }})
// add a synopsis to "The Hobbit: the Desolation of Smaug"...
db.movies.updateOne({ "title": "Hobbit: The Desolution of Smug"}, { $set: {"synopsis": "The dwarves, along with Bilbo Baggins and Gandalf the Grey, continue their quest to reclaim Erebor, their homeland, from Smaug. Bilbo Baggins is in possession of a mysterious and magical ring." }})
// add an actor named "Samuel L. Jackson" to "Pulp Fiction"
db.movies.updateOne({ "title": "Pulp Fiction"}, { $push: {"actors": "Samuel L. Jackson"}})

// Text Search
// need to create an index in synopsis first 
db.movies.createIndex({ synopsis: "text" })
// find all movies that have a synopsis that contains the word "Bilbo"
db.movies.find({ $text: { $search: "Bilbo"} }).pretty()
// find all movies that have a synopsis the contains the word "Gandalf"
db.movies.find({ $text: { $search: "Gandalf"} }).pretty()
// find all movies that have a synopsis that contains the word "Bilbo" and not the word "Gandalf"
db.movies.find({ $text: { $search: "Bilbo -Gandalf"} }).pretty()
// find all movies that have a synopsis that contains the word "dwarves" or "hobbit"
db.movies.find({ $text: { $search: "dwarves hobbit"} }).pretty()
// find all movies that have a synopsis that contains the word "gold" and "dragon"
db.movies.find({ $text: { $search: "\"gold\" \"dragon\""} }).pretty()

// Delete Documents
// delete the movie "Pee Wee Herman's Big Adventure"
db.movies.deleteOne({"title": "Pee Wee Herman's Big Adventure"})
// delete the movie "Avatar"
db.movies.deleteOne({"title": "Avatar"})

// Relationships
// Insert the following documents into a user's collections (see curriculum for info)
// create users collection
db.users.insert({ "username" : "SallySmith", "first_name" : "Sally", "last_name" : "Smith"})
db.users.insert({ "username" : "JimmyHagen", "full_name" : {"first" : "Jimmy", "last" : "Hagen" }})

// create posts collection
db.posts.insert({ "username" : "SallySmith", "title" : "Passes out at party", "body" : "Wakes up early and cleans house" })
db.posts.insert({ "username" : "SallySmith", "title" : "Buys a House", "body" : "Living in a new neighborhood now" })
db.posts.insert({ "username" : "SallySmith", "title" : "Reports a bug in your code", "body" : "Sends you a Pull Request" })
db.posts.insert({ "username" : "JimmyHagen", "title" : "Borrows something", "body" : "Returns it when he is done" })
db.posts.insert({ "username" : "JimmyHagen", "title" : "Borrows everything", "body" : "The end" })
db.posts.insert({ "username" : "JimmyHagen", "title" : "Forks your repo on github", "body" : "Sets to private" })

// create comments collection and find the posts id and insert it in 
db.posts.find({ "title": "Borrows something" }) // returns: ObjectId("61afecd5d04c858cc76b3c65")
db.comments.insert({ "username" : "SallySmith", "comment" : "Hope you got a good deal!", "post" : ObjectId("61afecd5d04c858cc76b3c65") })

// "Borrows everything": 
db.posts.find({"title": "Borrows everything" }) // returns: ObjectId("61afece6d04c858cc76b3c66")
db.comments.insert({ "username" : "SallySmith", "comment" : "What's mine is yours!", "post" : ObjectId("61afece6d04c858cc76b3c66")})

// "Forks your repo on github"
db.posts.find({ "title": "Forks your repo on github" }) // returns: ObjectId("61afecfdd04c858cc76b3c67")
db.comments.insert({ "username" : "SallySmith", "comment" : "Don't violate the licensing agreement!", "post" : ObjectId("61afecfdd04c858cc76b3c67")})

// "Passes out at party"
db.posts.find({ "title" : "Passes out at party"}) // returns: ObjectId("61afeca8d04c858cc76b3c62")
db.comments.insert({ "username" : "JimmyHagen", "comment" : "It still isn't clean", "post" : ObjectId("61afeca8d04c858cc76b3c62")})

// "Reports a bug in your code"
db.posts.find({ "title": "Reports a bug in your code"}) // returns: ObjectId("61afecc6d04c858cc76b3c64")
db.comments.insert({ "username" : "JimmyHagen", "comment" : "Denied your PR cause I found a hack", "post" : ObjectId("61afecc6d04c858cc76b3c64") })

// Querying related collections
// find all users
db.users.find({}).pretty()

// find all posts
db.posts.find({}).pretty()

// find all posts authored by "SallySmith"
db.posts.find({ "username": "SallySmith"}).pretty()

// find all posts authored by "JimmyHagen"
db.posts.find({ "username": "JimmyHagen"}).pretty()

// find all comments
db.comments.find({}).pretty()

// find all comments authored by "SallySmith"
db.comments.find({ "username": "SallySmith"}).pretty()

// find all comments authored by "JimmyHagen"
db.comments.find({ "username": "JimmyHagen"}).pretty()

// find all comments belonging to the post "Reports a bug in your code"
db.comments.find({ "post": ObjectId("61afecc6d04c858cc76b3c64")}).pretty()