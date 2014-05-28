module.exports = function(max) {
	var self = this,
		max = max || 5,
		messages = []

	this.add = function(message){
	    if (messages.length >= max) {
	        messages.shift()
	    }
	    messages.push(message)
	}

	this.get = function(options){
		if(!options || !options.since) {
			return messages
		}

		var matches = []
		for (var i = messages.length - 1; i >= 0; i--) {
			var message = messages[i]
			if(message.timestamp > options.since){
				matches.unshift(message)
			} else {
				break;
			}
		}
		return matches
	}
}
