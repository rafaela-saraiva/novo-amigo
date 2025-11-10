'use client'

import { Pet } from "@/Models/Pet";
import api from "@/services/api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function NossosAnimaisPage() {
    const params = useParams();
    const especie = params.especie;
    const [animals, setAnimals] = useState<Pet[]>([]);

    useEffect(function () {
        api
        .get('/animals')
        .then(function (response) {
            setAnimals(response.data);
        })
        .catch(function (error) {
            alert(error);
        });
    }, []);

    return (
        <>
            <h1>Especie: {especie}</h1>

            {animals.length > 0 ?
                <ul>
                    { animals.filter(function (animal) {
                        return animal.especie === especie;
                    }).map(function (animal) {
                        return (
                            <li key={animal.id}>{animal.nome}</li>
                        );
                    })}
                </ul>
            : <p>Nenhum animal encontrando</p>}
        </>
    );
}