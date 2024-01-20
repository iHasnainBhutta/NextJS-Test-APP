// components/PeopleList.tsx
import React from 'react';
import defaultIcon from '../../public/images/default.png';
import maleIcon from '../../public/images/male.png';
import femaleIcon from '../../public/images/female.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface PeopleListProps {
    people: Array<{
        name: string;
        skin_color: string;
        gender: string;
        url: string;
    }>;
}

const PeopleList: React.FC<PeopleListProps> = ({ people }) => {
    const router = useRouter();

    const clickHandler = (personId: string) => {
        const id: any = personId.split('/').slice(-2, -1)[0];

        router.push(`/user/${id}`);
    };

    // Check if people is defined before mapping over it
    if (!people) {
        return <div>Loading...</div>;
    }

    return (
        <ul className="flex flex-wrap justify-between">
            {people.map((person, index) => (
                <li key={index} className="mb-4">
                    <div
                        style={{ width: 300, height: '100%' }}
                        className="cursor-pointer m-1 rounded-2xl flex flex-col justify-start items-center border-8 border-gradient-to-l from-blue-300 via-white to-blue-300 bg-gradient-to-tr h-3/4"
                    >
                        <div>
                            <div className="flex justify-center items-center py-4">
                                <Image
                                    alt=""
                                    src={
                                        person?.gender === 'male'
                                            ? maleIcon
                                            : person?.gender === 'female'
                                                ? femaleIcon
                                                : defaultIcon
                                    }
                                    width="120"
                                    height="90"
                                    className="rounded-lg"
                                />
                            </div>
                            <h1 className="text-neutral-700 font-bold text-2xl text-center">{person.name}</h1>
                            <p className="font-normal uppercase text-base text-neutral-700 text-center pb-4">
                                {person?.gender ? person.gender : ''}
                            </p>
                            <div className="flex justify-center items-center gap-6 py-6">
                                <button
                                    className="text-white uppercase bg-gradient-to-r hover:bg-gradient-to-l from-cyan-500 to-blue-500 p-3 font-semibold rounded-lg"
                                    onClick={() => clickHandler(person.url)}
                                >
                                    View Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default PeopleList;
