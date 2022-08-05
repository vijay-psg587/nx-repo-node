const { time } = require('console');
const timezones = require('timezones-list');
async function bootstrap() {
	console.log('tr');
	console.log(
		timezones.default.map((t) => {
			if (t.label.includes('Asia')) {
				console.log(JSON.stringify(t.label));
			}
		}),
	);
}

bootstrap();
