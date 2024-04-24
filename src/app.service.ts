import {Injectable} from '@nestjs/common';

@Injectable()
export class AppService {
    getBooks() {
        return [{ id: 1, name: 'Fairytales', author: 'Anton'}];
    }
        
}