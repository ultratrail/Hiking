import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';
import { Popup, popup, icon, latLng, Map, marker, point, polyline, tileLayer, LatLngExpression } from 'leaflet';

import { Hike } from './hike.model';
import { HikeService } from './hike.service';

import { Message } from '../message/message.model';
import { MessageService } from '../message/message.service';

@Component({
    selector: 'jhi-hike-detail',
    templateUrl: './hike-detail.component.html'
})
export class HikeDetailComponent implements OnInit, OnDestroy {

    hike: Hike;
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    private messages: Message[];

    // Define our base layers so we can reference them multiple times
    OSMaps = tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 20,
        detectRetina: true
    });

    start = marker([44.961430000, 5.553270000], {

    });

    trace = polyline([
    ]);

    // Set the initial set of displayed layers (we could also use the leafletLayers input binding for this)
    options = {
        layers: [this.OSMaps, this.trace, this.start],
        //  layers: [this.OSMaps, this.trace],
        zoom: 8,
        center: latLng([45.188529, 5.724524])
    };
    onMapReady(map: Map) {
        map.fitBounds(this.trace.getBounds(), {
            padding: point(24, 24),
            animate: true
        });
    }
    constructor(
        private eventManager: JhiEventManager,
        private hikeService: HikeService,
        private messageService: MessageService,
        private route: ActivatedRoute
    ) {
    }

    loadAll(id) {
        this.messageService.search(id).subscribe(
            (res: HttpResponse<Message[]>) => {
                this.messages = res.body;
                const mess = res.body;
                const tab: LatLngExpression[] = [];
                for (const m of mess) {
                    tab.push([m.latitude, m.longitude]);
                    if (m.sos) {
                        const newmarker = marker([m.latitude, m.longitude], {
                            icon: icon({
                                iconSize: [25, 41],
                                iconAnchor: [13, 41],
                                iconUrl: require('../../../content/images/marker-icon-sos.png'),
                                shadowUrl: require('../../../../../../node_modules/leaflet/dist/images/marker-shadow.png')
                            })
                        });

                        this.options.layers.push(newmarker.bindPopup('<center> <span> <strong> S.O.S. </strong> </span> </center>' + m.datetime).openPopup());
                    }
                }

                this.trace = polyline(tab);
                this.options.layers.push(this.trace);

            });
        return;

    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
            this.loadAll(params['id']);
        });
        this.registerChangeInHikes();

    }

    load(id) {
        this.hikeService.find(id)
            .subscribe((hikeResponse: HttpResponse<Hike>) => {
                this.hike = hikeResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInHikes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'hikeListModification',
            (response) => this.load(this.hike.id)
        );
    }
}
