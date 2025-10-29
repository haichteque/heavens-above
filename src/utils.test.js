/* eslint-disable */

/* eslint-env jest */


// Import all functions from utils.js
const {
	getTimestamp,
	post_options,
	get_options,
	image_options,
	iridium_options,
	md5
} = require("./utils");

// Test suite for getTimestamp
describe("getTimestamp", () => {
	it("should convert a simple time string to seconds", () => {
		expect(getTimestamp("01:00:00")).toBe(3600);
	});

	it("should convert a complex time string to seconds", () => {
		// 2 * 3600 + 30 * 60 + 15 = 7200 + 1800 + 15 = 9015
		expect(getTimestamp("02:30:15")).toBe(9015);
	});

	it("should handle zero time", () => {
		expect(getTimestamp("00:00:00")).toBe(0);
	});

	it("should handle time with only minutes and seconds", () => {
		expect(getTimestamp("00:10:30")).toBe(630);
	});
});

// Test suite for md5
describe("md5", () => {
	it("should return the correct md5 hash for a string", () => {
		// Known md5 hash for "hello"
		expect(md5("hello")).toBe("5d41402abc4b2a76b9719d911017c592");
	});

	it("should return the correct md5 hash for another string", () => {
		// Known md5 hash for "jest test"
		expect(md5("jest test")).toBe("0aa60cd5d31ed82f383b1d9a83ed7e67");
	});

	it("should return a different hash for a different string", () => {
		expect(md5("hello")).not.toBe(md5("world"));
	});
});

// Test suite for post_options
describe("post_options", () => {
	const target = "test.aspx?";
	const bodyOptions = { foo: "bar" };
	const options = post_options(target, bodyOptions);
	// THIS IS THE CORRECTED LINE
	const expectedUrl = `https://www.heavens-above.com/${target}lat=39.9042&lng=116.4074&loc=%E5%8C%97%E4%BA%AC%E5%B8%82&alt=52&tz=ChST`;

	it("should return the correct URL", () => {
		expect(options.url).toBe(expectedUrl);
	});

	it("should set the method to POST", () => {
		expect(options.method).toBe("POST");
	});

	it("should set json to true", () => {
		expect(options.json).toBe(true);
	});

	it("should include the body options", () => {
		expect(options.body).toEqual(bodyOptions);
	});

	it("should include all required headers", () => {
		expect(options.headers["Host"]).toBe("www.heavens-above.com");
		expect(options.headers["Content-Type"]).toBe("application/x-www-form-urlencoded");
	});
});

// Test suite for get_options
describe("get_options", () => {
	const target = "get.aspx?";
	const options = get_options(target);
	// THIS LINE MUST ALSO BE CORRECTED
	const expectedUrl = `https://www.heavens-above.com/${target}lat=39.9042&lng=116.4074&loc=%E5%8C%97%E4%BA%AC%E5%B8%82&alt=52&tz=ChST`;

	it("should return the correct URL", () => {
		expect(options.url).toBe(expectedUrl);
	});

	it("should set the method to GET", () => {
		expect(options.method).toBe("GET");
	});

	it("should include all required headers", () => {
		expect(options.headers["Host"]).toBe("www.heavens-above.com");
		expect(options.headers["Accept"]).toBe("text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8");
	});
});

// Test suite for image_options
describe("image_options", () => {
	const target = "https://www.heavens-above.com/some-image.png";
	const options = image_options(target);

	it("should return the exact target URL", () => {
		// Note: This function behaves differently, it does not append params
		expect(options.url).toBe(target);
	});

	it("should set the method to GET", () => {
		expect(options.method).toBe("GET");
	});

	it("should include all required headers", () => {
		expect(options.headers["Host"]).toBe("www.heavens-above.com");
	});
});

// Test suite for iridium_options
describe("iridium_options", () => {
	const target = "https://www.heavens-above.com/iridium.aspx";
	const options = iridium_options(target);

	it("should return the exact target URL", () => {
		expect(options.url).toBe(target);
	});

	it("should set the method to GET", () => {
		expect(options.method).toBe("GET");
	});

	it("should include specific headers like Cache-Control", () => {
		expect(options.headers["Host"]).toBe("www.heavens-above.com");
		expect(options.headers["Cache-Control"]).toBe("max-age=0");
	});
});

