/*
   Copyright 2023 Wasabi Codes

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

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

