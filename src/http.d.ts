
    import {HttpService} from '../src/api/http';
    
    declare module 'vue/types/vue' {
        interface Vue {
            $httpService: HttpService;
        }
    }