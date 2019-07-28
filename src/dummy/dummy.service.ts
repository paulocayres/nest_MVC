import { Injectable } from '@nestjs/common';

@Injectable()
export class DummyService {

    private dummy: JSON;

    getDummy() {
        return this.dummy;
    }

    setDummy(dummy: JSON) {
        this.dummy = dummy;
    }
}
