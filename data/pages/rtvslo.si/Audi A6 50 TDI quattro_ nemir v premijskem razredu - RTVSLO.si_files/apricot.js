// apricot.js / Tit Petric / Monotek d.o.o.

var apricot = {
	keys: [],
	time: 0,
	start: function(ts) {
		this.time = ts
		this.keys = []
	},
	add: function(key,val1,val2,val3,val4) {
		if (key) {
			this.keys[this.keys.length] = key
		}
		if (val1) {
			this.keys[this.keys.length] = val1
		}
		if (val2) {
			this.keys[this.keys.length] = val2
		}
		if (val3) {
			this.keys[this.keys.length] = val3
		}
		if (val4) {
			this.keys[this.keys.length] = val4
		}
	},
	save: function(is_loaded) {
		if (this.keys.length <= 0) {
			return
		}
		var path = "https://img.rtvslo.si/_stats/" + this.time + "/" + this.keys.join("/")
		this.request(path, is_loaded)
	},
	request: function(path, is_loaded) {
		var ie = /*@cc_on!@*/0
		ie = ie && !is_loaded
		if (!ie && document.createElement) {
			var tag = document.createElement('script')
			tag.setAttribute('type', 'text/javascript')
			tag.setAttribute('src', path)
			document.body.appendChild(tag)
		} else if (document.write) {
			document.write('<' + 'script type="text/javascript" src="' + path + '"><' + '/script>')
		}
	}
}
