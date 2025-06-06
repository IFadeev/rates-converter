import { TextEncoder, TextDecoder } from 'util';
import 'whatwg-fetch';

(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;
