import { environment } from '@environment';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
	async getHash(args): Promise<string> {
		const hash = await bcrypt.hash(args, environment.SaltRounds);
		return hash;
	}

	isContentMatchWithHash(password, hash): boolean {
		return bcrypt.compareSync(password, hash);
	}
}
