const isWindows = /^win/i.test(process.platform);
const nativePath = '../build/Release/winsn-native';

let addonInit = false;
let addonInstance;

const shortName = function(n) {
	if (!isWindows) {
		throw new Error("Platform not detected as windows!");
	}
	if (!addonInit) {
		addonInstance = require(nativePath);
		addonInit = true;
	}
	return addonInstance.shortName(n);
}

shortName["isAvailable"] = function() {
	if (!isWindows) return false;
	if (addonInit) return true;
	try {
		addonInstance = require(nativePath);
		addonInit = true;
	} catch (e) { }
	return addonInit;
}

shortName["else"] = function(path, def) {
	if (typeof path !== "string") throw new Error("Path is not a string!");

	if (!shortName.isAvailable()) return def;
	try {
		let ret = shortName(path);
		if (typeof ret !== "string") return def;
		return ret;
	} catch (e) {
		return def;
	}
}

shortName["elseLong"] = function(path) {
	return shortName.else(path, path);
}

shortName["elseNull"] = function(path) {
	return shortName.else(path, null);
}

module.exports = shortName;

