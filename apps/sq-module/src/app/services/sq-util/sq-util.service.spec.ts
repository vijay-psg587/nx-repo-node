import { Test, TestingModule } from '@nestjs/testing';
import { SqUtilService } from './sq-util.service';

describe('SqUtilService', () => {
	let service: SqUtilService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [SqUtilService],
		}).compile();

		service = module.get<SqUtilService>(SqUtilService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
