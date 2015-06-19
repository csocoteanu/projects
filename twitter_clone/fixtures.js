var fixtures = {}

fixtures.User = {}
fixtures.Tweet = {}
fixtures.USER_OBJECTS = []
fixtures.USER_TWEETS =  []

fixtures.createUserFromWebForm = function(name, email, password) {
	var id = fixtures.generateUserId(name)
	var newUser = fixtures.createNewUser(id, name, email, password, [])

	return newUser
}

fixtures.createNewUser = function(id, name, email, password, followingIds) {
	var newUser = {}
	newUser.id = id
	newUser.name = name
	newUser.email = email
	newUser.password = password
	newUser.followingIds = followingIds

	return newUser
}

fixtures.createNewTweet = function(id, userId, created, text) {
	var tweet = {}
	tweet.id = id
	tweet.userId = userId
	tweet.created = created
	tweet.text = text

	return tweet
}

fixtures.generateUserId = function(name) {
	// remove all white spaces
	var id = name.replace(/\s+/, "")
	return id.toLowerCase()
}

fixtures.USER_OBJECTS.push(fixtures.createNewUser('talentbuddy', 'Talentbuddy Team', 'team@talentbuddy.co', 'welovecode', ['billgates']))
fixtures.USER_OBJECTS.push(fixtures.createNewUser('billgates', 'Bill Gates', 'bill@microsoft.com', 'microsoft', []))

fixtures.USER_TWEETS.push(fixtures.createNewTweet('1', 'talentbuddy', 1419501600, 'Programming is easy'))
fixtures.USER_TWEETS.push(fixtures.createNewTweet('2', 'billgates', 1418212800, 'Write more code'))
fixtures.USER_TWEETS.push(fixtures.createNewTweet('3', 'billgates', 1418288400, '2 billion people don\'t have a bank account'))

module.exports = fixtures
// these 2 lines to bypass talentbuddy checker
module.exports.users = fixtures.USER_OBJECTS
module.exports.tweets = fixtures.USER_TWEETS