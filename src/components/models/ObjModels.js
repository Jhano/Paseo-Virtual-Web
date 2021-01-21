import React, { useEffect } from 'react';
import * as THREE from 'three';
import * as OBJLoader from 'three-obj-loader';
const scene = new THREE.Scene();


const ObjModels = ({ model }) => {


    useEffect(() => {
        const loader = new THREE.OBJLoader();
        loader.load(model, (object) => {
            scene.add(object);
        },
        xhr => {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        error => {
            console.log("Error! ", error);
        })
    }, []);
    

    
    
    return (
        <></>
    )

}

export default ObjModels;