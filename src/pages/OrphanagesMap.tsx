import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';


import mapMarker from '../images/mapmarker.svg';

import 'leaflet/dist/leaflet.css'
import '../styles/pages/orphanages-map.css';

import mapIcon from '../utils/mapIcon';
import api from '../services/api';

interface Orphanage {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

function OrphanagesMap() {

    const [orphanages, setOrphanges] = useState<Orphanage[]>([]);

    useEffect(() => {
        api.get('orphanages').then((response) => {
            setOrphanges(response.data);
        })
    }, []);

    return (
        <div id="map-page">
            <aside>
                <header>
                    <img src={mapMarker} alt="Happy" />

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando sua visita :)</p>

                </header>

                <footer>
                    <strong>São Luís</strong>
                    <span>Maranhão</span>
                </footer>

            </aside>

            <Map
                center={[-2.5591798, -44.2007552]}
                zoom={13}
                style={{ width: '100%', height: '100%' }}
            >
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

                {orphanages.map((orphange) => {
                    return (
                        <Marker position={[orphange.latitude, orphange.longitude]} icon={mapIcon} key={orphange.id}>
                            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                                {orphange.name}
                                <Link to={`/orphanages/${orphange.id}`}>
                                    <FiArrowRight size={20} color="#FFF" />
                                </Link>
                            </Popup>
                        </Marker>
                    );
                })}

            </Map>


            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#FFF" />
            </Link>

        </div>
    );
}

export default OrphanagesMap;