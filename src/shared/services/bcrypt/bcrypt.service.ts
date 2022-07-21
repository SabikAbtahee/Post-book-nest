import { environment } from '@environment';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
	async getHashGivenPassword(password): Promise<string> {
		const hash = await bcrypt.hash(password, environment.SaltRounds);
		return hash;
	}

	isPasswordMatchWithHash(password, hash): boolean {
		return bcrypt.compareSync(password, hash);
	}
}
