import {
	ForbiddenException,
	HttpException,
	HttpStatus,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common';
import { ErrorMessages } from '@shared';

@Injectable()
export class ErrorHandlerService {
	userCreationError(err) {
		this.checkIfHttpException(err);
		if (err?.errors?.UserName && err?.errors?.Email) {
			throw new ForbiddenException(ErrorMessages.UserNameAndEmailExists);
		} else if (err?.errors?.UserName) {
			throw new ForbiddenException(ErrorMessages.UserNameExists);
		} else if (err?.errors?.Email) {
			throw new ForbiddenException(ErrorMessages.EmailExists);
		}
		throw new HttpException(ErrorMessages.InternalServerError, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	personMutationError(err) {
		this.checkIfHttpException(err);
		if (err?.errors?.PhoneNumber) {
			throw new ForbiddenException(ErrorMessages.PhoneNumberExists);
		}
		throw new HttpException(ErrorMessages.InternalServerError, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	userNotFound() {
		throw new NotFoundException(ErrorMessages.UserNameDoesNotExist);
	}
	userLoggedOut() {
		throw new ForbiddenException(ErrorMessages.UserLoggedOut);
	}
	passwordDoesNotMatch() {
		throw new ForbiddenException(ErrorMessages.PasswordDoesNotMatch);
	}

	inValidRefreshToken() {
		throw new ForbiddenException(ErrorMessages.InvalidRefreshToken);
	}

	userAuthenticationError(err) {}

	checkNotMatchedError(upsertResponse) {
		if (!upsertResponse?.matchedCount)
			throw new HttpException(
				{ errors: { ItemId: ErrorMessages.ItemIdDoesNotExist } },
				HttpStatus.NOT_FOUND
			);
	}

	checkIfHttpException(err) {
		if (err?.name == 'HttpException') {
			throw err;
		}
	}

	emailNotFound() {
		throw new NotFoundException(ErrorMessages.EmailDoesNotExists);
	}
}
