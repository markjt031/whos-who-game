import { Inject, Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
	providedIn: 'root'
})

export class SettingsService {
	private genreSource = new BehaviorSubject<string>('')
	genre = this.genreSource.asObservable()

	private modeSource = new BehaviorSubject<string>('')
	mode = this.modeSource.asObservable()

	updateGenre(newGenre: string) {
		this.genreSource.next(newGenre)
	}

	updateMode(newMode: string) {
		this.modeSource.next(newMode)
	}
}