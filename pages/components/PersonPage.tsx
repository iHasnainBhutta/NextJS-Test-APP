import React, { useState } from 'react';
import { Person } from '../api/api';
import Image from 'next/image';
import maleIAvatar from "../../public/images/male3D.png";
import femaleAvatar from "../../public/images/female3D.png";
import defaultIcon from "../../public/images/default.png";

interface PersonPageProps {
    person: Person | null;
}

const PersonPage: React.FC<PersonPageProps> = ({ person }) => {
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    if (!person) {
        return <div>No person data available.</div>;
    }

    return (
        <div>
            <p className="text-gray-500 text-base lg:text-xl font-medium uppercase">
                Star War Character
            </p>
            <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:py-2">

                <div className="flex items-center">
                    <Image src={person?.gender === "male" ? maleIAvatar : person?.gender === "female" ? femaleAvatar : defaultIcon} alt="Character Image" style={{ width: "70%" }} />
                </div>
                <div className="flex flex-col gap-5 items-start">
                    <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold">{person.name}</p>
                    <div className="flex items-center gap-2">
                        <p className="text-gray-500 uppercase">{person.gender}</p>
                    </div>
                    <p className="text-dark-500 text-base lg:text-xl font-medium uppercase">
                        Personal Details
                    </p>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {Object.keys(person)
                            .filter((key) => !["homeworld", "species", "starships", "films", "vehicles", "created"].includes(key))
                            .map((key) => (
                                <div key={key}>
                                    <p className="text-gray-500 font-semibold uppercase">{key}:</p>
                                    <p className="text-gray-700">{(person as any)[key]}</p>
                                </div>
                            ))}
                    </div>



                    <div className='flex justify-center items-center gap-6 py-6'>
                        <button className='text-white uppercase bg-gradient-to-r hover:bg-gradient-to-l from-cyan-500 to-blue-500 p-3 font-semibold rounded-lg' onClick={openModal}>More Details</button>
                    </div>

                    {/* Modal */}
                    {isModalOpen && (
                        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white p-8 rounded-md">
                                <p className="text-xl font-semibold mb-4">Additional Details</p>
                                <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
                                    {Object.keys(person)
                                        .filter((key) => ["homeworld", "species", "starships", "films",].includes(key))
                                        .map((key) => (
                                            <div key={key}>
                                                <p className="text-gray-500 font-semibold uppercase">{key}:</p>
                                                <p className="text-gray-700">{(person as any)[key]}</p>
                                            </div>
                                        ))}
                                </div>


                                <div className='flex justify-center items-center gap-6 py-6'>
                                    <button className='text-white uppercase bg-gradient-to-r hover:bg-gradient-to-l from-cyan-500 to-blue-500 p-3 font-semibold rounded-lg' onClick={closeModal}>Close</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PersonPage;
