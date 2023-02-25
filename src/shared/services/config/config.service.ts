import { environment } from '@environment';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
	get(key: string) {
		return environment[key];
	}
}
