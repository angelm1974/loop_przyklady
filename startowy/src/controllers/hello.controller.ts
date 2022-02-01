import {get} from '@loopback/rest';

// Uncomment these imports to begin using these cool features!
export class HelloController {
  @get('/hello')
  hello(): string {
    return ' Witaj świecie'
  }
}


