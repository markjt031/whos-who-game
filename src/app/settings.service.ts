import { Inject, Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
	providedIn: 'root'
})

export class SettingsService {
	private genreSource = new BehaviorSubject<string>('')
	genre = this.genreSource.asObservable()

	updateGenre(newGenre: string) {
		this.genreSource.next(newGenre)
	}
}